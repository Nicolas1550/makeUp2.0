"use client";
import React, { useRef } from "react";
import Navbar from "../components/navbar/navbar";
import ServiceList from "../components/services&Calendar/serviceList/serviceList";
import Services from "../components/services&Calendar/services";
import Footer from "../components/footer/footer";
import HeroSlider from "../components/services&Calendar/slider/slider";

const ServicesPage: React.FC = () => {
  const serviceListRef = useRef<HTMLDivElement | null>(null); // Crear ref

  // Función que se ejecutará al hacer clic en "Reservar Ahora"
  const handleReserveClick = () => {
    if (serviceListRef.current) {
      serviceListRef.current.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave
    }
  };

  return (
    <>
      <Navbar />
      <Services onReserveClick={handleReserveClick} /> {/* Pasar la función */}
      <HeroSlider />
      <div ref={serviceListRef}>
        {" "}
        {/* Asociar el ref a ServiceList */}
        <ServiceList />
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
