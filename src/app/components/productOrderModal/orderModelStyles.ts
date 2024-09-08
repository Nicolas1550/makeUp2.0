import styled from "styled-components";
import Button from "@mui/material/Button";

export const StyledModalContainer = styled.div`
  padding: 2.5rem;
  background: linear-gradient(145deg, #1a1a1a, #333333);
  color: #f8f9fa;
  border-radius: 12px;
  max-width: 600px;
  margin: 5rem auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  }
`;

export const ModalHeader = styled.h2`
  margin-bottom: 1.5rem;
  color: #ffd700;
  text-align: center;
`;

export const OrderContainer = styled.div`
  margin-bottom: 1rem;
  background-color: #2a2a2a;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const OrderHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #333;
  border-radius: 10px 10px 0 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #444;
  }

  span {
    font-weight: bold;
    color: #ffd700;
  }
`;

export const ToggleButton = styled.span`
  font-size: 1.2rem;
  color: #ffd700;
`;

export const OrderDetails = styled.div`
  padding: 1rem;
  background-color: #1f1f1f;
  border-radius: 0 0 10px 10px;
`;

export const OrderItem = styled.div`
  margin-bottom: 0.5rem;

  strong {
    color: #ffd700;
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

// Estilo para la imagen del producto
export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

export const TableWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #2a2a2a;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffd700;
    border-radius: 10px;
    border: 3px solid #2a2a2a;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #e5c200;
  }
`;

export const CloseButton = styled(Button)`
  background-color: #ffd700 !important;
  color: #1c1c1c !important;
  padding: 0.6rem 1.2rem !important;
  border-radius: 8px !important;
  font-weight: bold !important;
  margin-top: 1.5rem !important;
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;

  &:hover {
    background-color: #e5c200 !important;
  }
`;
