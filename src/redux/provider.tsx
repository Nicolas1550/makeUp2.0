// src/app/providers.tsx
"use client"; // Necesario para componentes que usan hooks como el Provider de Redux

import { Provider } from "react-redux";
import { store } from "./store"; // Asegúrate de que la ruta sea correcta
import { GlobalStyle } from "@/app/globalStyle/globalStyle";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GlobalStyle /> {/* Incluye el estilo global aquí */}
      {children}
    </Provider>
  );
}
