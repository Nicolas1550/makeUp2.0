import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";

import {
  PreviewContainer,
  ProductFlowWrapper,
  ProductSlide,
  Title,
  ViewAllButton,
} from "./PreviewProductsStyle";
import { Product } from "@/redux/features/product/productSlice";
import ProductFlow from "./ProductFlow";

type ProductPreviewProps = {
  onProductClick: () => void;
  productList: Product[];
  isModalOpen: boolean;
};

const ProductPreview: React.FC<ProductPreviewProps> = ({ productList }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const imageBackgrounds = [
    "/previewProducts/12.webp",
    "/previewProducts/22.webp",
    "/previewProducts/23.webp",
    "/previewProducts/34.webp",
  ];

  return (
    <PreviewContainer>
      <Title>Descubre nuestros productos destacados</Title>{" "}
      {/* Título añadido para dar contexto */}
      <Slider {...settings}>
        {imageBackgrounds.map((imageUrl, index) => (
          <ProductSlide key={index}>
            <Image
              src={imageUrl}
              alt="Product Image"
              width={1500}
              height={500}
              quality={100} 
              priority
            />
          </ProductSlide>
        ))}
      </Slider>
      <ProductFlowWrapper>
        <ProductFlow products={productList} />
      </ProductFlowWrapper>
      <Link href="/tienda">
        <ViewAllButton>
          Ver todos los productos
        </ViewAllButton>
      </Link>
    </PreviewContainer>
  );
};

export default ProductPreview;
