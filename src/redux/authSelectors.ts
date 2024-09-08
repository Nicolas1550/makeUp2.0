import { createSelector } from "reselect";
import { RootState } from "./store";
type Role = {
  id: string;
  nombre: string;
};
// Selecciona el estado de autenticación
const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);

// Selecciona si el usuario es admin basado en su rol
export const selectIsAdmin = createSelector([selectAuth], (auth) => {
  // Verificar si el usuario o los roles aún no están definidos
  if (!auth.user || !auth.user.roles || auth.user.roles.length === 0) {
    console.warn("Los roles del usuario están indefinidos o vacíos.", auth.user);
    return false;
  }


  return auth.user.roles.some((role: Role | string) => {
    return typeof role === "string" ? role === "admin" : role.nombre === "admin";
  });
});

