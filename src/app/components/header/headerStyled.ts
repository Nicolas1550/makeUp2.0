import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const HeaderContainer = styled.header<{ $isMobile: boolean }>`
  width: 100%;
  height: 70vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #000; /* Fondo oscuro */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* Capa de oscuridad semitransparente */
    z-index: 1;
  }

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      justify-content: center;
      align-items: center;
      height: auto;
    `}

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const HeaderContent = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #f5f5dc; /* Beige claro */
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const HeaderText = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f5f5dc; /* Color beige claro */
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.9); /* Sombra más oscura para mejor contraste */

  @media (max-width: 500px) {
    font-size: 2.5rem;
    margin-top: 30px;
    margin-bottom: 0px;
  }

  @media (max-width: 320px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

export const Button = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  background: linear-gradient(45deg, #ff6f61, #ff4f81); /* Gradiente rosado/fucsia */
  border: none;
  border-radius: 5px;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #ff3b6e; /* Rosado oscuro/fucsia al pasar el mouse */
    transform: scale(1.05);
  }

  @media (max-width: 320px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
`;

export const TopCanvasContainer = styled.div`
  width: 100%;
  height: 20vh;
  position: relative;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const BottomCanvasContainer = styled.div`
  width: 100%;
  height: 20vh;
  position: relative;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const ArrowIcon = styled.div`
  position: absolute;
  right: 5vh;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5); /* Fondo negro semitransparente */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    right: 2vh;
  }
`;

export const PaginationContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

export const PaginationDot = styled.div<{ $isActive: boolean }>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "#ff6f61" : "#ffe4e1")}; /* Fucsia activo */
  cursor: pointer;
`;
