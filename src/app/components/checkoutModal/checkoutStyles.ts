import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Contenedor del modal de checkout, con estilos similares al navbar
export const StyledModalContainer = styled.div`
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco suave similar al navbar */
  border-radius: 10px;
  max-width: 600px;
  margin: 5rem auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1); /* Sombras más suaves */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); /* Sombras más intensas al hover */
  }
`;

// Header del modal
export const ModalHeader = styled.h2`
  margin-bottom: 1.5rem;
  color: #d9b3a8; /* Beige suave rosado, siguiendo el tema del logo */
  text-align: center;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 1.5px;
`;

// Estilos para los campos de entrada personalizados, en línea con los colores del navbar
export const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: rgba(240, 240, 240, 0.6); /* Fondo claro */
    color: #1c1c1c; /* Texto oscuro */
  }

  & .MuiInputLabel-root {
    color: #d9b3a8; /* Color del label alineado con el beige suave rosado */
  }

  & .MuiInput-underline:before {
    border-bottom-color: #d9b3a8; /* Línea inferior beige */
  }

  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom-color: #f08080; /* Hover con rosa más oscuro */
  }
`;

// Botones del checkout (Aceptar/Cancelar) alineados al estilo general
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

// Estilo de los botones del checkout
export const StyledButton = styled(Button)`
  background-color: #f4c2c2 !important; /* Rosado suave */
  color: #1c1c1c !important; /* Texto oscuro */
  padding: 0.6rem 1.2rem !important;
  border-radius: 8px !important;
  font-weight: bold !important;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;

  &:hover {
    background-color: #f08080 !important; /* Hover con rosa más oscuro */
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3) !important; /* Sombras más intensas */
  }
`;

export const CheckoutSummary = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7); /* Fondo blanco suave */
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Sombra ligera */
`;

// Estilo para los totales o resúmenes de la compra
export const TotalAmount = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #6e5e4e; /* Marrón claro, en línea con los enlaces del navbar */
  text-align: center;
`;

export const SummaryItem = styled.p`
  font-size: 1.1rem;
  color: #6e5e4e; /* Marrón claro */
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
`;

// Estilo para mostrar algún spinner de carga
export const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 182, 193, 0.3); /* Rosado claro */
  border-top: 4px solid #f08080; /* Rosa más oscuro */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
export const BankDetailsContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Sombra suave */
  margin: 1rem 0;
`;

// Estilo para los textos de los detalles bancarios con letra negra
export const BankDetailText = styled.p`
  font-size: 1.1rem;
  color: #1c1c1c; /* Texto en negro */
  margin-bottom: 0.5rem;
  font-weight: bold;
`;
