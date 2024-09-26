import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Particles from "./Particles"; 


export const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  background: url("/background.webp") center center/cover no-repeat;
  background-attachment: fixed; /* Activa el efecto parallax */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    height: 60vh;
    background-attachment: scroll; /* Desactiva parallax en móviles */
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const HeroTitle = styled(motion.h1)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #d9b3a8; /* Beige suave rosado */
  font-size: 2.5rem;
  text-align: center;
  z-index: 2;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  opacity: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled(motion.h2)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #d9b3a8; /* Beige suave rosado */
  font-size: 2rem;
  text-align: center;
  z-index: 2;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  margin-top: 20px;
  opacity: 0; /* Inicialmente oculto */

  @media (max-width: 768px) {
    top: 70%;
    font-size: 1.5rem;
  }
`;

export const CanvasContainer = styled.div`
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
