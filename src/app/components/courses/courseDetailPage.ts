import styled, { keyframes } from "styled-components";

// Animación de fade-in suave para las secciones
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

export const CourseDetailContainer = styled.div`
  padding: 5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  background: linear-gradient(145deg, #f9eae3, #f4e5d8);

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

export const CourseTitle = styled.h1`
  font-size: 4.2rem;
  font-weight: bold;
  color: #d9735a;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.8s ease-out;
  background: linear-gradient(90deg, #ff9a8b, #ff6f61, #ff3c41);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const CourseDescription = styled.p`
  font-size: 1.9rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 3.5rem;
  text-align: center;
  max-width: 950px;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease-out;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.5rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CourseInfo = styled.div`
  width: 50%;
  background-color: #fff6f1;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DetailSection = styled.div`
  margin: 1rem 0;
  font-size: 1.6rem;
  line-height: 1.7;
  color: #333;

  strong {
    color: #ff6f61;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const ClassesWrapper = styled.div`
  width: 50%;
  max-height: 800px;
  overflow-y: auto;
  background-color: #fffaf7;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    width: 100%;
  }

  h2 {
    font-size: 2.7rem;
    color: #ff6f61;
    text-shadow: 0px 3px 6px rgba(255, 111, 97, 0.4);
    border-bottom: 2px solid #ff6f61;
    padding-bottom: 1rem;
    margin-bottom: 2.5rem;
    text-align: center;
    text-transform: uppercase;

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
`;

export const ClassItem = styled.li`
  color: #333;
  margin: 2.5rem 0;
  padding: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 2rem;
    color: #d9735a;
    margin-bottom: 1.2rem;

    @media (max-width: 480px) {
      font-size: 1.6rem;
    }
  }

  p {
    margin-bottom: 1.4rem;
    color: #666;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

export const VideoLink = styled.a`
  display: inline-block;
  margin-top: 0.8rem;
  color: #1d4ed8;
  text-decoration: underline;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #2563eb;
  }
`;

export const AdditionalMaterial = styled.p`
  margin-top: 0.8rem;
  font-style: italic;
  color: #6b7280;
`;

export const BuyButton = styled.a`
  display: inline-block;
  text-align: center;
  margin: 2rem auto;
  background-color: #ff6f61;
  color: #fff;
  padding: 1.8rem 5rem;
  border-radius: 50px;
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 5px 30px rgba(255, 111, 97, 0.7);
  animation: ${fadeIn} 1.2s ease-out;

  &:hover {
    background-color: #ff3c41;
    transform: translateY(-5px);
    box-shadow: 0 10px 35px rgba(255, 111, 97, 0.7);
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    padding: 1.2rem 3rem;
  }
`;

export const Divider = styled.hr`
  margin: 3.5rem 0;
  border: none;
  border-top: 2px solid #ff6f61;
  width: 100%;
  max-width: 850px;
  margin: 3.5rem auto;
  opacity: 0.5;
`;

export const FechaItem = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const EditButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e68900;
  }
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const ClassesSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ViewMoreButton = styled.button`
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 1rem auto;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e68900;
  }
`;

// Estilos para los inputs de fecha
export const DateInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  width: 100%;
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ff6f61;
    outline: none;
  }
`;

// Estilos para los inputs de hora
export const TimeInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  width: 100%;
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #ff6f61;
    outline: none;
  }
`;

export const FechaTexto = styled.p`
  margin: 0.5rem 0;
  font-size: 1.4rem;
  color: #333;

  strong {
    color: #ff6f61;
  }
`;
