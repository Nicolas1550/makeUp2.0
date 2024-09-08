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

  return (
    <>
      <ProductDetailsContainer>
        <ProductWrapper>
          <ProductImageContainer>
            <ProductImage
              src={`https://backendiaecommerce.onrender.com/uploads/images/${product.imageFileName}`}
              alt={product.name}
            />
          </ProductImageContainer>
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>Precio: ${product.price}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
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
