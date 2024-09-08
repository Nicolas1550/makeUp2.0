import React, { useState } from "react";
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

const Cart: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const isAuthenticated = useAppSelector(selectIsAuthenticated); // Verificar autenticación
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      setIsCheckoutOpen(true);
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
                  src={`https://backendiaecommerce.onrender.com/uploads/images/${item.imageFileName}`}
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

      <CheckoutModal
        open={isCheckoutOpen}
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
