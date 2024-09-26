"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  selectAllProducts,
  getProductStatus,
  getProductError,
} from "@/redux/features/product/productSlice";
import ProductCarousel from "../components/ecommerce/productCarousel";
import ProductCard from "../components/ecommerce/productCard";
import {
  BannerButton,
  BannerContainer,
  BannerTitle,
  CustomerName,
  HighlightedSection,
  LoadingSpinner,
  PageContainer,
  ProductGridContainer,
  ProductList,
  SectionTitle,
  SpinnerContainer,
  Testimonial,
  TestimonialSection,
} from "../components/ecommerce/styles/ecommerceStyles";
import Sidebar from "../components/ecommerce/Sidebar";
import {
  selectSearchTerm,
  selectPriceRange,
  selectSelectedCategory,
  selectSelectedColor,
  selectSelectedMarca,
} from "@/redux/features/productsFilterSlice/FilterSlice";

const EcommercePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const productStatus = useAppSelector(getProductStatus);
  const productError = useAppSelector(getProductError);

  // Obtener el estado de los filtros
  const searchTerm = useAppSelector(selectSearchTerm);
  const priceRange = useAppSelector(selectPriceRange);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const selectedColor = useAppSelector(selectSelectedColor);
  const selectedMarca = useAppSelector(selectSelectedMarca);

  const [visibleProducts, setVisibleProducts] = useState<number>(6);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState(false); // Estado para verificar el montaje

  const carouselRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  // Verificar que el componente está completamente montado
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleExploreClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadMoreProducts = useCallback(() => {
    if (!loadingMore && visibleProducts < products.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleProducts((prev) => prev + 6);
        setLoadingMore(false);
      }, 1000);
    }
  }, [loadingMore, products.length, visibleProducts]);

  useEffect(() => {
    const currentLoader = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreProducts]);

  // Si el componente aún no se ha montado, no renderiza nada
  if (!hasMounted) {
    return null;
  }

  // Filtrar los productos en función de los filtros seleccionados
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;

    const matchesColor =
      !selectedColor || // Manejar el caso cuando selectedColor es null
      product.color.toLowerCase() === selectedColor.toLowerCase();

    const matchesMarca =
      !selectedMarca || // Manejar el caso cuando selectedMarca es null
      product.brand.toLowerCase() === selectedMarca.toLowerCase();

    return (
      matchesSearchTerm &&
      matchesPriceRange &&
      matchesCategory &&
      matchesColor &&
      matchesMarca
    );
  });

  return (
    <>
      <PageContainer>
        {/* Banner de Bienvenida */}
        <BannerContainer>
          <BannerTitle>¡Descubre nuestras ofertas exclusivas!</BannerTitle>
          <BannerButton onClick={handleExploreClick}>
            Explorar Tienda
          </BannerButton>
        </BannerContainer>

        {/* Sección de Ofertas Destacadas */}
        <HighlightedSection ref={carouselRef}>
          <SectionTitle>Ofertas Destacadas</SectionTitle>
          {productStatus === "loading" ? (
            <SpinnerContainer>
              <LoadingSpinner />
            </SpinnerContainer>
          ) : (
            productStatus === "succeeded" && products.length > 0 && (
              <ProductCarousel
                products={products.map((product) => ({
                  ...product,
                  isFeatured: product.isFeatured ?? false, // Asegura que isFeatured esté definido
                }))}
              />
            )
          )}
        </HighlightedSection>

        {/* Contenedor de Productos con Sidebar */}
        <Sidebar />
        <ProductGridContainer>
          <SectionTitle>Productos de la Tienda</SectionTitle>
          {productStatus === "loading" && (
            <SpinnerContainer>
              <LoadingSpinner />
            </SpinnerContainer>
          )}
          {productError && <p>Error: {productError}</p>}
          <ProductList>
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageFileName={product.imageFileName}
                quantity={product.quantity}
                description={
                  product.description || "Sin descripción disponible"
                }
                brand={product.brand || "Marca no disponible"}
                color={product.color || "Color no disponible"}
              />
            ))}
          </ProductList>
        </ProductGridContainer>

        {/* Loader para el infinite scroll */}
        <div ref={loaderRef} style={{ textAlign: "center", margin: "2rem 0" }}>
          {loadingMore && (
            <SpinnerContainer>
              <LoadingSpinner />
            </SpinnerContainer>
          )}
        </div>

        {/* Sección de Testimonios */}
        <TestimonialSection>
          <SectionTitle>Lo que dicen nuestros clientes</SectionTitle>
          <Testimonial>
            &quot;Excelente calidad y atención al cliente, sin duda volveré a comprar.&quot;
          </Testimonial>
          <CustomerName>— Juan Pérez</CustomerName>
        </TestimonialSection>
      </PageContainer>
    </>
  );
};

export default EcommercePage;
