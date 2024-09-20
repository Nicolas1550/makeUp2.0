import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Product } from "../product/productSlice";

// Extender la interfaz Product para incluir CartProduct
export interface CartProduct extends Product {
  imageUrl: string;
}

interface CartState {
  cartItems: CartProduct[];
}

const isClient = typeof window !== "undefined";

const initialState: CartState = {
  cartItems: isClient
    ? JSON.parse(localStorage.getItem("cartItems") || "[]")
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const cartProduct: CartProduct = {
        ...action.payload,
        imageUrl: `https://backendiaecommerce.onrender.com/uploads/images/${
          action.payload.imageFileName || ""
        }`,
      };

      // Verificar si ya existe el producto en el carrito y si el stock lo permite
      if (index !== -1) {
        // Verificar si la cantidad en el carrito más una sigue siendo menor o igual al stock disponible
        if (state.cartItems[index].quantity < action.payload.quantity) {
          state.cartItems[index].quantity += 1;
        } else {
          console.warn("Stock insuficiente para agregar más unidades de este producto.");
        }
      } else {
        // Si no está en el carrito, verificar que el stock sea al menos 1
        if (action.payload.quantity > 0) {
          state.cartItems.push({ ...cartProduct, quantity: 1 });
        } else {
          console.warn("Stock insuficiente para agregar este producto.");
        }
      }

      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        const cartItem = state.cartItems[index];
        // Aquí verificas si la cantidad en el carrito es menor al stock del producto
        if (cartItem.quantity < cartItem.quantity) {
          console.warn("No hay suficiente stock disponible para este producto.");
        } else {
          cartItem.quantity += 1;
        }
      }

      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        if (state.cartItems[index].quantity > 1) {
          state.cartItems[index].quantity -= 1;
        }
      }
      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      if (isClient) {
        localStorage.removeItem("cartItems");
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
