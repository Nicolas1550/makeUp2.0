import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchUsers,
  assignRoleToEmployee,
  removeRoleFromEmployee,
} from "@/redux/features/user/userSlice";
import {
  AssignButton,
  ErrorMessage,
  SearchInput,
  TableCell,
  TableHeader,
  Title,
  UserManagementContainer,
  UserTable,
  UserTableContainer,
} from "./userManagementStyles";
import { User, Role } from "@/redux/features/auth/authSlice";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://backendiaecommerce.onrender.com"
    : "https://backendiaecommerce.onrender.com";

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [userRoles, setUserRoles] = useState<
    { userId: string; roles: Role[] }[]
  >([]);

  // Cargar usuarios y roles al montar el componente
  useEffect(() => {
    dispatch(fetchUsers());
    fetchRoles(); 
  }, [dispatch]);

  // Obtener roles directamente desde el backend
  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/roles`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserRoles(response.data); 
    } catch (error) {
      console.error("Error al obtener los roles", error);
    }
  };

  // Filtrar usuarios basados en la búsqueda y establecer el número de usuarios visibles
// Filtrar usuarios basados en la búsqueda y establecer el número de usuarios visibles
useEffect(() => {
  const filteredUsers = users.filter(
    (user) =>
      (user.nombre?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.apellido?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  setDisplayedUsers(filteredUsers.slice(0, visibleCount));
}, [users, searchTerm, visibleCount, userRoles]);


  // Asignar rol de empleado
  const handleAssignRole = async (userId: string) => {
    await dispatch(assignRoleToEmployee({ userId, role: "empleado" }));
    fetchRoles(); 
  };

  // Remover rol de empleado
  const handleRemoveRole = async (userId: string) => {
    await dispatch(removeRoleFromEmployee({ userId }));
    fetchRoles(); 
  };

  const loadMoreUsers = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  // Función para verificar si el usuario tiene el rol "empleado" basado en los roles locales
  const hasEmployeeRole = (userId: string) => {
    const userRole = userRoles.find((role) => role.userId === userId);

    if (!userRole || !Array.isArray(userRole.roles)) {
      return false; 
    }


    // Verificamos si alguno de los roles es exactamente "empleado"
    const hasRole = userRole.roles.some((role) => {
      if (role && typeof role === "string") {
        // Aseguramos que role es una cadena no vacía
        const normalizedRole = (role as string).trim().toLowerCase();
        return normalizedRole === "empleado";
      } else {
        return false;
      }
    });

    return hasRole;
  };

  return (
    <UserManagementContainer>
      <Title>Gestión de Usuarios</Title>
      <SearchInput
        type="text"
        placeholder="Buscar por nombre o email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <ErrorMessage>Error: {error.general}</ErrorMessage>
      ) : (
        <UserTableContainer
          onScroll={(e) => {
            const bottom =
              e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
              e.currentTarget.clientHeight;
            if (bottom) {
              loadMoreUsers();
            }
          }}
        >
          <UserTable>
            <thead>
              <tr>
                <TableHeader>Nombre Completo</TableHeader>{" "}
                {/* Cambiamos el título */}
                <TableHeader>Email</TableHeader>
                <TableHeader>Roles</TableHeader>
                <TableHeader>Acciones</TableHeader>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => {
                const isEmployee = hasEmployeeRole(user.id); 

                return (
                  <tr key={user.id}>
                    <TableCell>
                      {user.nombre} {user.apellido}{" "}
                      {/* Mostrar nombre completo */}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {isEmployee ? "Sí" : "No"}{" "}
                      {/* Mostrar si tiene el rol de empleado */}
                    </TableCell>
                    <TableCell>
                      {isEmployee ? (
                        <AssignButton
                          onClick={() => handleRemoveRole(user.id)}
                          disabled={isLoading}
                        >
                          Quitar rol de Colaborador
                        </AssignButton>
                      ) : (
                        <AssignButton
                          onClick={() => handleAssignRole(user.id)}
                          disabled={isLoading}
                        >
                          Asignar rol de Colaborador
                        </AssignButton>
                      )}
                    </TableCell>
                  </tr>
                );
              })}
            </tbody>
          </UserTable>
        </UserTableContainer>
      )}
    </UserManagementContainer>
  );
};

export default UserManagement;
