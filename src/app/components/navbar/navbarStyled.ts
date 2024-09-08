import styled, { keyframes } from "styled-components";

export const Nav = styled.nav`
  background-color: transparent;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 20;
  height: 100px;
`;

export const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 10px;
  background: rgba(28, 28, 28, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.3);
  transition: background 0.3s ease, border 0.3s ease;
  z-index: 20;

  @media (max-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Logo = styled.a`
  color: #ffd700;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  margin-left: 1rem;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background: #ffd700;
    margin-bottom: 5px;
  }
  animation: glow 1.5s infinite alternate;

  @keyframes glow {
    from {
      text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700,
        0 0 40px #ffd700;
    }
    to {
      text-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700, 0 0 40px #ffd700,
        0 0 50px #ffd700;
    }
  }

  @media (max-width: 1000px) {
    font-size: 1.5rem;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;  /* Alinear horizontalmente los links */

  @media (max-width: 1000px) {
    display: none;
  }
`;
export const NavLink = styled.div`
  color: #f8f9fa;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: #ffd700;
    transform: translateY(-5px);
    text-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700;
  }

  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

export const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  color: #ffd700;
  font-size: 2rem;
  padding: 0.5rem;
  z-index: 21;
  margin-right: 1rem;

  @media (max-width: 1000px) {
    display: block;
  }

  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(28, 28, 28, 0.9);
  border-radius: 10px;
  padding: 1rem;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);

  width: 90%;
  z-index: 20;

  @media (max-width: 1000px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  align-items: center; /* Alinea verticalmente los elementos dentro de AuthButtons */
  gap: 1rem;

  @media (max-width: 1000px) {
    display: none;
  }
`;


export const AuthButton = styled.a`
  background-color: #ffd700;
  color: #1c1c1c;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #1c1c1c;
    color: #ffd700;
  }

  @media (max-width: 500px) {
    padding: 0.5rem;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

export const DropdownButton = styled.button`
  background-color: #ffd700;
  color: #1c1c1c;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  position: relative;  /* Añadir posición relativa al botón */
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #e5c200;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;  /* Posicionar justo debajo del botón */
  left: 0;  /* Alinearlo con el botón */
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 10;
  min-width: 160px;  /* Tamaño adecuado para las palabras "Nosotros" y "Contacto" */
`;

export const DropdownItem = styled.button`
  background-color: transparent;
  color: #f8f9fa;
  padding: 0.8rem 1.2rem;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;



export const DropdownButtonContainer = styled.div`
  position: relative;  /* Contenedor relativo para que el menú siga al botón */
  display: inline-block;
`;

export const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  svg {
    font-size: 40px;
    color: #fff;
  }
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 110%;  /* Posicionarlo justo debajo del icono */
  right: 0;  /* Mantener el comportamiento de apertura hacia la izquierda */
  background-color: #1a1a1a;  /* Color de fondo igual que el de "Más" */
  border-radius: 8px;  /* Bordes redondeados */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);  /* Sombra consistente */
  overflow: hidden;
  z-index: 10;
  min-width: 160px;  /* Mismo tamaño que el menú de "Más" */
`;

export const ProfileDropdownItem = styled.button`
  background-color: transparent;
  color: #f8f9fa;  /* Color de texto claro */
  padding: 0.8rem 1.2rem;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;  /* Color de fondo en hover */
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;
