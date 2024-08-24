import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string; 
  imageFileName?: string; 
}

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
        imageUrl: action.payload.imageUrl || "", 
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
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      if (isClient) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        if (state.cartItems[index].quantity > 1) {
          state.cartItems[index].quantity -= 1;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export default cartSlice.reducer;
