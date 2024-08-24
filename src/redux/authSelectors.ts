import { createSelector } from "reselect";
import { RootState } from "./store";

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
export const selectIsAdmin = createSelector(
  [selectAuth],
  (auth) => auth.user?.role === "admin" 
);
