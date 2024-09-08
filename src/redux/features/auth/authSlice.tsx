import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

// Definir la interfaz de User con roles, y campos obligatorios u opcionales
export interface Role {
  id: string;
  nombre: string;
}

// Actualización de la interfaz User
export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: (Role | string)[];
  telefono: string;
  foto?: string;
}
// Definir el estado inicial de autenticación
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: Record<string, string> | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const getInitialAuthState = (): AuthState => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);

        // Asegurarse de que los roles estén bien formateados
        if (parsedUser && Array.isArray(parsedUser.roles)) {
          parsedUser.roles = parsedUser.roles.map((role: any) => {
            if (typeof role === "string") {
              return { id: role, nombre: role };
            }
            return role;
          });
        }

        return {
          isAuthenticated: true,
          user: parsedUser,
          isLoading: false,
          error: null,
          status: "succeeded",
        };
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }
  return {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
    status: "idle",
  };
};

const initialState: AuthState = getInitialAuthState();

const getToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/auth"
    : "http://localhost:3001/auth";

// Thunk para verificar la autenticación, usando la ruta /verify
export const checkAuthentication = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  void,
  { state: RootState; rejectValue: Record<string, string> }
>("/auth/checkAuthentication", async (_, { rejectWithValue }) => {
  const token = getToken();

  if (!token) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  try {
    const response = await axios.get("http://localhost:3001/api/jwt/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Guarda los datos en localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return {
      isAuthenticated: true,
      user: response.data.user,
    };
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return rejectWithValue({
      general: "No se pudo verificar la autenticación",
    });
  }
});

// Thunk para iniciar sesión
export const loginUser = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  { email: string; password: string },
  { state: RootState; rejectValue: Record<string, string> }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    // Verifica que los roles están presentes y en el formato correcto

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return {
      isAuthenticated: true,
      user: response.data.user as User,
    };
  } catch (error: any) {
    return rejectWithValue({ general: "Credenciales inválidas" });
  }
});

// Thunk para registrar un usuario, ahora con la foto opcional
export const registerUser = createAsyncThunk<
  { isAuthenticated: boolean; user: User | null },
  FormData,
  { state: RootState; rejectValue: Record<string, string> }
>("auth/registerUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return {
      isAuthenticated: true,
      user: response.data.user as User,
    };
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400 && data.errors) {
        return rejectWithValue(
          data.errors.reduce(
            (
              acc: Record<string, string>,
              err: { param: string; msg: string }
            ) => {
              acc[err.param] = err.msg;
              return acc;
            },
            {}
          )
        );
      } else if (status === 409) {
        return rejectWithValue({ email: "El usuario ya existe" });
      } else {
        return rejectWithValue({
          general: "El usuario ya existe",
        });
      }
    } else {
      return rejectWithValue({
        general: "No se pudo conectar con el servidor",
      });
    }
  }
});

// Thunk para cerrar sesión
export const logoutUser = createAsyncThunk<void, void, { state: RootState }>(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
  }
);

// Slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.status = "idle";
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthStateFromClient: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthentication.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(
        checkAuthentication.fulfilled,
        (
          state,
          action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>
        ) => {
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = action.payload.user;
          state.isLoading = false;
          state.error = null;
          state.status = "succeeded";
        }
      )
      .addCase(
        checkAuthentication.rejected,
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isAuthenticated = false;
          state.user = null;
          state.isLoading = false;
          state.error = action.payload || { general: "Error desconocido" };
          state.status = "failed";
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ isAuthenticated: boolean; user: User | null }>
        ) => {
          const user = action.payload.user;

          if (user && Array.isArray(user.roles)) {
            user.roles = user.roles.map((role) => {
              if (typeof role === "string") {
                return { id: role, nombre: role };
              }
              return role;
            });
          }

          // Actualiza el estado de Redux
          state.isAuthenticated = action.payload.isAuthenticated;
          state.user = user;
          state.isLoading = false;
          state.error = null;
          state.status = "succeeded";

          // Guardar el usuario actualizado en localStorage
          localStorage.setItem("user", JSON.stringify(user));
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || { general: "Error desconocido" };
          state.status = "failed";
        }
      )
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        // No guardar el token ni marcar al usuario como autenticado
        state.isLoading = false;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || { general: "Error desconocido" };
          state.status = "failed";
        }
      )
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = "idle";
      });
  },
});

export const { logout, clearError, setAuthStateFromClient } = authSlice.actions;

export default authSlice.reducer;
