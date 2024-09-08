import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  fetchFeaturedProducts,
  featureProduct,
  unfeatureProduct,
  selectAllProducts,
  selectFeaturedProducts,
} from "@/redux/features/product/productSlice";
import { ActionButton, ProductTable, TableWrapper } from "./styles/adminPanelStyles";
import Image from "next/image"; 

const FeaturedProductsPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const featuredProducts = useAppSelector(selectFeaturedProducts);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const handleFeatureClick = (id: number) => {
    dispatch(featureProduct(id));
  };

  const handleUnfeatureClick = (id: number) => {
    dispatch(unfeatureProduct(id));
  };

  return (
    <TableWrapper>
      <h2>Gestionar Productos Destacados</h2>
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                {product.imageFileName && (
                  <Image
                    src={`https://backendiaecommerce.onrender.com/uploads/images/${product.imageFileName}`}
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
          ))}
        </tbody>
      </ProductTable>
    </TableWrapper>
  );
};

export default FeaturedProductsPanel;
