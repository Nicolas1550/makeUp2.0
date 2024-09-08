import styled from "styled-components";

export const CartContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) =>
    isOpen ? "0" : "-100%"}; /* Despliegue desde la izquierda */
  width: 300px;
  height: 100%;
  background-color: #1c1c1c;
  color: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  transition: left 0.3s ease;
  z-index: 1000;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
`;

export const CartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffd700;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ffd700;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffdd44;
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
  border-bottom: 1px solid #333;
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
  color: #ffffff;
`;

export const ItemPrice = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #ffd700;
`;

export const ItemControls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

export const QuantityButton = styled.button`
  background-color: #ffd700;
  color: #1c1c1c;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffdd44;
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
  background-color: #ffd700;
  color: #1c1c1c;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-top: 1rem;

  &:hover {
    background-color: #e5c200;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;
