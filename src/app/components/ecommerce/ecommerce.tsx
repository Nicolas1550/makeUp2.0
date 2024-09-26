// components/ProductCard.tsx
"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

const CardContainer = styled.li`
  background: #1f1f1f;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  list-style: none;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffd700;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageFileName?: string;
  quantity: number;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageFileName,
  description,
}) => {
  return (
    <Link href={`/product/${id}`} passHref>
      <CardContainer>
        <ProductImage
          src={`https://makeupbackend2-0.onrender.com/uploads/images/${imageFileName}`}
          alt={name}
        />
        <ProductName>{name}</ProductName>
        <ProductPrice>Precio: ${price}</ProductPrice>
        <p>{description || "Sin descripción disponible"}</p>
      </CardContainer>
    </Link>
  );
};

export default ProductCard;
