import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../store";

// Definición de la interfaz User
interface User {
  id: number;
  nombre: string;
  email: string;
}

// Definición de la interfaz Product
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  OrderProducts: {
    quantity: number;
  };
  imageFileName?: string;
}

// Definición de la interfaz ProductOrder actualizada
interface ProductOrder {
  id: number;
  user_id: number;
  user?: User; 
  phone_number: string;
  total: number;
  shipping_method: string;
  address?: string;
  city?: string;
  payment_method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  payment_proof_url?: string;
}

// Interfaz para el payload de creación de órdenes
export interface OrderCreationPayload {
  user_id: number;
  phone_number: string;
  total: number;
  products: { id: number; quantity: number }[];
  shipping_method: string;
  address?: string;
  city?: string;
  payment_method: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Estado inicial para las órdenes de productos
interface ProductOrderState {
  orders: ProductOrder[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductOrderState = {
  orders: [],
  status: "idle",
  error: null,
};

// Type guard para AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

// Thunks

// Obtener todas las órdenes de compra de productos
export const fetchProductOrders = createAsyncThunk(
  "productOrders/fetchProductOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/productOrders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Mapeo para asegurar que `orderProductsAssociation` se convierte en `products`
      const mappedOrders = response.data.map((order: any) => ({
        ...order,
        user: order.userOrderAssociation, 
        products: order.orderProductsAssociation.map((product: any) => ({
          ...product,
          quantity: product.OrderProducts.quantity, 
        })),
      }));

      return mappedOrders;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        return rejectWithValue("No se encontraron órdenes.");
      }
      return rejectWithValue(
        isAxiosError(error) ? error.message : "Error desconocido"
      );
    }
  }
);

// Crear una nueva orden de compra de productos con comprobante de pago
export const createProductOrder = createAsyncThunk(
  "productOrders/createProductOrder",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/productOrders/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.order; 
    } catch (error: unknown) {
      return rejectWithValue(
        isAxiosError(error) ? error.message : "Error desconocido"
      );
    }
  }
);

// Crear una nueva orden de compra de productos con Mercado Pago
export const createProductOrderMercadoPago = createAsyncThunk(
  "productOrders/createProductOrderMercadoPago",
  async (orderData: OrderCreationPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/productOrders/mercadopago",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.init_point; 
    } catch (error: unknown) {
      console.error("Error en la solicitud de Mercado Pago:", error);
      return rejectWithValue(
        isAxiosError(error) ? error.message : "Error desconocido"
      );
    }
  }
);

// Actualizar el estado de una orden
export const updateOrderStatus = createAsyncThunk(
  "productOrders/updateOrderStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/productOrders/${id}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.order; 
    } catch (error: unknown) {
      return rejectWithValue(
        isAxiosError(error) ? error.message : "Error desconocido"
      );
    }
  }
);

// Slice para manejar el estado de las órdenes de productos
const productOrderSlice = createSlice({
  name: "productOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductOrders.fulfilled,
        (state, action: PayloadAction<ProductOrder[]>) => {
          state.status = "succeeded";
          state.orders = action.payload;
        }
      )
      .addCase(fetchProductOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createProductOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createProductOrder.fulfilled,
        (state, action: PayloadAction<ProductOrder>) => {
          state.status = "succeeded";
          state.orders.push(action.payload); 
        }
      )
      .addCase(createProductOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createProductOrderMercadoPago.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createProductOrderMercadoPago.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
        }
      )
      .addCase(createProductOrderMercadoPago.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<ProductOrder>) => {
          state.status = "succeeded";
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload; 
          }
        }
      )
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Exportar el reducer por defecto
export default productOrderSlice.reducer;

// Selectores para acceder al estado desde los componentes
export const selectAllProductOrders = (state: RootState) =>
  state.productOrders.orders;
export const getProductOrderStatus = (state: RootState) =>
  state.productOrders.status;
export const getProductOrderError = (state: RootState) =>
  state.productOrders.error;
