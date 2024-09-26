"use client";
import React, { useEffect, useRef, useState } from "react";
import ServiceList from "../components/services&Calendar/serviceList/serviceList";
import Services from "../components/services&Calendar/services";
import HeroSlider from "../components/services&Calendar/slider/slider";

const ServicesPage: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false); 
  const serviceListRef = useRef<HTMLDivElement | null>(null);

  // Función que se ejecutará al hacer clic en "Reservar Ahora"
  const handleReserveClick = () => {
    if (serviceListRef.current) {
      serviceListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Efecto para forzar el renderizado después de montar
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Si el componente aún no ha montado, no renderizamos nada
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Services onReserveClick={handleReserveClick} />
      <HeroSlider />
      <div ref={serviceListRef}>
        <ServiceList />
      </div>
    </>
  );
};

export default ServicesPage;
