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
    dropdownMenuRef,
    moreDropdownRef,
    servicesDropdownRef,
    isAuthenticated,
    user,
    isLoading,
    isAdmin,
    cartItems,
    handleAuthButtonClick,
    handleLogoutClick,
    profileImageUrl,
    servicios,
  } = useNavbarLogic();

  if (!isAuthChecked) return null;

  return (
    <Nav>
      <NavContainer>
        <HamburgerIcon onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </HamburgerIcon>
        <Logo href="/">Salon Unisex</Logo>
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
                    <NavLink>Cualquiera</NavLink>
                  </Link>
                </DropdownItem>
                {servicios.map((servicio: any) => (
                  <DropdownItem key={servicio.id}>
                    <Link href={`/servicios/${servicio.id}`} passHref>
                      <NavLink>{servicio.nombre}</NavLink>
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
              <NavLink>Tienda</NavLink>
            </Link>
          </motion.div>

          <DropdownButtonContainer ref={moreDropdownRef}>
            <DropdownButton onClick={toggleMoreDropdown}>Más</DropdownButton>
            {isMoreDropdownOpen && (
              <DropdownMenu>
                <DropdownItem>
                  <Link href="/nosotros" passHref>
                    <NavLink>Nosotros</NavLink>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href="/contacto" passHref>
                    <NavLink>Contacto</NavLink>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            )}
          </DropdownButtonContainer>
        </NavLinks>

        <AuthButtons>
          <Badge
            badgeContent={cartItems.length}
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={toggleCart}
          >
            <FaShoppingCart />
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
            color="primary"
            style={{ cursor: "pointer", alignSelf: "center" }}
            onClick={toggleCart}
          >
            <FaShoppingCart />
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
