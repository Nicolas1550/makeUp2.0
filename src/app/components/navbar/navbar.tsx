"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { motion } from "framer-motion";
import {
  Nav,
  NavLinks,
  NavLink,
  Logo,
  NavContainer,
  HamburgerIcon,
  MobileMenu,
  AuthButtons,
  AuthButton,
  LoadingSpinner,
  DropdownButtonContainer,
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  ProfileIcon,
  ProfileDropdown,
  ProfileDropdownItem,
} from "./navbarStyled";
import { Modal } from "@mui/material";
import Cart from "../cart/cart";
import { useNavbarLogic } from "./navbarLogic";
import styled from "styled-components";
interface Servicio {
  id: string;
  nombre: string;
}
const AuthModal = dynamic(() => import("../authModel/authModel"), {
  ssr: false,
});
const ProductOrdersModal = dynamic(
  () => import("../productOrderModal/orderModal"),
  { ssr: false }
);
const EcommerceWithAdmin = dynamic(
  () => import("../ecommerce/ecommerceWithAdmin"),
  { ssr: false }
);

const Navbar: React.FC = () => {
  const {
    isOpen,
    toggleMenu,
    isAuthChecked,
    showButtons,
    isProductOrdersModalOpen,
    toggleProductOrdersModal,
    isAdminPanelOpen,
    toggleAdminPanel,
    isCartOpen,
    toggleCart,
    isDropdownOpen,
    toggleDropdown,
    isMoreDropdownOpen,
    toggleMoreDropdown,
    isServicesDropdownOpen,
    toggleServicesDropdown,
    closeDropdowns,
    dropdownMenuRef,
    moreDropdownRef,
    servicesDropdownRef,
    isAuthenticated,
    isLoading,
    isAdmin,
    cartItems,
    handleAuthButtonClick,
    handleLogoutClick,
    profileImageUrl,
    servicios, // Aquí se asume que servicios es de tipo Servicio[]
  } = useNavbarLogic();

  if (!isAuthChecked) return null;
  const MobileOnly = styled.div`
    @media (min-width: 769px) {
      display: none;
    }
  `;

  const DesktopOnly = styled.div`
    @media (max-width: 768px) {
      display: none;
    }
  `;
  return (
    <Nav>
      <NavContainer>
        <HamburgerIcon onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </HamburgerIcon>
        <Logo href="/">Fabiana Giménez</Logo>
        <NavLinks>
          <motion.div
            whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
          >
            <Link href="/" passHref>
              <NavLink>Inicio</NavLink>
            </Link>
          </motion.div>

          <DropdownButtonContainer ref={servicesDropdownRef}>
            <DropdownButton onClick={toggleServicesDropdown}>
              Servicios
            </DropdownButton>
            {isServicesDropdownOpen && (
              <DropdownMenu>
                <DropdownItem>
                  <Link href="/servicios" passHref>
                    <NavLink onClick={closeDropdowns}>Cualquiera</NavLink>
                  </Link>
                </DropdownItem>
                {servicios.map((servicio: Servicio) => (
                  <DropdownItem key={servicio.id}>
                    <Link href={`/servicios/${servicio.id}`} passHref>
                      <NavLink onClick={closeDropdowns}>
                        {servicio.nombre}
                      </NavLink>
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </DropdownButtonContainer>

          <motion.div
            whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
          >
            <Link href="/tienda" passHref>
              <NavLink onClick={closeDropdowns}>Tienda</NavLink>
            </Link>
          </motion.div>

          <DropdownButtonContainer ref={moreDropdownRef}>
            <DropdownButton onClick={toggleMoreDropdown}>Más</DropdownButton>
            {isMoreDropdownOpen && (
              <DropdownMenu>
                <DropdownItem>
                  <Link href="/nosotros" passHref>
                    <NavLink onClick={closeDropdowns}>Nosotros</NavLink>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href="/contacto" passHref>
                    <NavLink onClick={closeDropdowns}>Contacto</NavLink>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            )}
          </DropdownButtonContainer>
        </NavLinks>

        <AuthButtons>
          <Badge
            badgeContent={cartItems.length}
            color="secondary"
            style={{ cursor: "pointer" }}
            onClick={toggleCart}
          >
            <FaShoppingCart color="black" />
          </Badge>

          {isAdmin && (
            <motion.div
              whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
            >
              <AuthButton onClick={toggleAdminPanel}>Admin Panel</AuthButton>
            </motion.div>
          )}

          {!isLoading && showButtons ? (
            <>
              {!isAuthenticated ? (
                <AuthButton onClick={handleAuthButtonClick}>
                  Iniciar Sesión
                </AuthButton>
              ) : (
                <>
                  <DropdownButtonContainer ref={dropdownMenuRef}>
                    <ProfileIcon onClick={toggleDropdown}>
                      {profileImageUrl ? (
                        <Image
                          src={profileImageUrl}
                          alt="profile"
                          width={30}
                          height={30}
                        />
                      ) : (
                        <FaUserCircle size={30} />
                      )}
                    </ProfileIcon>

                    {isDropdownOpen && (
                      <ProfileDropdown>
                        <ProfileDropdownItem onClick={toggleProductOrdersModal}>
                          Órdenes de Productos
                        </ProfileDropdownItem>
                        <ProfileDropdownItem onClick={handleLogoutClick}>
                          Cerrar Sesión
                        </ProfileDropdownItem>
                      </ProfileDropdown>
                    )}
                  </DropdownButtonContainer>
                </>
              )}
            </>
          ) : (
            <LoadingSpinner />
          )}
        </AuthButtons>

        <MobileMenu $isOpen={isOpen}>
          <Link href="/" passHref>
            <NavLink onClick={toggleMenu}>Inicio</NavLink>
          </Link>
          {["Servicios", "Tienda", "Nosotros", "Contacto"].map((item) => (
            <Link href={`/${item.toLowerCase()}`} passHref key={item}>
              <NavLink onClick={toggleMenu}>{item}</NavLink>
            </Link>
          ))}

          <Badge
            badgeContent={cartItems.length}
            color="secondary"
            style={{ cursor: "pointer", alignSelf: "center" }}
            onClick={toggleCart}
          >
            <FaShoppingCart color="black" />
          </Badge>

          {isAdmin && (
            <AuthButton
              onClick={toggleAdminPanel}
              style={{ marginTop: "1rem" }}
            >
              Admin Panel
            </AuthButton>
          )}

          {!isLoading && showButtons ? (
            <>
              {!isAuthenticated ? (
                <AuthButton onClick={handleAuthButtonClick}>
                  Iniciar Sesión
                </AuthButton>
              ) : (
                <>
                  {/* Aquí mostramos Órdenes de Productos directamente en mobile */}
                  <MobileOnly>
                    <DropdownButton onClick={toggleProductOrdersModal}>
                      Órdenes de Productos
                    </DropdownButton>
                  </MobileOnly>

                  {/* Mantener pedidos solo en pantallas más grandes */}
                  <DesktopOnly>
                    <DropdownButton onClick={toggleDropdown}>
                      Pedidos
                    </DropdownButton>
                    {isDropdownOpen && (
                      <DropdownMenu>
                        <DropdownItem onClick={toggleProductOrdersModal}>
                          Órdenes de Productos
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </DesktopOnly>

                  <AuthButton onClick={handleLogoutClick}>
                    Cerrar Sesión
                  </AuthButton>
                </>
              )}
            </>
          ) : (
            <LoadingSpinner />
          )}
        </MobileMenu>
      </NavContainer>
      {isAuthChecked && <AuthModal />}
      {isProductOrdersModalOpen && (
        <ProductOrdersModal
          open={isProductOrdersModalOpen}
          onClose={toggleProductOrdersModal}
        />
      )}
      <Modal
        open={isAdminPanelOpen}
        onClose={toggleAdminPanel}
        aria-labelledby="admin-panel-modal"
      >
        <div>
          <EcommerceWithAdmin onClose={toggleAdminPanel} />
        </div>
      </Modal>
      <Modal
        open={isCartOpen}
        onClose={toggleCart}
        aria-labelledby="cart-modal"
      >
        <div>
          <Cart isOpen={isCartOpen} onClose={toggleCart} />
        </div>
      </Modal>
    </Nav>
  );
};

export default Navbar;
