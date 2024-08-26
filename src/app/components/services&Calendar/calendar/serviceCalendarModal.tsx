import React from "react";
import { Servicio } from "@/app/types/types";
import MyCalendar from "./calendar";
import Modal from "../../modal/modal";

interface ServiceCalendarModalProps {
  servicio: Servicio;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}

const ServiceCalendarModal: React.FC<ServiceCalendarModalProps> = ({
  servicio,
  isOpen,
  onClose,
  isAdmin,
}) => {
  if (!isOpen) return null; // Evita renderizar el modal si isOpen es falso

  return (
    <Modal
      title={`Disponibilidades para ${servicio.nombre}`}
      isOpen={isOpen} // Pasamos isOpen al modal
      onClose={onClose}
      actions={[{ label: "Cerrar", handler: onClose }]}
    >
      <MyCalendar
        isAdmin={isAdmin}
        servicioId={servicio.id}
        closeParentModal={onClose}
      />
    </Modal>
  );
};

export default ServiceCalendarModal;
