import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco suave */
  color: #6e5e4e; /* Marrón claro */
  padding: 40px 0;
  text-align: center;
  position: relative;
  width: 100%;
  bottom: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Sombras ligeras */
  border-top: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const FooterLink = styled.a`
  color: #6e5e4e; /* Marrón claro */
  margin: 0 15px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f4c2c2; /* Rosado suave en hover */
    text-decoration: underline;
  }
`;

export const FooterText = styled.p`
  margin: 20px 0;
  font-size: 0.9rem;
  color: #6e5e4e; /* Marrón claro */
`;

export const FooterIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const FooterIcon = styled.a`
  color: #6e5e4e; /* Marrón claro */
  margin: 0 10px;
  font-size: 1.5em;
  transition: color 0.3s ease;

  &:hover {
    color: #f4c2c2; /* Rosado suave en hover */
  }
`;

export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: #6e5e4e; /* Marrón claro */
`;

export const LocationText = styled.p`
  margin-left: 10px;
  font-size: 1.2rem;
  color: #f4c2c2; /* Rosado suave */
`;

export const MapContainer = styled.div`
  width: 50%;
  height: 250px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombras más ligeras */
`;
