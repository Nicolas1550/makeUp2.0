import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"; // Importa AxiosError
import { RootState } from "../../store";

export interface Role {
  id: string;
  nombre: string;
}

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: Role[];
  telefono: string;
  fotoUrl?: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  rolesLoaded: boolean; 
  error: Record<string, string> | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  rolesLoaded: false, 
  error: null,
  status: "idle",
};

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "http://localhost:3001";

// Thunk para obtener todos los usuarios
// Thunk para obtener todos los usuarios
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { state: RootState; rejectValue: Record<string, string> }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data as User[];
  } catch {
    return rejectWithValue({ general: "Error al obtener los usuarios" });
  }
});

// Thunk para obtener los roles de todos los usuarios
export const fetchUserRoles = createAsyncThunk<
  { userId: string; roles: Role[] }[],
  void,
  { state: RootState; rejectValue: Record<string, string> }
>("users/fetchUserRoles", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/roles`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch {
    return rejectWithValue({
      general: "Error al obtener los roles de los usuarios",
    });
  }
});

// Thunks para asignar y remover roles
export const assignRoleToEmployee = createAsyncThunk<
  User,
  { userId: string; role: string },
  { state: RootState; rejectValue: Record<string, string> }
>(
  "users/assignRoleToEmployee",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/users/assignRoles/${userId}`,
        { roles: [role] },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data as User;
    } catch {
      return rejectWithValue({
        general: "Error al asignar el rol de empleado",
      });
    }
  }
);

export const removeRoleFromEmployee = createAsyncThunk<
  User,
  { userId: string },
  { state: RootState; rejectValue: Record<string, string> }
>("users/removeRoleFromEmployee", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/users/removeRole/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data as User;
  } catch {
    return rejectWithValue({
      general: "Error al desasignar el rol de empleado",
    });
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload.map((user) => ({
          ...user,
          roles: user.roles && Array.isArray(user.roles) ? user.roles : [],
        }));
        state.isLoading = false;
        state.status = "succeeded";
      })
      .addCase(
        fetchUsers.rejected,
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || { general: "Error desconocido" };
          state.status = "failed";
        }
      )

      // Fetch user roles
      .addCase(fetchUserRoles.pending, (state) => {
        state.isLoading = true;
        state.rolesLoaded = false;
        state.error = null;
      })
      .addCase(
        fetchUserRoles.fulfilled,
        (state, action: PayloadAction<{ userId: string; roles: Role[] }[]>) => {
          state.users = state.users.map((user) => {
            const userRoles = action.payload.find((u) => u.userId === user.id);
            return {
              ...user,
              roles: userRoles ? userRoles.roles : [], 
            };
          });
          state.isLoading = false;
          state.rolesLoaded = true; 
          state.status = "succeeded";
        }
      )
      .addCase(
        fetchUserRoles.rejected,
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isLoading = false;
          state.rolesLoaded = false;
          state.error = action.payload || { general: "Error desconocido" };
          state.status = "failed";
        }
      )

      // Assign role
      .addCase(assignRoleToEmployee.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        assignRoleToEmployee.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.users = state.users.map((user) =>
            user.id === action.payload.id
              ? { ...action.payload, roles: action.payload.roles || [] }
              : user
          );
          state.isLoading = false;
          state.status = "succeeded";
        }
      )
      .addCase(
        assignRoleToEmployee.rejected,
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || { general: "Error desconocido" };
          state.status = "failed";
        }
      )

      // Remove role
      .addCase(removeRoleFromEmployee.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        removeRoleFromEmployee.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.users = state.users.map((user) =>
            user.id === action.payload.id
              ? { ...action.payload, roles: action.payload.roles || [] }
              : user
          );
          state.isLoading = false;
          state.status = "succeeded";
        }
      )
      .addCase(
        removeRoleFromEmployee.rejected,
        (state, action: PayloadAction<Record<string, string> | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || { general: "Error desconocido" };
          state.status = "failed";
        }
      );
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
