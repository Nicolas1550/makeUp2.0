import styled, { keyframes } from "styled-components";
// Animación de fade-in para la entrada suave
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animación de slide-up para la tarjeta
const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Estilos adaptados a los colores y diseño moderno del proyecto
export const InfoSection = styled.section`
  background-color: rgba(255, 255, 255, 0.9); 
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(217, 179, 168, 0.5); 
  margin-bottom: 100px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #6e5e4e;
  animation: ${fadeIn} 1s ease-out;
`;

// Contenedor moderno y atractivo para la tarjeta del servicio
export const ServiceCardContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  padding: 2rem;
  border-radius: 20px;
  border: 2px solid #d9b3a8; /* Beige suave rosado */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(217, 179, 168, 0.2); /* Sombra suave */
  margin: -80px auto 100px auto;
  max-width: 900px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${slideUp} 1s ease-out;

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2),
      0 10px 40px rgba(217, 179, 168, 0.4); /* Sombra más intensa */
  }
`;

export const PaymentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  li {
    background-color: #f4c2c2; /* Rosado suave */
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #f08080; /* Hover rosa más oscuro */
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Sombra más intensa */
    }
  }
`;

export const PaymentIcon = styled.span`
  font-size: 1.5rem;
  display: inline-block;
  color: #6e5e4e; /* Marrón claro */
`;

export const ServiceTitle = styled.h2`
  font-size: 2.5rem;
  color: #d9b3a8; /* Beige suave rosado */
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); /* Sombra suave */
`;
