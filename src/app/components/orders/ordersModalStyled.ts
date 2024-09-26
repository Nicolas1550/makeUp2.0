import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StatusSelectContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 1rem;
    color: #d9b3a8; /* Beige suave rosado */
    font-weight: bold;
  }
`;

export const StatusSelect = styled.select`
  padding: 10px 15px;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  color: #6e5e4e; /* Marrón claro */
  border: 2px solid #d9b3a8; /* Beige suave rosado */
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  appearance: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #d9b3a8; /* Hover beige suave */
    color: #1c1c1c;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(217, 179, 168, 0.5); /* Sombra suave */
  }
`;

export const StatusOption = styled.option`
  background-color: #ffffff;
  color: #6e5e4e; /* Marrón claro */
`;

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 600px;
  padding: 25px;
  position: relative;
  color: #6e5e4e; /* Marrón claro */
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05); /* Sombra suave */
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalContent = styled.div<{ numOrders: number }>`
  flex-grow: 1;
  overflow-y: ${({ numOrders }) => (numOrders > 4 ? "auto" : "visible")};
  max-height: ${({ numOrders }) => (numOrders > 4 ? "400px" : "auto")};

  /* Personalización de la barra de scroll */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9b3a8; /* Beige suave rosado */
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.9); /* Fondo blanco */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #e6b800;
  }

  /* Firefox Customization */
  scrollbar-width: thin;
  scrollbar-color: #d9b3a8 rgba(255, 255, 255, 0.9);
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.button`
  background: #f4c2c2; /* Rosado suave */
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #f08080; /* Hover rosado más oscuro */
    color: #fff;
  }
`;

export const OrderItem = styled.div`
  border-bottom: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  padding: 15px 0;
  &:last-child {
    border-bottom: none;
  }
`;

export const OrderDetails = styled.div`
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  border-radius: 8px;
  margin-top: 10px;

  p {
    margin: 10px 0;
    font-size: 1rem;
    color: #6e5e4e; /* Marrón claro */
    strong {
      color: #d9b3a8; /* Beige suave rosado */
    }
  }
`;

export const ExpandButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 15px;
  text-align: left;
  font-size: 1.1rem;
  color: #d9b3a8; /* Color del texto inicial */
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(240, 240, 240, 0.7); /* Hover más claro */
    color: #6e5e4e; /* Marrón claro */
  }
`;

export const StatusLabel = styled.span<{ status: string }>`
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: bold;
  color: #fff;
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.9rem;

  /* Colores personalizados para cada estado */
  background-color: ${({ status }) =>
    status === "aprobado"
      ? "#28a745"
      : status === "rechazado"
      ? "#dc3545"
      : status === "pendiente"
      ? "#ffc107"
      : "#6c757d"}; /* Color de fondo según el estado */
`;
