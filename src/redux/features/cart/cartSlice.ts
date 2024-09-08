import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Interfaz Product actualizada según tu definición
export interface Product {
  id: number;
  name: string;
  price: number;
  imageFileName?: string;
  quantity: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

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
        imageUrl: `http://localhost:3001/uploads/images/${
          action.payload.imageFileName || ""
        }`,
      };
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ ...cartProduct, quantity: 1 });
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
        state.cartItems[index].quantity += 1;
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
