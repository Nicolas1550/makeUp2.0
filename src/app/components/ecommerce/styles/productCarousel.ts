import styled from "styled-components";

export const CarouselContainer = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  max-width: 1200px; /* Ancho máximo del carrusel */
  margin: 0 auto; /* Centra el carrusel */

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 1rem;
    height: auto;  /* Ajusta la altura automáticamente al contenido */
    transform: scale(0.9); /* Escala inicial */
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1); /* Aumenta el tamaño al hacer hover */
    }
  }

  .swiper-pagination-bullet {
    background-color: #ffd700;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ffdd44; /* Más claro en hover */
    }
  }

  .swiper-pagination-bullet-active {
    background-color: #ffdd44; /* Color activo */
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #ffd700;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #ffdd44;
      transform: scale(1.2);
    }
  }

  .swiper-button-prev {
    left: 15px;
  }

  .swiper-button-next {
    right: 15px;
  }
`;