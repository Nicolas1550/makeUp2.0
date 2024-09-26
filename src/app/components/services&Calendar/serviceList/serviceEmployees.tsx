import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchServiceUsers } from "@/redux/features/services/serviceSlice";
import { RootState } from "@/redux/store";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalBody,
  EmployeeCard,
  EmployeeName,
  EmployeeInfo,
  EmployeeGrid,
  EmployeeImage,
  WhatsAppButton,
  WhatsAppIcon,
  MailButton,
  MailIcon, // Nuevo icono y botón para email
} from "./serviceEmployeesModalStyled";

interface ServiceEmployeesModalProps {
  serviceId: string;
  onClose: () => void;
}

const ServiceEmployeesModal: React.FC<ServiceEmployeesModalProps> = ({
  serviceId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { selectedServiceUsers, isLoading, error } = useAppSelector(
    (state: RootState) => state.services
  );

  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceUsers({ serviceId }));
    }
  }, [dispatch, serviceId]);

  if (isLoading) {
    return <p>Cargando empleados...</p>;
  }

  if (error) {
    return <p>Error al cargar los empleados: {error.general}</p>;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Empleados Asignados</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <EmployeeGrid>
            {selectedServiceUsers.length > 0 ? (
              selectedServiceUsers.map((employee) => (
                <EmployeeCard key={employee.id}>
                  <EmployeeImage
                    src={
                      employee.foto
                        ? `${baseURL}/uploads/images/${employee.foto}`
                        : `/default-avatar.jpg`
                    }
                    alt={employee.nombre}
                  />
                  <EmployeeName>
                    {employee.nombre} {employee.apellido}
                  </EmployeeName>
                  <EmployeeInfo>
                    <MailButton
                      href={`mailto:${employee.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MailIcon /> Enviar correo
                    </MailButton>
                  </EmployeeInfo>
                  <EmployeeInfo>
                    <WhatsAppButton
                      href={`https://wa.me/${employee.telefono}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon /> Contactar por WhatsApp
                    </WhatsAppButton>
                  </EmployeeInfo>
                </EmployeeCard>
              ))
            ) : (
              <p>No hay empleados asignados a este servicio.</p>
            )}
          </EmployeeGrid>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ServiceEmployeesModal;
