import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

interface Disponibilidad {
  id: number;
  servicio_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  disponible: boolean;
  servicio: Servicio | null;
  numOrders?: number; 
}


interface Order {
  id: number;
  user_id: number;
  disponibilidad: Disponibilidad | null;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    nombre: string;
    email: string;
  } | null;
}

interface OrdersState {
  orders: Order[];
  adminOrders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  adminOrders: [], 
  status: "idle",
  error: null,
};

// Thunk para obtener todas las órdenes de un usuario
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get("http://localhost:3001/api/orders", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
});

// Thunk para obtener todas las órdenes para el administrador
export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminOrders",
  async () => {
    const response = await axios.get("http://localhost:3001/api/orders/admin/orders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }
);

// Thunk para actualizar el estado de una orden como administrador
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }: { orderId: number; status: string }) => {
    const response = await axios.put(
      `http://localhost:3001/api/orders/admin/orders/${orderId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
);

// Thunk para obtener una orden por ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId: number) => {
    const response = await axios.get(
      `http://localhost:3001/api/orders/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Acción para añadir una orden desde WebSocket
    orderAdded(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    // Acción para actualizar una orden desde WebSocket
    orderUpdated(state, action: PayloadAction<Order>) {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Estado para fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch orders";
      })
      // Estado para fetchAdminOrders
      .addCase(fetchAdminOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminOrders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch admin orders";
      })
      // Estado para updateOrderStatus
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.adminOrders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.adminOrders[index] = action.payload;
        }
      })
      // Estado para fetchOrderById
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index === -1) {
          state.orders.push(action.payload);
        } else {
          state.orders[index] = action.payload;
        }
      });
  },
});

export const { orderAdded, orderUpdated } = ordersSlice.actions;

export default ordersSlice.reducer;

// Selectores
export const selectAllOrders = (state: RootState) => state.orders.orders;
export const selectAdminOrders = (state: RootState) => state.orders.adminOrders;
export const getOrdersStatus = (state: RootState) => state.orders.status;
export const getOrdersError = (state: RootState) => state.orders.error;
