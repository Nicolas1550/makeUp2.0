import { Middleware } from "redux";
import { RootState } from "@/redux/store";

interface CustomAction {
  type: string;
  payload?: unknown;
}

// Middleware actualizado sin el parámetro _store
export const authMiddleware: Middleware<unknown, RootState> =
  () => (next) => (action) => {
    const customAction = action as CustomAction;

    if (
      customAction.type.startsWith("auth/") &&
      !localStorage.getItem("token")
    ) {
      console.warn("Token no encontrado");
    }

    return next(action);
  };
