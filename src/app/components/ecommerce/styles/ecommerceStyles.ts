import styled, { keyframes } from "styled-components";
// Animación de rotación
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
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top: 6px solid #ffd700; // Color dorado
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;
// Estilos nuevos para las secciones interactivas
export const PageContainer = styled.div`
  background-color: #121212;
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
  padding: 4rem 2rem;
  min-height: 100vh;
`;

export const BannerContainer = styled.div`
  background-image: url("/banner2.webp");
  background-size: cover;
  background-position: center;
  padding: 7rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  /* Adding a gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    border-radius: 12px;
    z-index: 1; /* Ensure the overlay appears below the text */
  }
`;
export const BannerTitle = styled.h1`
  font-size: 4rem;
  color: #ffd700;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  max-width: 800px;
  position: relative;
  z-index: 2; /* Ensure text appears above the overlay */
`;

export const BannerButton = styled.button`
  background-color: #ffd700;
  color: #1c1c1c;
  padding: 1rem 3rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;

  &:hover {
    background-color: #e5c200;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;
export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #ffd700;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const HighlightedSection = styled.section`
  background-color: #1c1c1c;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  margin-bottom: 4rem;

  /* Flexbox para centrar contenido */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 500px;

  /* Estilo para el contenedor de Swiper */
  .swiper {
    width: 100%;
    max-width: 1200px;  /* Limita el ancho máximo del carrusel */
    height: 100%;       /* Asegura que el carrusel ocupe el espacio completo */
  }

  /* Estilo de las diapositivas (slides) */
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Asegúrate de que los ul/li tengan el estilo adecuado */
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  /* Responsividad */
  @media (max-width: 1024px) {
    padding: 2.5rem 1.5rem;
    margin-bottom: 3rem;
    min-height: 450px;

    .swiper {
      max-width: 900px;  /* Reduce el tamaño máximo en pantallas medianas */
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin-bottom: 2.5rem;
    min-height: 400px;

    .swiper {
      max-width: 700px;  /* Reduce el tamaño máximo en pantallas medianas */
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
    margin-bottom: 2rem;
    min-height: 350px;

    .swiper {
      max-width: 100%;  /* Ocupar todo el ancho disponible en móviles */
    }
  }
`;


export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Always 3 items per row */
  gap: 2rem;
  list-style: none;
  padding: 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 2 items per row on smaller screens */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 1 item per row on mobile screens */
  }
`;

export const TestimonialSection = styled.section`
  background-color: #1f1f1f;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 4rem;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  text-align: center;
`;

export const Testimonial = styled.p`
  font-style: italic;
  color: #f8f9fa;
  margin-bottom: 1rem;
`;

export const CustomerName = styled.p`
  font-weight: bold;
  color: #ffd700;
`;
