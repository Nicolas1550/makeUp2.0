import React from "react";
import styled from "@emotion/styled";
import {
  ProductDetailsContainer,
  ProductFlowContainer,
} from "./PreviewProductsStyle";
import { ProductImage as StyledProductImage } from "./PreviewProductsStyle";
import { Product } from "@/redux/features/product/productSlice";

type ProductFlowProps = {
  products: Product[];
};

const AnimatedProductDetailsContainer = styled(ProductDetailsContainer)`
  animation: slide-left 30s linear infinite;

  @keyframes slide-left {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const ProductFlow: React.FC<ProductFlowProps> = ({ products }) => {
  const loopedProducts = [...products, ...products]; // Duplicamos productos para un flujo continuo

  return (
    <ProductFlowContainer>
      {loopedProducts.map((product, index) => (
        <AnimatedProductDetailsContainer key={`product-${index}`}>
          <StyledProductImage
            src={
              product.imageFileName // Usa imageFileName como propiedad de imagen
                ? `http://localhost:3001/uploads/images/${product.imageFileName}`
                : "/path/to/default/image.png"
            }
            alt={product.name}
            width={140}
            height={100}
          />
          <h4>{product.name}</h4>
          <p>{product.description}</p>
        </AnimatedProductDetailsContainer>
      ))}
    </ProductFlowContainer>
  );
};

export default React.memo(ProductFlow);
