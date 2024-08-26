"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar/navbar";
import ServiceList from "../components/services&Calendar/serviceList/serviceList";
import Services from "../components/services&Calendar/services";
import Footer from "../components/footer/footer";
import HeroSlider from "../components/services&Calendar/slider/slider";

const ServicesPage: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false); // Estado para forzar el renderizado después de montar
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
      <Navbar />
      <Services onReserveClick={handleReserveClick} />
      <HeroSlider />
      <div ref={serviceListRef}>
        <ServiceList />
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
