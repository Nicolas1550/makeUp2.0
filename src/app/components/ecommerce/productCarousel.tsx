"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import ProductCard from "./productCard";
import { CarouselContainer } from "./styles/productCarousel";

interface ProductCarouselProps {
  products: Array<{
    id: number;
    name: string;
    price: number;
    imageFileName?: string;
    quantity: number;
    description?: string;
    isFeatured: boolean;
  }>;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const featuredProducts = products.filter((product) => product.isFeatured);

  // Duplicar diapositivas si hay exactamente 3 productos para que el carrusel pueda rotar
  const duplicatedSlides =
    featuredProducts.length === 3 ? [...featuredProducts, ...featuredProducts] : featuredProducts;

  return (
    <CarouselContainer>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow]}
        spaceBetween={30}
        slidesPerView={3}  // Mostrar 3 por defecto en pantallas grandes
        slidesPerGroup={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true} 
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          320: { // Ajuste para pantallas móviles pequeñas
            slidesPerView: 1, // Mostrar solo 1 card en pantallas pequeñas
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1, // Mantener 1 card en pantallas pequeñas-medias
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2, // Mostrar 2 cards en pantallas medianas
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3, // Mostrar 3 cards en pantallas grandes
            spaceBetween: 30,
          },
        }}
      >
        {duplicatedSlides.map((product, index) => (
          <SwiperSlide key={`${product.id}-${index}`}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              imageFileName={product.imageFileName}
              quantity={product.quantity}
              description={product.description || "Sin descripción disponible"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselContainer>
  );
};

export default ProductCarousel;
