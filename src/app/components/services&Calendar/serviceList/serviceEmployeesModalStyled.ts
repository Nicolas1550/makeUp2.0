import styled from "styled-components";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa"; // Añadimos el ícono de correo electrónico

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  border-radius: 10px;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Sombra suave */
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  padding-bottom: 10px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #d9b3a8; /* Beige suave rosado */
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #f08080; /* Hover rosado más oscuro */
  }
`;

export const ModalBody = styled.div`
  margin-top: 20px;
`;

export const EmployeeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const EmployeeCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco claro */
  border-radius: 10px;
  width: 280px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Sombra suave */
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra más intensa */
  }
`;

export const EmployeeImage = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 0 auto 15px;
  display: block;
`;

export const EmployeeName = styled.h4`
  color: #d9b3a8; /* Beige suave rosado */
  margin-bottom: 10px;
`;

export const EmployeeInfo = styled.p`
  color: #6e5e4e; /* Marrón claro */
  margin: 5px 0;
`;

// Estilos del botón de WhatsApp
export const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #25d366;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1ebc57;
  }
`;

export const WhatsAppIcon = styled(FaWhatsapp)`
  margin-right: 10px;
  font-size: 1.2rem;
`;

// Estilos del botón de correo electrónico
export const MailButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #007bff; /* Azul para el email */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Hover azul más oscuro */
  }
`;

export const MailIcon = styled(FaEnvelope)`
  margin-right: 10px;
  font-size: 1.2rem;
`;
