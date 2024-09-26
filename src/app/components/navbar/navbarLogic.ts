import { useState, useEffect, useRef } from "react";
import axios from "axios"; 
import { checkAuthentication } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showAuthModal } from "@/redux/features/ui/uiSlice";
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectIsAdmin,
} from "@/redux/authSelectors";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAuthToken } from "@/app/hooks/useAuthToken";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

export const useNavbarLogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isProductOrdersModalOpen, setIsProductOrdersModalOpen] =
    useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const [servicios, setServicios] = useState([]);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const dropdownMenuRef = useRef<HTMLDivElement>(null); 
  const moreDropdownRef = useRef<HTMLDivElement>(null); 
  const servicesDropdownRef = useRef<HTMLDivElement>(null); 

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector(selectIsLoading);
  const isAdmin = useAppSelector(selectIsAdmin);
  const cartItems = useAppSelector(selectCartItems);
  const { logout } = useAuthToken();

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://makeupbackend2-0.onrender.com";

  // Estado para la URL de la imagen de perfil
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  // Recuperar el token del localStorage y chequear la autenticación
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      dispatch(checkAuthentication()).finally(() => {
        setIsAuthChecked(true);
        setTimeout(() => setShowButtons(true), 100);
      });
    } else {
      setIsAuthChecked(true);
      setTimeout(() => setShowButtons(true), 100);
    }
  }, [dispatch]);

  // Cargar los servicios
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/servicios`);
        setServicios(response.data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    };
    fetchServicios();
  }, [baseURL]); // Agregar baseURL como dependencia

  // Manejar el URL de la imagen de perfil con localStorage solo en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedImageUrl = localStorage.getItem("profileImageUrl");
      if (user?.foto) {
        const imageUrl = `${baseURL}/uploads/images/${user.foto}`;
        setProfileImageUrl(imageUrl);
        localStorage.setItem("profileImageUrl", imageUrl);
      } else if (storedImageUrl) {
        setProfileImageUrl(storedImageUrl);
      }
    }
  }, [user, baseURL]); // Agregar baseURL y user como dependencias

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogoutClick = () => {
    logout();
    if (typeof window !== "undefined") {
      localStorage.removeItem("profileImageUrl"); 
    }
  };
  const handleAuthButtonClick = () => dispatch(showAuthModal("login"));
  const toggleProductOrdersModal = () =>
    setIsProductOrdersModalOpen(!isProductOrdersModalOpen);
  const toggleAdminPanel = () => setIsAdminPanelOpen(!isAdminPanelOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMoreDropdown = () => setIsMoreDropdownOpen(!isMoreDropdownOpen);
  const toggleServicesDropdown = () =>
    setIsServicesDropdownOpen(!isServicesDropdownOpen);

  useOutsideClick(dropdownMenuRef, () => setIsDropdownOpen(false)); 
  useOutsideClick(moreDropdownRef, () => setIsMoreDropdownOpen(false)); 
  useOutsideClick(servicesDropdownRef, () => setIsServicesDropdownOpen(false)); 
  const closeDropdowns = () => {
    setIsMoreDropdownOpen(false);
    setIsServicesDropdownOpen(false);
  };
  return {
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
    closeDropdowns, // Devuelve la función para que se pueda usar en el componente Navbar
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
  };
};