"use client";
import React, { useEffect, useState } from 'react';
import {
  FooterContainer,
  FooterWrapper,
  FooterLinks,
  FooterLink,
  FooterText,
  FooterIconContainer,
  FooterIcon,
  LocationContainer,
  LocationText,
} from './footerStyled';
import { useAppSelector } from "@/redux/hooks";
import { selectIsAuthenticated } from "@/redux/authSelectors";
import { FaMapMarkerAlt } from "react-icons/fa"; 

const Footer: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [forceRenderKey, setForceRenderKey] = useState<number>(0);

  useEffect(() => {
    setForceRenderKey((prevKey) => prevKey + 1);
  }, [isAuthenticated]);

  return (
    <FooterContainer key={forceRenderKey}>
      <FooterWrapper>
        <FooterLinks>
          <FooterLink href="#">Inicio</FooterLink>
          <FooterLink href="#">Nosotros</FooterLink>
          <FooterLink href="#">Servicios</FooterLink>
          <FooterLink href="#">Contacto</FooterLink>
        </FooterLinks>

        <FooterIconContainer>
          <FooterIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </FooterIcon>
          <FooterIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </FooterIcon>
          <FooterIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </FooterIcon>
        </FooterIconContainer>

        {/* Sección de ubicación con icono */}
        <LocationContainer>
          <FaMapMarkerAlt size={24} color="#f4c2c2" />
          <LocationText>Av. Siempre Viva 123, Springfield</LocationText>
        </LocationContainer>

        {/* Texto del footer con el nombre y enlace a LinkedIn */}
        <FooterText>
        © {new Date().getFullYear()} <a href="https://www.linkedin.com/in/nicolas-luciuk/" target="_blank" rel="noopener noreferrer" style={{ color: '#d9b3a8', textDecoration: 'none' }}>Nicolás Luciuk</a>. Todos los derechos reservados.
        </FooterText>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
