import styled, { keyframes } from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1c1c1c;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);  /* Sombras más suaves */
  border-radius: 12px;
  margin: 0 auto;
  max-width: 400px;
`;

export const FormTitle = styled.h2`
  color: #ffd700;
  font-size: 2.2rem;  /* Un poco más grande */
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const FormField = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;

  label {
    display: block;
    color: #f8f9fa;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 2px solid #ffd700;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s ease, transform 0.2s ease;  /* Agregamos una transición */

  &:focus {
    outline: none;
    border-color: #e5c200;
    transform: scale(1.02);  /* Pequeña animación en el focus */
  }
`;

// Contenedor para la contraseña y el botón de visibilidad
export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const ToggleVisibilityButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #ffd700;
  color: #1c1c1c;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #e5c200;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

export const SuccessMessage = styled.p`
  color: #28a745;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  display: inline-block;
`;
