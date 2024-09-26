"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Servicio } from "@/app/types/types";
import ServiceCard from "@/app/components/services&Calendar/serviceCard/serviceCard";
import ServiceEmployeesModal from "@/app/components/services&Calendar/serviceList/serviceEmployees";
import styled, { keyframes } from "styled-components";
import {
  CustomerName,
  LoadingSpinner,
  PageContainer,
  SectionTitle,
  SpinnerContainer,
  Testimonial,
  TestimonialSection,
} from "@/app/components/ecommerce/styles/ecommerceStyles";
import { InfoSection, PaymentIcon, PaymentList, ServiceCardContainer, ServiceTitle } from "@/app/components/ecommerce/styles/stylesServices";



// Componente principal
const ServicePage: React.FC = () => {
  const { serviceId } = useParams();
  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const serviceIdString = Array.isArray(serviceId) ? serviceId[0] : serviceId;

  useEffect(() => {
    if (!serviceIdString) return;

    const fetchServicio = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/servicios/${serviceIdString}`
        );
        setServicio(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchServicio();
  }, [serviceIdString]);

  const handleReserve = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <SpinnerContainer>
        <LoadingSpinner />
      </SpinnerContainer>
    );
  }

  if (error || !servicio) {
    return <p>Servicio no encontrado</p>;
  }

  return (
    <PageContainer>
      {/* Sección de Información del Servicio */}
      <InfoSection>
        <ServiceTitle>Información del Servicio</ServiceTitle>
        <p>
          Los servicios se abonan directamente en el local. Aceptamos los
          siguientes métodos de pago:
        </p>
        <PaymentList>
          <li>
            <PaymentIcon>💳</PaymentIcon> Tarjeta de Crédito/Débito
          </li>
          <li>
            <PaymentIcon>🏦</PaymentIcon> Transferencia Bancaria
          </li>
          <li>
            <PaymentIcon>💵</PaymentIcon> Efectivo
          </li>
          <li>
            <PaymentIcon>📱</PaymentIcon> MercadoPago
          </li>
        </PaymentList>
      </InfoSection>

      {/* Contenedor de la tarjeta del servicio */}
      <ServiceCardContainer>
        <ServiceCard servicio={servicio} onReserve={handleReserve} />
      </ServiceCardContainer>

      {isModalOpen && (
        <ServiceEmployeesModal
          serviceId={serviceIdString}
          onClose={handleCloseModal}
        />
      )}

      {/* Sección de Testimonios */}
      <TestimonialSection>
        <SectionTitle>Opiniones de Nuestros Clientes</SectionTitle>
        <Testimonial>
          &quot;Excelente servicio, siempre me atienden con profesionalismo y el
          lugar es muy acogedor.&quot;
        </Testimonial>
        <CustomerName>- Juan Pérez</CustomerName>

        <Testimonial>
          &quot;La atención al cliente es fantástica y los empleados son muy
          amables.&quot;
        </Testimonial>
        <CustomerName>- María Gómez</CustomerName>
      </TestimonialSection>
    </PageContainer>
  );
};

export default ServicePage;
