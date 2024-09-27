import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  fetchFeaturedProducts,
  featureProduct,
  unfeatureProduct,
  selectFeaturedProducts,
} from "@/redux/features/product/productSlice";
import {
  setSearchTerm,
  selectSearchTerm,
  selectFilteredProducts,
} from "@/redux/features/productsFilterSlice/FilterSlice";
import { ActionButton, ProductTable, TableWrapper } from "./styles/adminPanelStyles";
import Image from "next/image";

const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>; 

  const parts = text.split(new RegExp(`(${highlight})`, 'gi')); 

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: "#ffd700", fontWeight: "bold" }}>{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};

const FeaturedProductsPanel: React.FC = () => {
  const dispatch = useAppDispatch();

  // Obtener el término de búsqueda del estado
  const searchTerm = useAppSelector(selectSearchTerm);

  // Obtener los productos filtrados según el término de búsqueda
  const products = useAppSelector(selectFilteredProducts);
  const featuredProducts = useAppSelector(selectFeaturedProducts);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  // Función para manejar el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value)); 
  };

  const handleFeatureClick = (id: number) => {
    dispatch(featureProduct(id));
  };

  const handleUnfeatureClick = (id: number) => {
    dispatch(unfeatureProduct(id));
  };

  return (
    <TableWrapper>
      <h2>Gestionar Productos Destacados</h2>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos por nombre"
        value={searchTerm} 
        onChange={handleSearchChange} 
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%", color: "#000" }} // Color negro en el input
      />

      <ProductTable>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Imagen</th>
            <th>Estado Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <HighlightedText text={product.name} highlight={searchTerm} />
                </td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.imageFileName && (
                    <Image
                      src={`https://makeupbackend2-0.onrender.com/uploads/images/${product.imageFileName}`}
                      alt={product.name}
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                  )}
                </td>
                <td>
                  {featuredProducts.some((featured) => featured.id === product.id)
                    ? "Destacado"
                    : "No destacado"}
                </td>
                <td>
                  {featuredProducts.some((featured) => featured.id === product.id) ? (
                    <ActionButton
                      onClick={() => handleUnfeatureClick(product.id)}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                    >
                      Quitar de Destacados
                    </ActionButton>
                  ) : (
                    <ActionButton
                      onClick={() => handleFeatureClick(product.id)}
                      style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                    >
                      Agregar a Destacados
                    </ActionButton>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No se encontraron productos</td>
            </tr>
          )}
        </tbody>
      </ProductTable>
    </TableWrapper>
  );
};

export default FeaturedProductsPanel;
