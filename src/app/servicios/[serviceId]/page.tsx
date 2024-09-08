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

// Animación de fade-in para la entrada suave
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animación de slide-up para la tarjeta
const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Estilos adaptados a los colores y diseño moderno del proyecto
const InfoSection = styled.section`
  background-color: #1c1c1c;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  margin-bottom: 100px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #ffffff;
  margin-bottom: 150px;
  animation: ${fadeIn} 1s ease-out; /* Añadir animación */
`;

// Contenedor moderno y atractivo para la tarjeta del servicio
const ServiceCardContainer = styled.div`
  background-color: #1f1f1f;
  padding: 2rem;
  border-radius: 20px;
  border: 2px solid #ffd700;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 6px 20px rgba(255, 215, 0, 0.1);
  margin: -80px auto 100px auto;
  max-width: 900px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${slideUp} 1s ease-out; /* Añadir animación */
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8),
      0 10px 40px rgba(255, 215, 0, 0.2);
  }
`;

const PaymentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  li {
    background-color: #ffd700;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    color: #1c1c1c;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #e5c200;
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    }
  }
`;

const PaymentIcon = styled.span`
  font-size: 1.5rem;
  display: inline-block;
  color: #1c1c1c;
`;

const ServiceTitle = styled.h2`
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
`;

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
          `https://backendiaecommerce.onrender.com/api/servicios/${serviceIdString}`
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
