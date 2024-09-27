import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"; 
import { RootState } from "../../store";

interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[];
  telefono: string;
  foto?: string;
}

interface Service {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  empleados?: User[];
}

interface ServiceState {
  services: Service[];
  selectedServiceUsers: User[];
  isLoading: boolean;
  error: Record<string, string> | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ServiceState = {
  services: [],
  selectedServiceUsers: [],
  isLoading: false,
  error: null,
  status: "idle",
};

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://makeupbackend2-0.onrender.com"
    : "https://makeupbackend2-0.onrender.com";

// Thunk para obtener todos los servicios
export const fetchServices = createAsyncThunk<
  Service[],
  void,
  { state: RootState; rejectValue: Record<string, string> }
>("services/fetchServices", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/api/servicios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as Service[];
  } catch {
    return rejectWithValue({ general: "Error al obtener los servicios" });
  }
});

// Thunk para obtener los usuarios asignados a un servicio específico
export const fetchServiceUsers = createAsyncThunk<
  User[],
  { serviceId: string },
  { state: RootState; rejectValue: Record<string, string> }
>("services/fetchServiceUsers", async ({ serviceId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_BASE_URL}/api/servicios/services/${serviceId}/users`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data as User[];
  } catch {
    return rejectWithValue({
      general: "Error al obtener los usuarios del servicio",
    });
  }
});

// Thunk para asignar un empleado a un servicio
export const assignEmployeeToService = createAsyncThunk<
  { user: User; servicio: Service },
  { userId: string; serviceId: string },
  { state: RootState; rejectValue: Record<string, string> }
>("services/assignEmployeeToService", async ({ userId, serviceId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/api/servicios/assignToService`, {
      userId,
      serviceId,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch {
    return rejectWithValue({
      general: "Error al asignar el empleado al servicio",
    });
  }
});

// Thunk para desasignar un empleado de un servicio
export const removeEmployeeFromService = createAsyncThunk<
  { user: User; servicio: Service },
  { userId: string; serviceId: string },
  { state: RootState; rejectValue: Record<string, string> }
>("services/removeEmployeeFromService", async ({ userId, serviceId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/api/servicios/removeFromService`, {
      userId,
      serviceId,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch {
    return rejectWithValue({
      general: "Error al desasignar el empleado del servicio",
    });
  }
});


// Slice para manejar el estado de servicios
const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    employeeAssigned: (
      state,
      action: PayloadAction<{ user: User; serviceId: string }>
    ) => {
      const { user, serviceId } = action.payload;
      const service = state.services.find((s) => s.id === serviceId);

      // Asegúrate de agregar el empleado al servicio y a selectedServiceUsers
      if (service && !service.empleados?.some((u) => u.id === user.id)) {
        service.empleados = [...(service.empleados || []), user];
      }

      // Agregar el usuario a selectedServiceUsers si no está ya
      if (!state.selectedServiceUsers.some((u) => u.id === user.id)) {
        state.selectedServiceUsers.push(user);
      }
    },
    employeeRemoved: (
      state,
      action: PayloadAction<{ userId: string; serviceId: string }>
    ) => {
      const { userId, serviceId } = action.payload;
      const service = state.services.find((s) => s.id === serviceId);

      // Eliminar el empleado del servicio y de selectedServiceUsers
      if (service) {
        service.empleados = service.empleados?.filter((user) => user.id !== userId);
      }
      state.selectedServiceUsers = state.selectedServiceUsers.filter((user) => user.id !== userId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.services = action.payload;
        state.isLoading = false;
        state.status = "succeeded";
      })
      .addCase(fetchServices.rejected, (state, action: PayloadAction<Record<string, string> | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || { general: "Error desconocido" };
        state.status = "failed";
      })

      // Fetch service users
      .addCase(fetchServiceUsers.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchServiceUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.selectedServiceUsers = action.payload;
        state.isLoading = false;
        state.status = "succeeded";
      })
      .addCase(fetchServiceUsers.rejected, (state, action: PayloadAction<Record<string, string> | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || { general: "Error desconocido" };
        state.status = "failed";
      });
  },
});

export const { clearError, employeeAssigned, employeeRemoved } = serviceSlice.actions;
export default serviceSlice.reducer;
