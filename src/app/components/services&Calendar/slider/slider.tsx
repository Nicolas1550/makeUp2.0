import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles"; // Importamos el componente de partículas

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  background: url("/background.webp") center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    height: 60vh; /* Incrementa la altura en dispositivos móviles */
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffd700;
  font-size: 2.5rem;
  text-align: center;
  z-index: 2;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  opacity: 1; /* Inicialmente visible */

  @media (max-width: 768px) {
    font-size: 2rem; /* Ajusta el tamaño de la fuente en móviles */
  }
`;

const HeroSubtitle = styled(motion.h2)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffd700;
  font-size: 2rem;
  text-align: center;
  z-index: 2;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  margin-top: 20px;
  opacity: 0; /* Inicialmente oculto */

  @media (max-width: 768px) {
    top: 70%; /* Ajusta la posición en móviles */
    font-size: 1.5rem; /* Ajusta el tamaño de la fuente en móviles */
  }
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const HeroSlider: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      if (newScrollY > 400) {
        setShowSubtitle(true);
        setHideTitle(true);
      } else if (newScrollY < 50) {
        setShowSubtitle(false);
        setHideTitle(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeroContainer>
      <HeroOverlay />
      <HeroTitle
        style={{
          transform: `translate(-50%, calc(-50% - ${scrollY * 0.1}px))`,
          opacity: hideTitle ? 0 : 1,
          transition: "opacity 0.1s ease-in-out",
        }}
      >
        Los mejores servicios a un click
      </HeroTitle>
      <HeroSubtitle
        style={{
          transform: `translate(-50%, calc(-50% - ${scrollY * 0.1}px))`,
          opacity: showSubtitle ? 1 : 0,
          transition: "opacity 0.1s ease-in-out",
        }}
      >
        Prepárate para conocer la magia
      </HeroSubtitle>

      <CanvasContainer>
        <Canvas>
          <Particles />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </CanvasContainer>
    </HeroContainer>
  );
};

export default HeroSlider;
