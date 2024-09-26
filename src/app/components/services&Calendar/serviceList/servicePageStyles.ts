import styled from "styled-components";

export const ServiceDetailsContainer = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  color: #6e5e4e; /* Marrón claro */
  min-height: 100vh;
`;

export const ServiceImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
`;

export const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ServiceName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #d9b3a8; /* Beige suave rosado */
  text-shadow: 0 0 10px rgba(217, 179, 168, 0.5); /* Sombra suave */
`;

export const ServiceDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #6e5e4e; /* Marrón claro */
`;

export const ServicePrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #d9b3a8; /* Beige suave rosado */
`;

export const ReserveButton = styled.button`
  padding: 1rem 2rem;
  background-color: #f4c2c2; /* Rosado suave */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
  color: #fff;

  &:hover {
    background-color: #f08080; /* Hover en rosa más oscuro */
    transform: translateY(-2px);
  }
`;
