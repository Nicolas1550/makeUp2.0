import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";

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
    height: 60vh; 
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
  opacity: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
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
  opacity: 0;

  @media (max-width: 768px) {
    top: 70%;
    font-size: 1.5rem;
  }
`;

const Particles = () => {
  const points = useRef<THREE.Points | null>(null);

  // Animar las partículas rotando constantemente sin importar el scroll
  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.0005; // Rotación más lenta y constante
    }
  });

  const particlesCount = 5000;
  const positions = new Float32Array(particlesCount * 3);

  // Generar las posiciones iniciales de las partículas
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
  }

  return (
    <Points ref={points} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffd700"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

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
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Particles />
          <Preload all />
        </Canvas>
      </CanvasContainer>
    </HeroContainer>
  );
};

export default HeroSlider;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;
