import styled from "styled-components";
import { FaRegCalendarAlt } from "react-icons/fa";

export const CalendarIcon = styled(FaRegCalendarAlt)`
  margin-right: 8px;
  color: #d9b3a8; /* Beige suave rosado */
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f08080; /* Hover en rosa más oscuro */
  }
`;
export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-content: center;
  margin-top: 4rem;
  margin-left: 10rem;
  margin-right: 10rem;
  margin-bottom: 10rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); /* Sombra suave */
  text-align: center;
  color: #6e5e4e; /* Marrón claro */
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Sombra más intensa */
    background: rgba(255, 255, 255, 1); /* Fondo blanco al hover */
  }
`;

export const CardButton = styled.button`
  background: #f4c2c2; /* Rosado suave */
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  color: #fff;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #f08080; /* Hover en rosa más oscuro */
    color: #fff;
    transform: translateY(-3px);
  }
`;

export const CardTitle = styled.h3`
  color: #d9b3a8; /* Beige suave rosado */
  margin-bottom: 16px;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  text-shadow: 0 0 10px rgba(217, 179, 168, 0.5); /* Sombra suave */
`;

export const CardDescription = styled.p`
  color: #6e5e4e; /* Marrón claro */
  margin-bottom: 12px;
  font-size: 1rem;
  line-height: 1.4;
`;

export const CardPrice = styled.p`
  color: #6e5e4e; /* Marrón claro */
  margin-bottom: 16px;
  font-size: 1.2rem;
  font-weight: bold;
`;
