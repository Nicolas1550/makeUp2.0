import styled from "styled-components";

export const ServiceDetailsContainer = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

export const ServiceImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 2rem;
`;

export const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ServiceName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const ServiceDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

export const ServicePrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

export const ReserveButton = styled.button`
  padding: 1rem 2rem;
  background-color: #ffd700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5c200;
  }
`;
