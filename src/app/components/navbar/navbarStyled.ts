import styled, { keyframes } from "styled-components";

export const Nav = styled.nav`
  background-color: transparent;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
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
  backdrop-filter: blur(8px);
  padding: 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7); /* Fondo blanco suave */
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  transition: background 0.3s ease, border 0.3s ease;
  z-index: 20;

  @media (max-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Logo = styled.a`
  color: #d9b3a8; /* Beige suave rosado */
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
    background: #d9b3a8; /* Subrayado en rosa suave */
    margin-bottom: 5px;
  }

  animation: glow 1.5s infinite alternate;

  @keyframes glow {
    from {
      text-shadow: 0 0 10px #d9b3a8, 0 0 20px #d9b3a8;
    }
    to {
      text-shadow: 0 0 20px #d9b3a8, 0 0 30px #d9b3a8;
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
  justify-content: center;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const NavLink = styled.div`
  color: #6e5e4e; /* Marrón claro */
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: #f4c2c2; /* Rosado suave */
    transform: translateY(-5px);
    text-shadow: 0 0 5px #f4c2c2, 0 0 10px #f4c2c2; /* Glow rosado */
  }

  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

export const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  color: #f4c2c2; /* Rosado suave */
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
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco claro */
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
  align-items: center;
  gap: 1rem;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const AuthButton = styled.a`
  background-color: #f4c2c2; /* Rosado suave */
  color: #fff; /* Texto blanco */
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #f08080; /* Hover en rosa más oscuro */
    color: #fff;
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
  border: 4px solid rgba(255, 182, 193, 0.3); /* Rosado claro */
  border-top: 4px solid #f08080; /* Rosado más oscuro */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

export const DropdownButton = styled.button`
  background-color: #f4c2c2; /* Rosado suave */
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f08080; /* Hover rosa más oscuro */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  background-color: #fff; /* Fondo blanco */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombras más suaves */
  overflow: hidden;
  z-index: 10;
  min-width: 160px;
`;

export const DropdownItem = styled.button`
  background-color: transparent;
  color: #6e5e4e; /* Marrón claro */
  padding: 0.8rem 1.2rem;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffe4e1; /* Fondo rosado claro en hover */
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

export const DropdownButtonContainer = styled.div`
  position: relative;
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
    color: #6e5e4e; /* Marrón claro */
  }
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background-color: #fff; /* Fondo blanco */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
  min-width: 160px;
`;

export const ProfileDropdownItem = styled.button`
  background-color: transparent;
  color: #6e5e4e; /* Marrón claro */
  padding: 0.8rem 1.2rem;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffe4e1; /* Fondo rosado claro */
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;
