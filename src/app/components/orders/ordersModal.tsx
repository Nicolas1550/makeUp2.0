import React, { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalActions,
  Button,
} from "../services&Calendar/modalStyled/modalStyled";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchOrders,
  getOrdersError,
  getOrdersStatus,
  orderAdded,
  orderUpdated,
  selectAllOrders,
  fetchOrderById,
} from "@/redux/features/orders/ordersSlice";
import io from "socket.io-client";
import {
  ExpandButton,
  ModalContent,
  OrderDetails,
  OrderItem,
} from "./ordersModalStyled";
import { ModalHeader } from "../modal/modalStyled";

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllOrders);
  const ordersStatus = useAppSelector(getOrdersStatus);
  const error = useAppSelector(getOrdersError);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && ordersStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [isOpen, ordersStatus, dispatch]);

  useEffect(() => {
    const socket = io("https://backendiaecommerce.onrender.com", {
      withCredentials: true,
    });

    socket.on("orderCreated", (order) => {
      dispatch(orderAdded(order));
      if (!order.disponibilidad || !order.user) {
        dispatch(fetchOrderById(order.id));
      }
    });

    socket.on("orderUpdated", (order) => {
      dispatch(orderUpdated(order));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleOrderClick = (orderId: number) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
    if (selectedOrder) {
      if (!selectedOrder.disponibilidad || !selectedOrder.user) {
        dispatch(fetchOrderById(orderId));
      }
      setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Órdenes</ModalHeader>
        <ModalContent numOrders={orders.length}>
          {ordersStatus === "loading" && <p>Loading...</p>}
          {ordersStatus === "failed" && <p>{error}</p>}
          {orders.map((order, index) => (
            <OrderItem key={order.id}>
              <ExpandButton onClick={() => handleOrderClick(order.id)}>
                {order.disponibilidad?.servicio?.nombre ? (
                  <>
                    {order.disponibilidad.servicio.nombre} -{" "}
                    {new Date(
                      order.disponibilidad.fecha_inicio
                    ).toLocaleDateString()}{" "}
                    - Orden #{index + 1}
                  </>
                ) : (
                  <>
                    {new Date(
                      order.disponibilidad?.fecha_inicio ?? order.createdAt
                    ).toLocaleDateString()}{" "}
                    - Orden #{index + 1}
                  </>
                )}
              </ExpandButton>
              {expandedOrderId === order.id && order.disponibilidad && (
                <OrderDetails>
                  <p>
                    <strong>Servicio:</strong>{" "}
                    {order.disponibilidad.servicio?.nombre}
                  </p>
                  <p>
                    <strong>Fecha Inicio:</strong>{" "}
                    {new Date(
                      order.disponibilidad.fecha_inicio
                    ).toLocaleString()}
                  </p>
                  <p>
                    <strong>Fecha Fin:</strong>{" "}
                    {new Date(order.disponibilidad.fecha_fin).toLocaleString()}
                  </p>
                  <p>
                    <strong>Precio:</strong> ${order.total}
                  </p>
                  <p>
                    <strong>Estado:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Creado en:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Usuario:</strong> {order.user?.nombre}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user?.email}
                  </p>
                </OrderDetails>
              )}
            </OrderItem>
          ))}
        </ModalContent>
        <ModalActions>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default OrdersModal;