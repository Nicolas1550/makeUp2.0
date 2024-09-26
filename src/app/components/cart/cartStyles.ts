import styled from "styled-components";

export const CartContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")}; /* Despliegue desde la derecha */
  width: 300px;
  height: 100%;
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  color: #6e5e4e; /* Marrón claro */
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05); /* Sombra suave */
  transition: right 0.3s ease; /* Transición de derecha */
  z-index: 1000;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
`;

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  padding-bottom: 0.5rem;
`;

export const CartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #d9b3a8; /* Beige suave rosado */
  text-transform: uppercase;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #f4c2c2; /* Rosado suave */
  font-size: 2.5rem; /* Aumentar el tamaño del botón */
  cursor: pointer;
  position: absolute;
  top: 1rem; /* Posición en la esquina superior derecha */
  right: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f08080; /* Hover rosado más oscuro */
  }

  @media (max-width: 768px) {
    font-size: 2rem; /* Ajustar tamaño en pantallas más pequeñas */
  }
`;

export const CartItemsList = styled.ul`
  flex: 1;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const CartItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
`;

export const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;
`;

export const ItemDetails = styled.div`
  flex: 1;
`;

export const ItemName = styled.p`
  font-size: 1.1rem;
  margin: 0;
  color: #6e5e4e; /* Marrón claro */
`;

export const ItemPrice = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #d9b3a8; /* Beige suave rosado */
`;

export const ItemControls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

export const QuantityButton = styled.button`
  background-color: #f4c2c2; /* Rosado suave */
  color: #fff;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f08080; /* Hover rosado más oscuro */
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #f44336;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff1744;
  }
`;

export const CheckoutButton = styled.button`
  background-color: #f4c2c2; /* Rosado suave */
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave */
  margin-top: 1rem;

  &:hover {
    background-color: #f08080; /* Hover rosado más oscuro */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Sombra más intensa */
  }
`;
