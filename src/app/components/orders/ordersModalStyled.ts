import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  background: rgba(35, 35, 35, 0.9);
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 600px;
  padding: 25px;
  position: relative;
  color: #eaeaea;
  border: 1px solid rgba(255, 215, 0, 0.4);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
    background: rgba(35, 35, 35, 0.7);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffd700;
    border-radius: 10px;
    border: 3px solid rgba(35, 35, 35, 0.9);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #e6b800;
  }

  /* Firefox Customization */
  scrollbar-width: thin;
  scrollbar-color: #ffd700 rgba(35, 35, 35, 0.7);
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.button`
  background: #ffd700;
  color: #1c1c1c;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #1c1c1c;
    color: #ffd700;
  }
`;

export const OrderItem = styled.div`
  border-bottom: 1px solid rgba(255, 215, 0, 0.4);
  padding: 15px 0;
  &:last-child {
    border-bottom: none;
  }
`;

export const OrderDetails = styled.div`
  padding: 15px 20px;
  background: rgba(50, 50, 50, 0.9);
  border-radius: 8px;
  margin-top: 10px;

  p {
    margin: 10px 0;
    font-size: 1rem;
    color: #eaeaea;
    strong {
      color: #ffd700;
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
  color: #ffd700; /* Color del texto inicial */
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(50, 50, 50, 0.9);
    color: #ffd700; 
  }
`;
