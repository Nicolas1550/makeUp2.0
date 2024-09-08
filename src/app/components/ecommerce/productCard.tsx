"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";

const CardContainer = styled.li`
  background: #2b2b2b;
  padding: 1.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  list-style: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    border-radius: 10px;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #e63946;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.4), 
              inset 0 -4px 8px rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }
`;

const ProductName = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #eaeaea;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProductPrice = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffd700;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const OldPrice = styled.span`
  font-size: 1.1rem;
  color: #b0b0b0;
  text-decoration: line-through;
  margin-right: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #cccccc;
  line-height: 1.4;
  text-align: center;
  margin-top: 0.8rem;
  margin-bottom: 1.2rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-top: 0.6rem;
    margin-bottom: 1rem;
  }
`;

const AddToCartButton = styled.button`
  background: linear-gradient(145deg, #ffd700, #ffc107);
  color: #1c1c1c;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #ffc107, #ffd700);
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  imageFileName?: string;
  quantity: number;
  description: string;
  discount?: number;
  createdAt?: string;  
  updatedAt?: string;  
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  imageFileName,
  quantity,
  description,
  discount,
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString(),
}) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      imageFileName,
      quantity,
      description,
      createdAt,
      updatedAt,
    };
    dispatch(addToCart(product));
  };

  return (
    <CardContainer>
      {discount && <DiscountBadge>{discount}% OFF</DiscountBadge>}
      <Link href={`/products/${id}`} passHref>
        <div>
          <ImageContainer>
            <ProductImage
              src={`https://backendiaecommerce.onrender.com/uploads/images/${imageFileName}`}
              alt={name}
            />
          </ImageContainer>
          <ProductName>{name}</ProductName>
          <ProductPrice>
            {oldPrice && <OldPrice>${oldPrice}</OldPrice>}
            ${price}
          </ProductPrice>
          <ProductDescription>{description.slice(0, 60)}...</ProductDescription>
        </div>
      </Link>
      <AddToCartButton onClick={handleAddToCart}>
        Agregar al carrito
      </AddToCartButton>
    </CardContainer>
  );
};

export default ProductCard;
