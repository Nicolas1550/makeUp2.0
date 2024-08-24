import React, { useState, useRef, useEffect } from "react";
import ParticlesBg from "particles-bg"; // Importar la librería de partículas
import {
  HeaderContainer,
  HeaderContent,
  HeaderText,
  Button,
  ArrowIcon,
  PaginationContainer,
  PaginationDot,
} from "./headerStyled";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

const images = ["/image1.webp", "/image2.webp", "/image3.webp"];

const Header: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 1000);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HeaderContainer
      ref={headerRef}
      $isMobile={isMobile}
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Partículas de fondo */}
      <ParticlesBg type="cobweb" bg={true} />

      <HeaderContent>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <HeaderText>Bienvenidos a Salon Unisex</HeaderText>
          <Link href={"/servicios"}>
            <Button whileHover={{ scale: 1.1 }}>Reserva Ahora</Button>
          </Link>
        </motion.div>
      </HeaderContent>
      <ArrowIcon onClick={nextImage}>
        <ArrowForwardIosIcon style={{ fontSize: "2rem", color: "#ffd700" }} />
      </ArrowIcon>
      <PaginationContainer>
        {images.map((_, index) => (
          <PaginationDot
            key={index}
            $isActive={currentImage === index}
            onClick={() => selectImage(index)}
          />
        ))}
      </PaginationContainer>
    </HeaderContainer>
  );
};

export default Header;
