"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Points } from "@react-three/drei";
import * as THREE from "three";

const FullWidthBackground = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #1c1c1c 30%, #2a2a2a 100%);
  position: relative;
  padding: 2rem 0;
  overflow: hidden;
  color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

const PatternOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/background.webp");
  opacity: 0.1;
  z-index: 0;
  pointer-events: none;
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
  background: rgba(40, 40, 40, 0.3);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem 0;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  z-index: 2;
`;

const Image = styled(motion.img)`
  width: 100%;
  max-width: 70%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  border: 3px solid transparent;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    border: 3px solid #d4af37;
  }

  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

const Caption = styled(motion.div)`
  margin-top: 1rem;
  font-size: 1rem;
  color: #d4af37;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const BackgroundScene = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const CustomParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.01;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const particleCount = 1000; // Reducido para mejorar el rendimiento en dispositivos móviles

  for (let i = 0; i < particleCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(150);
    const y = THREE.MathUtils.randFloatSpread(150);
    const z = THREE.MathUtils.randFloatSpread(150);
    vertices.push(x, y, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        attach="material"
        color="#c0c0c0"
        size={1.0}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
};

const Carousel3D: React.FC = () => {
  const images = [
    { src: "corteClasico.webp", caption: "Corte Clásico" },
    { src: "a22.webp", caption: "Estilo Moderno" },
    { src: "barbaCompleta.webp", caption: "Barba Completa" },
    { src: "a44.webp", caption: "Corte Desvanecido" },
    { src: "coloracion.webp", caption: "Coloración" },
  ];

  return (
    <FullWidthBackground>
      <PatternOverlay />
      <CarouselContainer>
        <BackgroundScene>
          <Canvas>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.4} />
            <Environment preset="city" />
            <CustomParticles />
          </Canvas>
        </BackgroundScene>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 80, // Ajustar para pantallas pequeñas
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          navigation={false}
          pagination={false}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              style={{ maxWidth: "80%", height: "auto" }}
            >
              <SlideContainer>
                <Image
                  src={image.src}
                  alt={`Slide ${index + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <Caption
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {image.caption}
                </Caption>
              </SlideContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>
    </FullWidthBackground>
  );
};

export default Carousel3D;
