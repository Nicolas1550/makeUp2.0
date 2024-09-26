import { Middleware } from "redux";
import { RootState } from "@/redux/store";

// Actualizamos el tipo de payload a `unknown` en lugar de `any`
interface CustomAction {
  type: string;
  payload?: unknown;
}

// Middleware actualizado sin el parámetro _store
export const authMiddleware: Middleware<unknown, RootState> =
  () => (next) => (action) => {
    const customAction = action as CustomAction;

    // Validamos si el tipo de acción empieza con "auth/" y no hay token
    if (
      customAction.type.startsWith("auth/") &&
      !localStorage.getItem("token")
    ) {
      console.warn("Token no encontrado");
    }

    return next(action);
  };
