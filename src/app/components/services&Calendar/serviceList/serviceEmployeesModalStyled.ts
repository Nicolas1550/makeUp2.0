import styled from "styled-components";
import { FaWhatsapp } from "react-icons/fa";

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
  background-color: rgba(28, 28, 28, 0.9);
  border-radius: 10px;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  padding-bottom: 10px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #ffd700;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #fff;
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
  background-color: rgba(44, 44, 44, 0.85);
  border-radius: 10px;
  width: 280px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

export const EmployeeImage = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin: 0 auto 15px; /* Centra la imagen */
  display: block;
`;

export const EmployeeName = styled.h4`
  color: #ffd700;
  margin-bottom: 10px;
`;

export const EmployeeInfo = styled.p`
  color: #f8f9fa;
  margin: 5px 0;
`;

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
  transition: background-color 0.3s;

  &:hover {
    background-color: #1ebc57;
  }
`;

export const WhatsAppIcon = styled(FaWhatsapp)`
  margin-right: 10px;
  font-size: 1.2rem;
`;
