import styled, { keyframes } from "styled-components";

// Animación de rotación para el spinner
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Contenedor del spinner
export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

// Spinner
export const LoadingSpinner = styled.div`
  border: 6px solid rgba(240, 240, 240, 0.3); /* Mantener la consistencia de color suave */
  border-top: 6px solid #d9b3a8; /* Beige suave rosado */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

export const PageContainer = styled.div`
  background-color: #f0eae0; /* Beige claro */
  color: #333; /* Texto en gris oscuro */
  font-family: "Montserrat", sans-serif;
  padding: 4rem 2rem;
  min-height: 100vh;
`;

// Contenedor del banner
export const BannerContainer = styled.div`
  background-image: url("/ofer.webp");
  background-size: cover;
  background-position: center 30%; /* Ajusta la imagen para que se mueva un poco hacia abajo */
  padding: 7rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #f5f5f5; /* Texto en blanco suave para mejor contraste */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Sombra más oscura para más profundidad */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,    /* Más oscuro en la parte superior */
      rgba(0, 0, 0, 0.3) 50%,   /* Transición suave hacia el centro */
      rgba(0, 0, 0, 0.6) 100%   /* Más oscuro en la parte inferior */
    );
    border-radius: 12px;
    z-index: 1;
  }

  position: relative;
  z-index: 1;
`;

// Título del banner
export const BannerTitle = styled.h1`
  font-size: 4rem;
  color: #d9b3a8; /* Beige suave rosado */
  margin-bottom: 2rem;
  text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.7); /* Sombra más pronunciada con blur */
  max-width: 800px;
  position: relative;
  z-index: 2;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110%;
    height: 110%;
    z-index: -1;
    background: rgba(0, 0, 0, 0.5); /* Capa de fondo oscura */
    filter: blur(10px); /* Efecto de desenfoque */
    border-radius: 8px; /* Bordes redondeados para suavizar el efecto */
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// Botón del banner
export const BannerButton = styled.button`
  background-color: #d9b3a8; /* Beige suave rosado */
  color: #fff; /* Texto blanco */
  padding: 1rem 3rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;

  &:hover {
    background-color: #cba593;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2.5rem;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 2rem;
    font-size: 1rem;
  }
`;

// Título de sección
export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #d9b3a8; /* Beige suave rosado */
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

// Sección destacada
export const HighlightedSection = styled.section`
  background-color: #faf5f0; /* Fondo beige claro */
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Sombras ligeras */
  margin-bottom: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 500px;

  .swiper {
    width: 100%;
    max-width: 1200px;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 1024px) {
    padding: 2.5rem 1.5rem;
    margin-bottom: 3rem;
    min-height: 450px;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin-bottom: 2.5rem;
    min-height: 400px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
    margin-bottom: 2rem;
    min-height: 350px;
  }
`;

// Sección de testimonios
export const TestimonialSection = styled.section`
  background-color: #f5ece4; /* Fondo beige claro */
  padding: 2rem;
  border-radius: 12px;
  margin-top: 4rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  text-align: center;
`;

// Testimonio
export const Testimonial = styled.p`
  font-style: italic;
  color: #333; /* Texto en gris oscuro */
  margin-bottom: 1rem;
`;

// Nombre del cliente
export const CustomerName = styled.p`
  font-weight: bold;
  color: #d9b3a8; /* Beige suave rosado */
`;

export const ProductGridContainer = styled.div`
  width: 100%;
  max-width: 1400px; /* Tamaño máximo en pantallas grandes */
  margin: 0 auto; /* Centrar el contenedor */
  padding: 0 1rem; /* Espacio alrededor en pantallas pequeñas */
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tres productos por fila en pantallas grandes */
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); /* Dos productos por fila en pantallas medianas */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Un producto por fila en pantallas pequeñas */
  }
`;
