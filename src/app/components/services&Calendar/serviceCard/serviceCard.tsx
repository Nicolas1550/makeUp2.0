import React from "react";
import {
  Card,
  CardButton,
  CardTitle,
  CardDescription,
  CardPrice,
  CalendarIcon,
} from "./serviceCardStyled";
import { Servicio } from "@/app/types/types";

interface ServiceCardProps {
  servicio: Servicio;
  onReserve: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ servicio, onReserve }) => {
  return (
    <Card>
      <CardTitle>
      <CalendarIcon />
      {servicio.nombre}
      </CardTitle>
      <CardDescription>{servicio.descripcion}</CardDescription>
      <CardPrice>Precio: ${servicio.precio}</CardPrice>
      <CardButton onClick={onReserve}>Reservar</CardButton>
    </Card>
  );
};

export default ServiceCard;
