"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/header/header";
import { GlobalStyle } from "./globalStyle/globalStyle";
import Information from "./components/sectionInformationCarrousel/information/information";
import AuthModal from "./components/authModel/authModel";
import Carousel3D from "./components/carousel/carousel3D";

function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; 
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Carousel3D/>
      <Information />
      <AuthModal />
    </>
  );
}

export default Home;
