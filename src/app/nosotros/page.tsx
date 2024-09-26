"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Animación para los escalones con framer-motion
const slideIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
};

const ContenedorEscalera = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.7));
  color: #6e5e4e; /* Marrón claro */
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Escalon = styled(motion.div)<{ reverse?: boolean }>`
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco suave */
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05); /* Sombra suave */
  margin: 2.5rem 0;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 16px 30px rgba(240, 192, 192, 0.5); /* Sombra rosada suave */
    transform: translateY(-10px);
  }
`;

const TextoEscalon = styled.div`
  flex: 1;
  padding: 1.5rem 3rem;
  color: #6e5e4e; /* Marrón claro */
`;

const TituloEscalon = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  color: #d9b3a8; /* Beige suave rosado */
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 0 0 10px rgba(217, 179, 168, 0.5); /* Sombra suave */
`;

const ParrafoEscalon = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  color: #6e5e4e; /* Marrón claro */
  font-family: "Montserrat", sans-serif;
`;

const ImagenEscalon = styled.div<{ src: string }>`
  flex: 1;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 250px;
  border-radius: 12px;
  border: 3px solid #d9b3a8; /* Beige suave rosado */
  box-shadow: 0 4px 10px rgba(240, 192, 192, 0.5); /* Sombra rosada suave */
`;


const PaginaNosotros: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <ContenedorEscalera>
      <Escalon
        reverse={false}
        initial="hidden"
        animate="visible"
        variants={slideIn}
      >
        <TextoEscalon>
          <TituloEscalon>Sobre Nosotros</TituloEscalon>
          <ParrafoEscalon>
            Bienvenidos a <strong>Mi Empresa de Belleza</strong>, donde ofrecemos una experiencia única para el cuidado personal.
          </ParrafoEscalon>
        </TextoEscalon>
        <ImagenEscalon src="/nostros.webp" />
      </Escalon>

      <Escalon
        reverse
        initial="hidden"
        animate="visible"
        variants={slideIn}
      >
        <TextoEscalon>
          <TituloEscalon>Nuestra Misión</TituloEscalon>
          <ParrafoEscalon>
            Nuestra misión es realzar la belleza natural de cada uno de nuestros clientes mediante servicios innovadores y de alta calidad.
          </ParrafoEscalon>
        </TextoEscalon>
        <ImagenEscalon src="/mision.webp" />
      </Escalon>

      <Escalon
        reverse={false}
        initial="hidden"
        animate="visible"
        variants={slideIn}
      >
        <TextoEscalon>
          <TituloEscalon>Nuestros Valores</TituloEscalon>
          <ParrafoEscalon>
            <strong>Mi Empresa de Belleza</strong> se basa en los valores de respeto, innovación y dedicación.
          </ParrafoEscalon>
        </TextoEscalon>
        <ImagenEscalon src="/valores.webp" />
      </Escalon>

      <Escalon
        reverse
        initial="hidden"
        animate="visible"
        variants={slideIn}
      >
        <TextoEscalon>
          <TituloEscalon>Contacto</TituloEscalon>
          <ParrafoEscalon>
            Estamos ubicados en el corazón de la ciudad. ¡Esperamos verte pronto!
          </ParrafoEscalon>
        </TextoEscalon>
        <ImagenEscalon src="/contacto.webp" />
      </Escalon>
    </ContenedorEscalera>
  );
};

export default PaginaNosotros;
