import styled from "styled-components";

export const ProductDetailsContainer = styled.div`
  background: linear-gradient(135deg, #0f0f0f, #1c1c1c);
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-attachment: fixed;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background-color: rgba(28, 28, 28, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 4rem;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 60px rgba(0, 0, 0, 0.9);
  }
`;

export const ProductImageContainer = styled.div`
  flex: 1;
  max-width: 400px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

export const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
`;

export const ProductName = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: #ffdf6c;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const ProductPrice = styled.p`
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffb400;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
`;

export const ProductDescription = styled.p`
  font-size: 1.3rem;
  color: #cccccc;
  line-height: 1.8;
  text-align: justify;
`;

export const BuyButton = styled.button`
  padding: 1rem 2.5rem;
  background-color: #ffdf6c;
  color: #121212;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(255, 223, 108, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(255, 223, 108, 0.5);
  }
`;

export const SubSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background-color: rgba(31, 31, 31, 0.95);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  text-align: center;
`;

export const SubSectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #ffdf6c;
  margin-bottom: 1.5rem;
`;

export const SubSectionContent = styled.p`
  font-size: 1.3rem;
  color: #dddddd;
  line-height: 1.7;
`;