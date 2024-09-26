import React, { useState, useEffect } from "react";
import axios from "axios";
import { Servicio } from "@/app/types/types";
import { CardContainer } from "../serviceCard/serviceCardStyled";
import ServiceCard from "../serviceCard/serviceCard";
import ServiceEmployeesModal from "./serviceEmployees";

const ServiceList: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(
    null
  );

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get("https://makeupbackend2-0.onrender.com/api/servicios");
        setServicios(response.data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };
    fetchServicios();
  }, []);

  const handleReserveClick = (servicio: Servicio) => {
    setSelectedServicio(servicio);
  };

  const handleCloseModal = () => {
    setSelectedServicio(null);
  };

  return (
    <div>
      <CardContainer>
        {servicios.map((servicio) => (
          <ServiceCard
            key={servicio.id}
            servicio={servicio}
            onReserve={() => handleReserveClick(servicio)}
          />
        ))}
      </CardContainer>

      {selectedServicio && (
        <ServiceEmployeesModal
          serviceId={selectedServicio.id.toString()}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ServiceList;
