"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  selectAllProducts,
} from "@/redux/features/product/productSlice";
import {
  addToCart,
} from "@/redux/features/cart/cartSlice"; 
import styled from "styled-components";

import {
  BuyButton,
  ProductDescription,
  ProductDetailsContainer,
  ProductImage,
  ProductImageContainer,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductWrapper,
  SubSection,
  SubSectionContent,
  SubSectionTitle,
} from "@/app/components/ecommerce/styles/productPageStyle";

// Spinner centrado y estilizado
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la altura de la ventana */
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #fbc02d; /* Color amarillo */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Mapeo de colores para los circulitos
const colorMapping: Record<string, string> = {
  Blanco: "#FFFFFF",
  Negro: "#000000",
  Nude: "#F5CBB0",
  Rojo: "#FF0000",
  Rosa: "#FFC0CB",
  Azul: "#0000FF",
  Marron: "#8B4513",
  "": "#D3D3D3", // Color predeterminado
};

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

const ProductBrand = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #555;
  margin-top: 1rem;
  text-align: center;
`;

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()).finally(() => setIsLoading(false)); // Detener el spinner al cargar productos
    } else {
      setIsLoading(false);
    }
  }, [dispatch, products.length]);

  const product = products.find((p) => p.id === Number(productId));

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  // Mostrar spinner mientras se cargan los productos
  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner /> {/* Spinner amarillo */}
      </SpinnerContainer>
    );
  }

  if (!product) {
    return (
      <ProductDetailsContainer>
        <p>Producto no encontrado</p>
      </ProductDetailsContainer>
    );
  }

  // Mapear el color del producto al valor visual
  const mappedColor = colorMapping[product.color] || "#D3D3D3"; // Color por defecto si no se encuentra

  return (
    <>
      <ProductDetailsContainer>
        <ProductWrapper>
          <ProductImageContainer>
            <ProductImage
              src={`https://makeupbackend2-0.onrender.com/uploads/images/${product.imageFileName}`}
              alt={product.name}
            />
          </ProductImageContainer>
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>Precio: ${product.price}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>

            {/* Mostrar Marca */}
            <ProductBrand>Marca: {product.brand || "Marca no disponible"}</ProductBrand>

            {/* Mostrar los circulitos de color */}
            {product.color && (
              <ColorCircles color={mappedColor}>
                <div />
                <div />
                <div />
              </ColorCircles>
            )}

            <BuyButton onClick={handleAddToCart}>Agregar al carrito</BuyButton>
          </ProductInfo>
        </ProductWrapper>
        <SubSection>
          <SubSectionContent>
            <SubSectionTitle>Información Adicional</SubSectionTitle>
            <p>
              Este producto cuenta con las siguientes opciones de pago y envío:
            </p>
            <ul>
              <li>
                <strong>Medios de pago:</strong> Puedes realizar tu compra a
                través de
                <strong> Mercado Pago</strong> o mediante depósito bancario.
              </li>
              <li>
                <strong>Opciones de envío:</strong> Ofrecemos envíos a todo el
                país con tarifas competitivas. Además, puedes optar por el
                retiro en tienda sin costo adicional.
              </li>
              <li>
                <strong>Retiro en tienda:</strong> Si prefieres, puedes retirar
                tu compra directamente en nuestro local en un plazo de 24 horas
                después de la confirmación del pago.
              </li>
            </ul>
          </SubSectionContent>
        </SubSection>
      </ProductDetailsContainer>
    </>
  );
};

export default ProductPage;

