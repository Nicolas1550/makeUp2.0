"use client";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { checkAuthentication, setAuthStateFromClient } from "./features/auth/authSlice";

export function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        
        // Establece el estado de autenticación desde el cliente
        dispatch(
          setAuthStateFromClient({
            isAuthenticated: true,
            user: parsedUser,
          })
        );

        // Luego verifica el token en el servidor
        dispatch(checkAuthentication());

      } catch (error) {
        console.error("Error al analizar el usuario desde localStorage", error);
        // Elimina el token y el usuario del almacenamiento si hay un error
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } else {
      console.warn("No se encontró token o usuario en localStorage");
    }
  }, [dispatch]);

  return null; 
}
