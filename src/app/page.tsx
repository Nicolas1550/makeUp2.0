"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts, selectAllProducts } from "@/redux/features/product/productSlice"; // Ajusta el path a tu slice de productos
import Header from "./components/header/header";
import { GlobalStyle } from "./globalStyle/globalStyle";
import Information from "./components/sectionInformationCarrousel/information/information";
import AuthModal from "./components/authModel/authModel";
import AcercaDe from "./components/carousel/carousel3D";
import PreviewProduct from "./components/previewFlowProducts/PreviewProduct";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CoursesSection from "./components/courses/coursesSection";

function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const dispatch = useAppDispatch();

  // Selecciona la lista de productos desde el estado global (Redux)
  const productList = useAppSelector(selectAllProducts); 

  // Estado local para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    dispatch(fetchProducts()); // Despacha la acción para obtener los productos
  }, [dispatch]);

  if (!hasMounted) {
    return null;
  }

  // Función para manejar el clic en un producto (muestra un modal por ejemplo)
  const handleProductClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <AcercaDe />
      <CoursesSection/>
      <Information />
      <AuthModal />
      <PreviewProduct
        onProductClick={handleProductClick}
        productList={productList}
        isModalOpen={isModalOpen}
      />
    </>
  );
}

export default Home;

