import styled from "styled-components";

export const CarouselContainer = styled.div`
  margin-bottom: 3rem;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 1rem;
    height: auto; /* Ajusta la altura automáticamente al contenido */
    transform: scale(0.85); /* Escala inicial más pequeña */
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1); /* Aumenta el tamaño al hacer hover */
    }

    @media (max-width: 768px) {
      transform: scale(0.9); /* Escala un poco más grande en tablets */
    }

    @media (max-width: 480px) {
      transform: scale(1); /* Escala completa en móviles */
      padding: 0.5rem; /* Reducir el padding en móviles */
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

    @media (max-width: 480px) {
      display: none; /* Ocultar los botones de navegación en móviles */
    }
  }

  .swiper-button-prev {
    left: 15px;

    @media (max-width: 480px) {
      left: 10px; /* Ajustar en móviles si decides mantenerlo */
    }
  }

  .swiper-button-next {
    right: 15px;

    @media (max-width: 480px) {
      right: 10px; /* Ajustar en móviles si decides mantenerlo */
    }
  }
`;
