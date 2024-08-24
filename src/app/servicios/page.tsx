"use client";
import React, { useRef } from "react";
import Navbar from "../components/navbar/navbar";
import ServiceList from "../components/services&Calendar/serviceList/serviceList";
import Services from "../components/services&Calendar/services";
import Footer from "../components/footer/footer";
import HeroSlider from "../components/services&Calendar/slider/slider";

const ServicesPage: React.FC = () => {
  const serviceListRef = useRef<HTMLDivElement | null>(null); 

  // Función que se ejecutará al hacer clic en "Reservar Ahora"
  const handleReserveClick = () => {
    if (serviceListRef.current) {
      serviceListRef.current.scrollIntoView({ behavior: "smooth" }); 
    }
  };

  return (
    <>
      <Navbar />
      <Services onReserveClick={handleReserveClick} /> 
      <HeroSlider />
      <div ref={serviceListRef}>
        {" "}
        <ServiceList />
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
