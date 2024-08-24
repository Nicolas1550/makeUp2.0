// components/Footer.tsx
import React from 'react';
import {
  FooterContainer,
  FooterWrapper,
  FooterLinks,
  FooterLink,
  FooterText,
  FooterIconContainer,
  FooterIcon
} from './footerStyled';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
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
        <FooterText>© {new Date().getFullYear()} Sofia Luciuk. Todos los derechos reservados.</FooterText>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
