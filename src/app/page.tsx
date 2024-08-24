"use client";
import React, { useEffect, useState } from "react";

import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import { GlobalStyle } from "./globalStyle/globalStyle";
import Information from "./components/sectionInformationCarrousel/information/information";
import Footer from "./components/footer/footer";
import AuthModal from "./components/authModel/authModel";

function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  // Este hook asegura que el componente se renderice completamente en el cliente.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Mientras no se haya montado, no renderizará el contenido, evitando problemas de estilos y renderización.
  if (!hasMounted) {
    return null; // Esto evita el renderizado hasta que se confirme que el componente está montado
  }

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Header />
      <Information />
      <Footer />
      <AuthModal />
    </>
  );
}

export default Home;
