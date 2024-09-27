"use client";
import React, { useEffect, useState } from "react";
import AdminProductManager from "./adminProductManager";
import ProductTableComponent from "./productTableComponent";
import FeaturedProductsPanel from "./featuredProductsPanel";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectAllProducts,
  fetchProducts,
  deleteProduct,
  updateProduct,
  getProductStatus,
  getProductError,
} from "@/redux/features/product/productSlice";
import {
  AdminButton,
  ButtonContainer,
  ModalContainer,
} from "./styles/ecommerceWithAdminStyles";
import { Product } from "@/redux/features/cart/cartSlice";
import OrdersChart from "../productOrderModal/ordersChart";
import UserManagement from "../userManagement/userManagement";
import UserServiceManagement from "../userServiceManagement/userServiceManagement";

interface EcommerceWithAdminProps {
  onClose: () => void;
}

const EcommerceWithAdmin: React.FC<EcommerceWithAdminProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);
  const [showOrdersChart, setShowOrdersChart] = useState<boolean>(false);
  const [showUserManagement, setShowUserManagement] = useState<boolean>(false);
  const [showUserServiceManagement, setShowUserServiceManagement] =
    useState<boolean>(false);
  const [showFeaturedProductsPanel, setShowFeaturedProductsPanel] =
    useState<boolean>(false);

  const products = useAppSelector(selectAllProducts); 
  const productStatus = useAppSelector(getProductStatus);
  const productError = useAppSelector(getProductError);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleShowTable = () => {
    setEditingProductId(null);
    setShowAddProductForm(false);
    setShowOrdersChart(false);
    setShowUserManagement(false);
    setShowUserServiceManagement(false);
    setShowFeaturedProductsPanel(false);
  };

  const handleShowAddProductForm = () => {
    setEditingProductId(null);
    setShowAddProductForm(true);
    setShowOrdersChart(false);
    setShowUserManagement(false);
    setShowUserServiceManagement(false);
    setShowFeaturedProductsPanel(false);
  };

  const handleShowOrdersChart = () => {
    setEditingProductId(null);
    setShowAddProductForm(false);
    setShowOrdersChart(true);
    setShowUserManagement(false);
    setShowUserServiceManagement(false);
    setShowFeaturedProductsPanel(false);
  };

  const handleShowUserManagement = () => {
    setEditingProductId(null);
    setShowAddProductForm(false);
    setShowOrdersChart(false);
    setShowUserManagement(true);
    setShowUserServiceManagement(false);
    setShowFeaturedProductsPanel(false);
  };

  const handleShowUserServiceManagement = () => {
    setEditingProductId(null);
    setShowAddProductForm(false);
    setShowOrdersChart(false);
    setShowUserManagement(false);
    setShowUserServiceManagement(true);
    setShowFeaturedProductsPanel(false);
  };

  const handleShowFeaturedProductsPanel = () => {
    setEditingProductId(null);
    setShowAddProductForm(false);
    setShowOrdersChart(false);
    setShowUserManagement(false);
    setShowUserServiceManagement(false);
    setShowFeaturedProductsPanel(true);
  };

  const handleSaveProduct = async (formData: FormData) => {
    if (editingProductId) {
      await dispatch(
        updateProduct({ id: editingProductId, updatedProduct: formData })
      );
      setEditingProductId(null);
      setShowAddProductForm(false);
    }
  };

  return (
    <ModalContainer>
      <ButtonContainer>
        <AdminButton onClick={handleShowTable}>Mostrar Tabla</AdminButton>
        <AdminButton onClick={handleShowAddProductForm}>
          Agregar Producto
        </AdminButton>
        <AdminButton onClick={handleShowOrdersChart}>
          Ver Gráfico de Órdenes
        </AdminButton>
        <AdminButton onClick={handleShowUserManagement}>
          Gestionar Colaborador
        </AdminButton>
        <AdminButton onClick={handleShowUserServiceManagement}>
          Gestionar Usuarios y Servicios
        </AdminButton>
        <AdminButton onClick={handleShowFeaturedProductsPanel}>
          Gestionar Productos Destacados
        </AdminButton>
        <AdminButton onClick={onClose}>Cerrar</AdminButton>
      </ButtonContainer>

      {productStatus === "loading" && <p>Cargando productos...</p>}
      {productStatus === "failed" && <p>Error: {productError}</p>}

      {!showAddProductForm &&
        !showOrdersChart &&
        !showUserManagement &&
        !showUserServiceManagement &&
        !showFeaturedProductsPanel &&
        productStatus === "succeeded" && (
          <ProductTableComponent
            products={products} 
            editingProductId={editingProductId}
            editedProduct={editedProduct}
            onEditProduct={(product) => {
              setEditingProductId(product.id);
              setEditedProduct(product);
              setShowAddProductForm(false);
              setShowOrdersChart(false);
            }}
            onDeleteProduct={(id) => dispatch(deleteProduct(id))}
            onSaveProduct={handleSaveProduct}
            onCancelEdit={() => {
              setEditingProductId(null);
              setShowAddProductForm(false);
            }}
            onInputChange={(
              e: React.ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
              >
            ) => {
              const { name, value } = e.target;
              setEditedProduct({ ...editedProduct, [name]: value });
            }}
            onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files.length > 0) {
                setEditedProduct({
                  ...editedProduct,
                  imageFileName: e.target.files[0].name,
                });
              }
            }}
          />
        )}

      {showAddProductForm && <AdminProductManager />}

      {showOrdersChart && <OrdersChart showChart={showOrdersChart} />}

      {showUserManagement && <UserManagement />}

      {showUserServiceManagement && <UserServiceManagement />}

      {showFeaturedProductsPanel && <FeaturedProductsPanel />}
    </ModalContainer>
  );
};

export default EcommerceWithAdmin;
