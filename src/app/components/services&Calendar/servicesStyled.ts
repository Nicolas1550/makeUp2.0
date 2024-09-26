import styled from "styled-components";
import { motion } from "framer-motion";

export const ReservationContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60vh;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  color: #6e5e4e; /* Marrón claro */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageSection = styled(motion.div)`
  flex: 1;
  background: url("/zzzzz .webp") center center/cover no-repeat;
  border-right: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  position: relative;
  transition: height 0.3s ease, opacity 0.3s ease;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
    height: 60vh;
    opacity: 0.7;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    opacity: 0.8;
    z-index: -1;
    transition: opacity 0.3s ease;

    @media (max-width: 768px) {
      opacity: 0.3;
    }
  }
`;

export const TextSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3rem;
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  border-left: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
    height: auto;
  }
`;

export const Title = styled.h1`
  color: #d9b3a8; /* Beige suave rosado */
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #d9b3a8, 0 0 20px #d9b3a8;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.8;
  color: #6e5e4e; /* Marrón claro */
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const ReserveButton = styled(motion.button)`
  background-color: #f4c2c2; /* Rosado suave */
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
  font-size: 1.2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #1c1c1c;
    color: #f4c2c2; /* Hover rosado suave */
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;
