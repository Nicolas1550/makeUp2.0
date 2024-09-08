"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  selectAllProducts,
} from "@/redux/features/product/productSlice";
import {
  addToCart,
} from "@/redux/features/cart/cartSlice"; 
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

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const product = products.find((p) => p.id === Number(productId));

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

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
              src={`http://localhost:3001/uploads/images/${product.imageFileName}`}
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
