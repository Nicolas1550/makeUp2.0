import styled, { keyframes } from "styled-components";

// Animación de fade-in para consistencia con la estética del navbar
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Modal = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Fondo oscuro similar al navbar */
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out; /* Animación suave */
`;

export const ModalContent = styled.div<{ $show: boolean }>`
  background: rgba(255, 255, 255, 0.8); /* Fondo suave en blanco */
  color: #6e5e4e; /* Marrón claro para el texto, en armonía con el navbar */
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro, similar al navbar */
  backdrop-filter: blur(8px); /* Suavizado del fondo */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombras suaves */
  transform: ${({ $show }) => ($show ? "translateY(0)" : "translateY(-100vh)")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6e5e4e; /* Marrón claro */
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f4c2c2; /* Rosado suave del navbar */
  }
`;

export const Field = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  position: absolute;
  left: 1rem;
  top: 1.25rem;
  color: #9ca3af;
  transition: all 0.3s ease;
  pointer-events: none;

  &.focus,
  &:focus,
  &.filled {
    top: -0.75rem;
    left: 1rem;
    font-size: 0.75rem;
    color: #f4c2c2; /* Rosado suave */
    background: rgba(255, 255, 255, 0.8); /* Fondo blanco suave */
    padding: 0 0.25rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.25rem 0.75rem 0.75rem 0.75rem;
  background: rgba(255, 255, 255, 0.9); /* Fondo claro */
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #6e5e4e; /* Marrón claro */
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f4c2c2; /* Borde rosado suave */
  }

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: -0.75rem;
    left: 1rem;
    font-size: 0.75rem;
    color: #f4c2c2;
    background: rgba(255, 255, 255, 0.9); /* Fondo claro */
    padding: 0 0.25rem;
  }
`;

export const ForgotPasswordLink = styled.a`
  color: #fc2c2; /* Rosado suave */
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  transition: color 0.3s ease;
  position: absolute;
  right: 10px;
  bottom: 0;
  padding: 10px;

  &:hover {
    color: #999; /* Gris oscuro */
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #f4c2c2; /* Rosado suave */
  color: #1c1c1c; /* Texto oscuro */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #f08080; /* Hover rosa más oscuro */
    color: #fff; /* Texto blanco en hover */
  }
`;

export const Error = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;
