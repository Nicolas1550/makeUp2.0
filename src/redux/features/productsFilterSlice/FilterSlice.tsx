import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definición de la interfaz para el producto
export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageFileName?: string;
  quantity: number;
  description?: string;
  brand: string;
  color: string;
  category?: string;  
  createdAt: string;
  updatedAt: string;
}

// Estado inicial del filtro
interface FilterState {
  searchTerm: string;          
  priceRange: [number, number]; 
  selectedColor: string | null; 
  selectedMarca: string | null; 
  selectedCategory: string | null;
}

// Estado inicial del filtro
const initialState: FilterState = {
  searchTerm: "",
  priceRange: [0, 100000],
  selectedColor: null,
  selectedMarca: null,
  selectedCategory: "Todos", 
};

// Slice para manejar los filtros
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setSelectedColor: (state, action: PayloadAction<string | null>) => {
      state.selectedColor = action.payload;
    },
    setSelectedMarca: (state, action: PayloadAction<string | null>) => {
      state.selectedMarca = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

// Acciones exportadas
export const {
  setSearchTerm,
  setPriceRange,
  setSelectedColor,
  setSelectedMarca,
  setSelectedCategory,
} = filterSlice.actions;

export default filterSlice.reducer;


// Selector para obtener el término de búsqueda
export const selectSearchTerm = (state: { filter: FilterState }) => state.filter.searchTerm;

// Selector para obtener el rango de precios
export const selectPriceRange = (state: { filter: FilterState }) => state.filter.priceRange;

// Selector para obtener el color seleccionado
export const selectSelectedColor = (state: { filter: FilterState }) => state.filter.selectedColor;

// Selector para obtener la marca seleccionada
export const selectSelectedMarca = (state: { filter: FilterState }) => state.filter.selectedMarca;

// Selector para obtener la categoría seleccionada
export const selectSelectedCategory = (state: { filter: FilterState }) => state.filter.selectedCategory;

// Selector para aplicar los filtros sobre los productos
export const selectFilteredProducts = (state: { product: { products: ProductType[] }; filter: FilterState }) => {
  const { products } = state.product;
  const { searchTerm, priceRange, selectedColor, selectedMarca, selectedCategory } = state.filter;

  // Si el campo de búsqueda está vacío, devolver todos los productos
  if (!searchTerm) {
    return products;
  }

  // Filtrado por término de búsqueda
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrado por rango de precios
  filteredProducts = filteredProducts.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Filtrado por color
  if (selectedColor) {
    filteredProducts = filteredProducts.filter((product) =>
      product.color.toLowerCase() === selectedColor.toLowerCase()
    );
  }

  // Filtrado por marca
  if (selectedMarca) {
    filteredProducts = filteredProducts.filter((product) =>
      product.brand.trim().toLowerCase() === selectedMarca.trim().toLowerCase()
    );
  }

  // Filtrado por categoría
  if (selectedCategory && selectedCategory !== "Todos") {
    filteredProducts = filteredProducts.filter((product) =>
      product.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  return filteredProducts;
};
