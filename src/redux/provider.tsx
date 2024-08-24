"use client"; 

import { Provider } from "react-redux";
import { store } from "./store"; 
import { GlobalStyle } from "@/app/globalStyle/globalStyle";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GlobalStyle />  
      {children}
    </Provider>
  );
}
