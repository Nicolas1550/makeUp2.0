import styled from "styled-components";
import Button from "@mui/material/Button";

export const StyledModalContainer = styled.div`
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  color: #6e5e4e; /* Marrón claro */
  border-radius: 12px;
  max-width: 600px;
  margin: 5rem auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); /* Sombra más intensa */
  }
`;

export const ProductDetailsContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco claro */
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Sombra suave */
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #6e5e4e; /* Marrón claro */
  margin-bottom: 5px;
`;

export const ProductAttributes = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #6e5e4e; /* Marrón claro */
`;

export const ProductAttribute = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 3px;

  span {
    font-weight: bold;
    margin-right: 5px;
    color: #6e5e4e; /* Marrón claro */
  }
`;

export const ModalHeader = styled.h2`
  margin-bottom: 1.5rem;
  color: #d9b3a8; /* Beige suave rosado */
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const OrderContainer = styled.div`
  margin-bottom: 1rem;
  background-color: rgba(240, 240, 240, 0.7); /* Fondo blanco claro */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Sombra suave */
`;

export const OrderHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  border-radius: 10px 10px 0 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(240, 240, 240, 0.7); /* Hover más claro */
  }

  span {
    font-weight: bold;
    color: #d9b3a8; /* Beige suave rosado */
  }
`;

export const ToggleButton = styled.span`
  font-size: 1.2rem;
  color: #d9b3a8; /* Beige suave rosado */
`;

export const OrderDetails = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  border-radius: 0 0 10px 10px;
`;

export const OrderItem = styled.div`
  margin-bottom: 0.5rem;

  strong {
    color: #d9b3a8; /* Beige suave rosado */
  }

  ul {
    margin: 0;
    padding-left: 1rem;
    list-style-type: disc;
  }

  li {
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
  }
`;

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); /* Sombra suave */
`;

export const TableWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05); /* Sombra interior suave */

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(240, 240, 240, 0.7); /* Fondo claro */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d9b3a8; /* Beige suave rosado */
    border-radius: 10px;
    border: 3px solid rgba(240, 240, 240, 0.7); /* Fondo claro */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #e5c200;
  }
`;

export const CloseButton = styled(Button)`
  background-color: #f4c2c2 !important; /* Rosado suave */
  color: #fff !important;
  padding: 0.6rem 1.2rem !important;
  border-radius: 8px !important;
  font-weight: bold !important;
  margin-top: 1.5rem !important;
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
  transition: background-color 0.3s ease !important;

  &:hover {
    background-color: #f08080 !important; /* Hover rosado más oscuro */
  }
`;
