"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
const ColorCircles = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem auto;

  div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ color }) =>
      /^#[0-9A-F]{6}$/i.test(color) || /^[a-z]+$/i.test(color)
        ? color
        : "#ccc"}; /* Validar si es un color válido, sino usar color predeterminado */
    border: 2px solid white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:nth-child(1) {
      z-index: 3;
    }

    &:nth-child(2) {
      margin-left: -10px;
      z-index: 2;
    }

    &:nth-child(3) {
      margin-left: -10px;
      z-index: 1;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`;

// Estilos
// Estilo del overlay para "Sin stock"
const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Blanco transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  pointer-events: none; /* Para que no interfiera con el click en la tarjeta */
`;

const OutOfStockText = styled.span`
  color: red;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  transform: rotate(-20deg); /* Texto en diagonal */
`;

const CardContainer = styled.li`
  background: linear-gradient(to bottom, #ffffff, #fff0e1);
  padding: 1.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  list-style: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  position: relative; /* Importante para el overlay */

  &:hover {
    transform: translateY(-10px) rotate(-2deg);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    filter: brightness(1.05);
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

const ProductBrand = styled.p`
  font-size: 1rem;
  font-weight: bold; /* Marca en negrita */
  color: #222;
  margin-top: 0.5rem;
  text-transform: capitalize;
  text-align: center;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.1);
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const ProductName = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #222;

  &:hover {
    color: #e63946;
  }

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
  color: #666;
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
  background: linear-gradient(
    145deg,
    #ffa6c1,
    #ff59b4
  ); // Colores de gradiente fijos
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.4s ease-in-out, background 0.6s ease-in-out,
    transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;

  &:before {
    content: "🛍";
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2em;
  }

  &:hover {
    background: linear-gradient(
      145deg,
      #ff59b4,
      #ffa6c1
    ); // Gradiente invertido en hover
    transform: translateY(-10px) scale(1.05) rotate(2deg); // Animación de hover
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 24px; // Ajustar tamaño en pantallas más pequeñas
    font-size: 0.9em;

    &:hover {
      transform: none; // Sin transformación en pantallas pequeñas
    }
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
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 -2px 4px rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

// Componente del ProductCard
interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  imageFileName?: string;
  quantity: number;
  description: string;
  discount?: number;
  brand?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}
const colorMapping: Record<string, string> = {
  Blanco: "#FFFFFF", // Blanco -> White
  Negro: "#000000", // Negro -> Black
  Nude: "#F5CBB0", // Nude -> Beige-like color
  Rojo: "#FF0000", // Rojo -> Red
  Rosa: "#FFC0CB", // Rosa -> Pink
  Azul: "#0000FF", // Azul -> Blue
  Marron: "#8B4513", // Marron -> Brown
  "": "#D3D3D3", // Default color for empty selection
};
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  imageFileName,
  quantity,
  description,
  discount,
  brand = "Marca no disponible",
  color = "Color no disponible",
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
      brand,
      color,
      createdAt,
      updatedAt,
    };
    dispatch(addToCart(product));
  };

  // Log para verificar si el color es recibido correctamente
  console.log(`Producto: ${name}, Color: ${color}`);

  // Usar el color mapeado
  const mappedColor = colorMapping[color] || "#D3D3D3"; // Color por defecto si no se encuentra

  return (
    <CardContainer>
      {/* Mostrar el overlay si no hay stock */}
      {quantity === 0 && (
        <OutOfStockOverlay>
          <OutOfStockText>Sin stock</OutOfStockText>
        </OutOfStockOverlay>
      )}

      {discount && <DiscountBadge>{discount}% OFF</DiscountBadge>}
      <Link href={`/products/${id}`} passHref>
        <div>
          <ImageContainer>
            <ProductImage
              src={`https://makeupbackend2-0.onrender.com/uploads/images/${imageFileName}`}
              alt={name}
            />
          </ImageContainer>
          <ProductName>{name}</ProductName>
          <ProductPrice>
            {oldPrice && <OldPrice>${oldPrice}</OldPrice>}${price}
          </ProductPrice>
          <ProductDescription>{description.slice(0, 60)}...</ProductDescription>

          {/* Mostrar Marca en negrita */}
          <ProductBrand>{brand}</ProductBrand>

          {/* ColorCircles con el color mapeado */}
          {color && color !== "Color no disponible" && (
            <ColorCircles color={mappedColor}>
              <div />
              <div />
              <div />
            </ColorCircles>
          )}
        </div>
      </Link>
      <AddToCartButton onClick={handleAddToCart} disabled={quantity === 0}>
        Agregar al carrito
      </AddToCartButton>
    </CardContainer>
  );
};
export default ProductCard;
