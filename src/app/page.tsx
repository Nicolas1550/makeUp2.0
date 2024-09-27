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

  const productList = useAppSelector(selectAllProducts); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    dispatch(fetchProducts()); 
  }, [dispatch]);

  if (!hasMounted) {
    return null;
  }

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

