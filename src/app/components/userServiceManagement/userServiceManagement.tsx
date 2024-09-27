import React, { useEffect, useState } from "react";
import {
  fetchServices,
  fetchServiceUsers,
  assignEmployeeToService,
  removeEmployeeFromService,
  employeeAssigned,
  employeeRemoved,
} from "@/redux/features/services/serviceSlice";
import { RootState } from "@/redux/store";
import {
  AssignButton,
  ErrorMessage,
  SearchInput,
  SelectService,
  TableCell,
  TableHeader,
  Title,
  UserServiceManagementContainer,
  UserTable,
  UserTableContainer,
} from "./userServiceManagementStyles";
import { LoadingSpinner } from "../navbar/navbarStyled";
import axios from "axios";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Definir la interfaz para describir la estructura de los empleados
interface Employee {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

// Configuración del socket.io
const socket = io("https://makeupbackend2-0.onrender.com", { transports: ["websocket"] });

const UserServiceManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { services, selectedServiceUsers, isLoading, error } = useAppSelector(
    (state: RootState) => state.services
  );
  const [availableEmployees, setAvailableEmployees] = useState<Employee[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  // Cargar empleados disponibles y servicios al montar el componente
  useEffect(() => {
    const fetchServicesAndEmployees = async () => {
      try {
        // Fetch services
        await dispatch(fetchServices()).unwrap();

        // Fetch available employees
        const employeesResponse = await axios.get(
          `https://makeupbackend2-0.onrender.com/api/users/empleados/disponibles/general`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Asegurarse de que employeesResponse.data sea un array
        setAvailableEmployees(
          Array.isArray(employeesResponse.data) ? employeesResponse.data : []
        );
      } catch (err) {
        console.error("Error fetching available employees or services:", err);
      }
    };

    fetchServicesAndEmployees();

    // Configurar WebSocket para escuchar asignaciones y desasignaciones
    socket.on("empleadoAsignado", (data) => {
      if (data && data.user && data.servicio && data.user.id && data.servicio.id) {
    
        dispatch(
          employeeAssigned({ user: data.user, serviceId: data.servicio.id })
        );
      } else {
        console.error("Datos inválidos recibidos en el evento 'empleadoAsignado':", data);
      }
    });
    
    socket.on("empleadoDesasignado", (data) => {
      dispatch(
        employeeRemoved({ userId: data.user.id, serviceId: data.servicio.id })
      );
    });

    return () => {
      socket.off("empleadoAsignado");
      socket.off("empleadoDesasignado");
    };
  }, [dispatch, selectedServiceId]);

  useEffect(() => {
    if (selectedServiceId) {
      dispatch(fetchServiceUsers({ serviceId: selectedServiceId }));
    }
  }, [selectedServiceId, dispatch]);

  const handleAssignToService = (userId: string) => {
    if (selectedServiceId) {
      dispatch(
        assignEmployeeToService({ userId, serviceId: selectedServiceId })
      );
    }
  };

  const handleRemoveFromService = (userId: string) => {
    if (selectedServiceId) {
      dispatch(
        removeEmployeeFromService({ userId, serviceId: selectedServiceId })
      );
    }
  };

  const filteredUsers = Array.isArray(availableEmployees)
    ? availableEmployees.filter((user) => {
        return (
          user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) || 
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <UserServiceManagementContainer>
      <Title>Gestión de Usuarios y Servicios</Title>
      <SearchInput
        type="text"
        placeholder="Buscar por nombre o email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage>{error.general}</ErrorMessage>
      ) : (
        <>
          <SelectService
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
          >
            <option value="">Seleccione un Servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.nombre}
              </option>
            ))}
          </SelectService>
          <UserTableContainer>
            <UserTable>
              <thead>
                <tr>
                  <TableHeader>Nombre Completo</TableHeader>{" "}
                  {/* Cambiamos el nombre de la columna */}
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Asignado</TableHeader>
                  <TableHeader>Acciones</TableHeader>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <TableCell>{`${user.nombre} ${user.apellido}`}</TableCell>{" "}
                    {/* Mostrar nombre completo */}
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {selectedServiceUsers.some(
                        (assignedUser) => assignedUser.id === user.id
                      )
                        ? "Sí"
                        : "No"}
                    </TableCell>
                    <TableCell>
                      <AssignButton
                        onClick={() => handleAssignToService(user.id)}
                        disabled={!selectedServiceId}
                      >
                        Asignar a Servicio
                      </AssignButton>
                      <AssignButton
                        onClick={() => handleRemoveFromService(user.id)}
                        disabled={!selectedServiceId}
                      >
                        Desasignar de Servicio
                      </AssignButton>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </UserTable>
          </UserTableContainer>
        </>
      )}
    </UserServiceManagementContainer>
  );
};

export default UserServiceManagement;
