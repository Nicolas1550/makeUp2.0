import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

// Definición de la interfaz Product
interface Product {
  id: number;
  name: string;
  price: number;
  imageFileName?: string;
  quantity: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;  
}

// Estado inicial para los productos
interface ProductState {
  products: Product[];
  featuredProducts: Product[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  status: "idle",
  error: null,
};

// Thunks

// Obtener todos los productos
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("http://localhost:3001/api/products", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
});

// Obtener productos destacados
export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async () => {
    const response = await axios.get("http://localhost:3001/api/products/featured", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

// Marcar un producto como destacado
export const featureProduct = createAsyncThunk(
  "products/featureProduct",
  async (id: number) => {
    const response = await axios.put(
      `http://localhost:3001/api/products/featured/${id}`,
      { isFeatured: true },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.product;
  }
);

// Quitar un producto del carrusel de ofertas
export const unfeatureProduct = createAsyncThunk(
  "products/unfeatureProduct",
  async (id: number) => {
    const response = await axios.put(
      `http://localhost:3001/api/products/unfeature/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.product;
  }
);

// Agregar un producto
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: FormData) => {
    const response = await axios.post("http://localhost:3001/api/products/add", newProduct, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.product;
  }
);

// Actualizar un producto
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }: { id: number; updatedProduct: FormData }) => {
    const response = await axios.put(
      `http://localhost:3001/api/products/update/${id}`,
      updatedProduct,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.product;
  }
);

// Eliminar un producto
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: number) => {
  await axios.delete(`http://localhost:3001/api/products/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return id;
});

// Slice para manejar el estado de productos
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(featureProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.featuredProducts.push(action.payload);
      })
      .addCase(unfeatureProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.featuredProducts = state.featuredProducts.filter(
          (product) => product.id !== action.payload.id
        );
      });
  },
});

// Exportar el reducer por defecto
export default productSlice.reducer;

// Selectores para acceder al estado desde los componentes
export const selectAllProducts = (state: RootState) => state.product.products;
export const selectFeaturedProducts = (state: RootState) => state.product.featuredProducts;
export const getProductStatus = (state: RootState) => state.product.status;
export const getProductError = (state: RootState) => state.product.error;
