import styled from "styled-components";

export const ProductDetailsContainer = styled.div`
  background: linear-gradient(135deg, #fff5f5, #f5eaea);
  color: #6e5e4e; /* Marrón claro */
  font-family: "Montserrat", sans-serif;
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;

  @media (max-width: 768px) {
    padding: 1rem; /* Reduce padding en pantallas pequeñas */
  }
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco suave */
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15); /* Sombra más suave */
  transition: all 0.3s ease;
  max-width: 1200px; /* Ajuste de ancho máximo para pantallas grandes */
  width: 100%; /* Asegura que ocupe el 100% del contenedor */
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 100%; /* Ancho completo en pantallas medianas */
  }

  @media (max-width: 768px) {
    gap: 1rem; /* Menor espacio entre elementos en pantallas pequeñas */
  }

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  }
`;

export const ProductImageContainer = styled.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 300px; /* Ajustar tamaño en pantallas pequeñas */
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2); /* Sombra suave */
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

export const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const ProductName = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  color: #d9b3a8; /* Beige suave rosado */
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
  }
`;

export const ProductPrice = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #f4c2c2; /* Rosado suave */
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 1.8rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
  }
`;

export const ProductDescription = styled.p`
  font-size: 1.2rem;
  color: #6e5e4e; /* Marrón claro */
  line-height: 1.8;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
  }
`;

export const BuyButton = styled.button`
  padding: 1rem 2.5rem;
  background-color: #f4c2c2; /* Rosado suave */
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(244, 194, 194, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(244, 194, 194, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem; /* Botón más compacto en pantallas pequeñas */
    font-size: 1.2rem;
  }
`;

export const SubSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.85); /* Fondo blanco con transparencia */
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Sombras más suaves */
  text-align: center;
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;

  @media (max-width: 768px) {
    padding: 1rem; /* Reduce padding en pantallas pequeñas */
  }
`;

export const SubSectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #d9b3a8; /* Beige suave rosado */
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.6rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
  }
`;

export const SubSectionContent = styled.p`
  font-size: 1.3rem;
  color: #6e5e4e; /* Marrón claro */
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1.1rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
  }
`;
