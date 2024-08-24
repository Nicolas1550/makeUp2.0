import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/features/product/productSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import sidebarReducer from "../redux/features/sidebar/sidebarSlice";
import authReducer from "../redux/features/auth/authSlice";
import uiReducer from "./features/ui/uiSlice";
import disponibilidadReducer from "./features/disponibilidad/disponibilidadSlice";
import ordersReducer from "./features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    sidebar: sidebarReducer,
    ui: uiReducer,
    auth: authReducer,
    disponibilidad: disponibilidadReducer,
    orders: ordersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
