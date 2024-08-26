"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

const ContenedorSobreNosotros = styled.div`
  background-color: #1c1c1c;
  color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContenidoSobreNosotros = styled.div`
  max-width: 1200px;
  text-align: center;
  background: rgba(28, 28, 28, 0.8);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: background 0.3s ease, border 0.3s ease;
`;

const EncabezadoSobreNosotros = styled.h1`
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const ParrafoSobreNosotros = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #f8f9fa;
`;

const Resaltado = styled.span`
  color: #ffd700;
  font-weight: bold;
`;

const SeccionEquipo = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const MiembroEquipo = styled.div`
  background: rgba(28, 28, 28, 0.9);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  width: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
`;

const FotoMiembro = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid #ffd700;
  object-fit: cover;
  display: block;
`;

const NombreMiembro = styled.h3`
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

const RolMiembro = styled.p`
  color: #f8f9fa;
  font-size: 1rem;
`;

const PaginaSobreNosotros: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <ContenedorSobreNosotros>
        <ContenidoSobreNosotros>
          <EncabezadoSobreNosotros>Sobre Nosotros</EncabezadoSobreNosotros>
          <ParrafoSobreNosotros>
            Bienvenidos a <Resaltado>Mi Empresa</Resaltado>, donde brindamos los
            mejores servicios en la industria. Nuestro equipo está comprometido
            en ofrecer soluciones de alta calidad adaptadas a sus necesidades.
          </ParrafoSobreNosotros>
          <ParrafoSobreNosotros>
            En <Resaltado>Mi Empresa</Resaltado>, nuestra misión es garantizar
            la satisfacción del cliente a través de la innovación, dedicación y
            experiencia. Nos enorgullece nuestra capacidad para enfrentar
            desafíos complejos y convertirlos en oportunidades.
          </ParrafoSobreNosotros>

          <SeccionEquipo>
            <MiembroEquipo>
              <FotoMiembro src="/1a.webp" alt="Miembro del equipo 1" />
              <NombreMiembro>John Doe</NombreMiembro>
              <RolMiembro>CEO</RolMiembro>
            </MiembroEquipo>

            <MiembroEquipo>
              <FotoMiembro src="/2a.webp" alt="Miembro del equipo 2" />
              <NombreMiembro>Jane Smith</NombreMiembro>
              <RolMiembro>CTO</RolMiembro>
            </MiembroEquipo>

            <MiembroEquipo>
              <FotoMiembro src="/3a.webp" alt="Miembro del equipo 3" />
              <NombreMiembro>Sam Wilson</NombreMiembro>
              <RolMiembro>Desarrollador Principal</RolMiembro>
            </MiembroEquipo>
          </SeccionEquipo>
        </ContenidoSobreNosotros>
      </ContenedorSobreNosotros>
      <Footer />
    </>
  );
};

export default PaginaSobreNosotros;
