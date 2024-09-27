import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProductOrders,
  updateOrderStatus,
  selectAllProductOrders,
  getProductOrderStatus,
  getProductOrderError,
} from "@/redux/features/productOrder/productOrderSlice";
import { selectIsAdmin } from "@/redux/authSelectors";
import {
  selectAllProducts,
  fetchProducts,
} from "@/redux/features/product/productSlice";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import {
  CloseButton,
  ModalHeader,
  OrderContainer,
  OrderItem,
  OrderHeader,
  OrderDetails,
  StyledModalContainer,
  TableWrapper,
  ToggleButton,
  ProductDetailsContainer,
  ProductName,
  ProductAttributes,
  ProductAttribute,
} from "./orderModelStyles";
import {
  Button,
  StatusLabel,
  StatusOption,
  StatusSelect,
  StatusSelectContainer,
} from "../orders/ordersModalStyled";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllProductOrders);
  const orderStatus = useAppSelector(getProductOrderStatus);
  const orderError = useAppSelector(getProductOrderError);
  const products = useAppSelector(selectAllProducts); 
  const isAdmin = useAppSelector(selectIsAdmin);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("pendiente");
  const [isAscending, setIsAscending] = useState(false); 

  useEffect(() => {
    if (open) {
      dispatch(fetchProductOrders());
      dispatch(fetchProducts()); 
    }
  }, [dispatch, open]);

  const handleToggle = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleStatusChange = (orderId: number) => {
  
    dispatch(updateOrderStatus({ id: orderId, status: selectedStatus }));
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  // Función para obtener detalles de un producto por su ID
  const getProductDetailsById = (id: number) => {
    return products.find((product) => product.id === id);
  };

  // Ordenar las órdenes por fecha
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return isAscending ? dateA - dateB : dateB - dateA;
  });

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalContainer>
        <ModalHeader>Órdenes de Compra</ModalHeader>
        <Button onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? "Más Antiguas Primero" : "Más Recientes Primero"}
        </Button>
        {orderStatus === "loading" && <CircularProgress color="inherit" />}
        {orderStatus === "failed" && <p>Error: {orderError}</p>}
        {orderStatus === "succeeded" && sortedOrders.length > 0 && (
          <TableWrapper>
            {sortedOrders.map((order) => (
              <OrderContainer key={order.id}>
                <OrderHeader onClick={() => handleToggle(order.id)}>
                  <span>
                    <strong>ID:</strong> {order.id}
                  </span>
                  <span>{order.user?.nombre || "Usuario desconocido"}</span>
                  <ToggleButton>
                    {expandedOrderId === order.id ? "▲" : "▼"}
                  </ToggleButton>
                </OrderHeader>
                {expandedOrderId === order.id && (
                  <OrderDetails>
                    <OrderItem>
                      <strong>Email:</strong>{" "}
                      {order.user?.email || "Email no disponible"}
                    </OrderItem>
                    <OrderItem>
                      <strong>Teléfono:</strong> {order.phone_number}
                    </OrderItem>
                    <OrderItem>
                      <strong>Total:</strong> $
                      {typeof order.total === "number"
                        ? order.total.toFixed(2)
                        : parseFloat(order.total).toFixed(2)}
                    </OrderItem>
                    <OrderItem>
                      <strong>Método de Envío:</strong>{" "}
                      {order.shipping_method === "delivery"
                        ? "Envío a domicilio"
                        : "Retirar en el local"}
                    </OrderItem>
                    {order.shipping_method === "delivery" && (
                      <>
                        <OrderItem>
                          <strong>Dirección:</strong>{" "}
                          {order.address || "No disponible"}
                        </OrderItem>
                        <OrderItem>
                          <strong>Ciudad:</strong>{" "}
                          {order.city || "No disponible"}
                        </OrderItem>
                      </>
                    )}
                    <OrderItem>
                      <strong>Método de Pago:</strong>{" "}
                      {order.payment_method === "mercadopago"
                        ? "Mercado Pago"
                        : "Depósito"}
                    </OrderItem>
                    <OrderItem>
                      <strong>Status:</strong>
                      <StatusLabel status={order.status}>
                        {order.status}
                      </StatusLabel>
                    </OrderItem>
                    <OrderItem>
                      <strong>Fecha:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </OrderItem>
                    <OrderItem>
                      <strong>Productos:</strong>
                      <ul>
                        {order.products?.length > 0 ? (
                          order.products.map((product) => {
                            const productDetails = getProductDetailsById(
                              product.id
                            );

                            return (
                              <li key={product.id}>
                                <ProductDetailsContainer>
                                  <ProductName>
                                    {product.name} - {product.quantity} unidades
                                  </ProductName>
                                  {productDetails && (
                                    <ProductAttributes>
                                      <ProductAttribute>
                                        <span>Marca:</span>{" "}
                                        {productDetails.brand}
                                      </ProductAttribute>
                                      <ProductAttribute>
                                        <span>Color:</span>{" "}
                                        {productDetails.color}
                                      </ProductAttribute>
                                      <ProductAttribute>
                                        <span>Categoría:</span>{" "}
                                        {productDetails.category}
                                      </ProductAttribute>
                                    </ProductAttributes>
                                  )}
                                </ProductDetailsContainer>
                              </li>
                            );
                          })
                        ) : (
                          <li>No hay productos en esta orden.</li>
                        )}
                      </ul>
                    </OrderItem>

                    {order.payment_proof_url && (
                      <OrderItem>
                        <strong>Comprobante de Pago:</strong>
                        <Button
                          onClick={() =>
                            handleDownload(order.payment_proof_url!)
                          }
                        >
                          Descargar Comprobante
                        </Button>
                      </OrderItem>
                    )}

                    {isAdmin && (
                      <StatusSelectContainer>
                        <label htmlFor="status-select">Cambiar estado:</label>
                        <StatusSelect
                          id="status-select"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <StatusOption value="pendiente">
                            Pendiente
                          </StatusOption>
                          <StatusOption value="aprobado">Aprobado</StatusOption>
                          <StatusOption value="rechazado">
                            Rechazado
                          </StatusOption>
                        </StatusSelect>
                        <Button onClick={() => handleStatusChange(order.id)}>
                          Actualizar Estado
                        </Button>
                      </StatusSelectContainer>
                    )}
                  </OrderDetails>
                )}
              </OrderContainer>
            ))}
          </TableWrapper>
        )}
        {orderStatus === "succeeded" && sortedOrders.length === 0 && (
          <p>No se encontraron órdenes.</p>
        )}
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
      </StyledModalContainer>
    </Modal>
  );
};

export default OrderModal;
