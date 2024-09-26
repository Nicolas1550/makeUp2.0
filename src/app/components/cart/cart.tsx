import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCartItems,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import CheckoutModal from "../checkoutModal/checkoutModal";
import { showAuthModal } from "@/redux/features/ui/uiSlice"; // Para mostrar el modal de autenticación
import { selectIsAuthenticated } from "@/redux/authSelectors"; // Para verificar si está autenticado
import { RootState } from "@/redux/store"; // Importar RootState para acceder al estado global
import {
  CartContainer,
  CartHeader,
  CartItem,
  CartItemsList,
  CartTitle,
  CloseButton,
  ItemControls,
  ItemDetails,
  ItemImage,
  ItemName,
  ItemPrice,
  QuantityButton,
  RemoveButton,
  CheckoutButton,
} from "./cartStyles";
import { selectAllProducts } from "@/redux/features/product/productSlice";

const Cart: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const products = useAppSelector(selectAllProducts); // Obtener los productos del estado global
  const isAuthenticated = useAppSelector(selectIsAuthenticated); // Verificar autenticación
  const isAuthModalVisible = useAppSelector(
    (state: RootState) => state.ui.isAuthModalVisible
  ); // Verificar si el modal de autenticación está visible
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cerrar el modal del carrito si se abre el modal de autenticación
  useEffect(() => {
    if (isAuthModalVisible && isOpen) {
      onClose(); // Cerrar el modal del carrito
    }
  }, [isAuthModalVisible, isOpen, onClose]);

  // Actualiza el estado de checkout basado en autenticación
  useEffect(() => {
    if (!isAuthenticated && isCheckoutOpen) {
      // Si el usuario no está autenticado y se intenta abrir el checkout, mostrar el modal de login
      dispatch(showAuthModal("login"));
      setIsCheckoutOpen(false); // Cierra el modal de checkout
    }
  }, [isAuthenticated, isCheckoutOpen, dispatch]);

  // Función para verificar el stock antes de incrementar la cantidad
  const handleIncrement = (id: number) => {
    const productInStore = products.find((product) => product.id === id);
    const cartItem = cartItems.find((item) => item.id === id);

    if (productInStore && cartItem) {
      if (cartItem.quantity < productInStore.quantity) {
        dispatch(incrementQuantity(id));
      } else {
        alert("No hay suficiente stock disponible para este producto.");
      }
    }
  }; 

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      setIsCheckoutOpen(true); // Solo abre el checkout si el usuario está autenticado
    } else {
      dispatch(showAuthModal("login")); // Mostrar modal de inicio de sesión si no está autenticado
    }
  };

  // Calcular el total del carrito
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * parseFloat(item.price.toString());
  }, 0);

  return (
    <>
      <CartContainer isOpen={isOpen}>
        <CartHeader>
          <CartTitle>Carrito de Compras</CartTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </CartHeader>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <CartItemsList>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <ItemImage
                  src={`https://makeupbackend2-0.onrender.com/uploads/images/${item.imageFileName}`}
                  alt={item.name}
                />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>
                    {item.quantity} x $
                    {parseFloat(item.price.toString()).toFixed(2)} = $
                    {(
                      item.quantity * parseFloat(item.price.toString())
                    ).toFixed(2)}
                  </ItemPrice>
                  <ItemControls>
                    <QuantityButton onClick={() => handleIncrement(item.id)}>
                      +
                    </QuantityButton>
                    <QuantityButton onClick={() => handleDecrement(item.id)}>
                      -
                    </QuantityButton>
                    <RemoveButton onClick={() => handleRemove(item.id)}>
                      Eliminar
                    </RemoveButton>
                  </ItemControls>
                </ItemDetails>
              </CartItem>
            ))}
          </CartItemsList>
        )}
        {cartItems.length > 0 && (
          <>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <CheckoutButton onClick={handleCheckout}>Comprar</CheckoutButton>
          </>
        )}
      </CartContainer>

      {/* Modal de Checkout */}
      <CheckoutModal
        open={isCheckoutOpen && isAuthenticated} // Solo abre si el usuario está autenticado
        onClose={() => {
          setIsCheckoutOpen(false);
          dispatch(clearCart());
          onClose();
        }}
      />
    </>
  );
};

export default Cart;
