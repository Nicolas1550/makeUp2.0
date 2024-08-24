import React, { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalActions,
  Button,
} from "../services&Calendar/modalStyled/modalStyled";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAdminOrders,
  fetchOrderById,
  getOrdersError,
  getOrdersStatus,
  selectAdminOrders,
  updateOrderStatus,
} from "@/redux/features/orders/ordersSlice";
import {
  ExpandButton,
  ModalContent,
  OrderDetails,
  OrderItem,
} from "./ordersModalStyled";
import { ModalHeader } from "../modal/modalStyled";
import OrdersChart from "./ordersChart";

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const adminOrders = useAppSelector(selectAdminOrders);
  const ordersStatus = useAppSelector(getOrdersStatus);
  const error = useAppSelector(getOrdersError);

  // Estado separado para la expansión de las órdenes y el gráfico
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [isChartVisible, setIsChartVisible] = useState<boolean>(false);

  const [selectedStatus, setSelectedStatus] = useState<string>("pendiente");
  const [loadingOrderId, setLoadingOrderId] = useState<number | null>(null);

  // Definir fechas para el gráfico
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (isOpen && ordersStatus === "idle") {
      dispatch(fetchAdminOrders());
    }
  }, [isOpen, ordersStatus, dispatch]);

  const handleOrderClick = async (orderId: number) => {
    if (expandedOrderId === orderId) {
      // Contraer si la misma orden está expandida
      setExpandedOrderId(null);
    } else {
      // Expande la orden y contrae el gráfico si está abierto
      setExpandedOrderId(orderId);
      setIsChartVisible(false);
      setLoadingOrderId(orderId);

      const order = adminOrders.find((o) => o.id === orderId);

      // Recupera la orden si no está completamente cargada
      if (!order || !order.disponibilidad || !order.disponibilidad.servicio) {
        console.warn(
          `Orden ${orderId} no tiene disponibilidad completa, recuperando datos...`
        );
        const result = await dispatch(fetchOrderById(orderId));
        console.log("Datos recuperados de la orden:", result.payload);
      }

      setLoadingOrderId(null);
    }
  };

  const handleStatusChange = (orderId: number) => {
    dispatch(updateOrderStatus({ orderId, status: selectedStatus }));
  };

  const toggleChartVisibility = () => {
    // Alterna la visibilidad del gráfico y contrae cualquier orden expandida
    setIsChartVisible(!isChartVisible);
    setExpandedOrderId(null); // Contraer todas las órdenes al expandir el gráfico
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Órdenes Administrativas</ModalHeader>

        {/* Inputs para seleccionar las fechas */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            color: "#000",
          }}
        >
          <div style={{ marginRight: "10px" }}>
            <label htmlFor="startDate">Fecha de Inicio: </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ color: "#000", backgroundColor: "#fff" }}
            />
          </div>
          <div>
            <label htmlFor="endDate">Fecha de Fin: </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ color: "#000", backgroundColor: "#fff" }}
            />
          </div>
        </div>

        {/* Botón para contraer/expandir el gráfico */}
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button onClick={toggleChartVisibility}>
            {isChartVisible ? "Contraer Gráfico" : "Expandir Gráfico"}
          </Button>
        </div>

        {/* Mostrar el gráfico solo si está expandido */}
        {isChartVisible && (
          <OrdersChart
            startDate={startDate ? startDate : "2000-01-01"} // Fecha inicial por defecto
            endDate={endDate ? endDate : new Date().toISOString().split("T")[0]} // Fecha final por defecto (hoy)
          />
        )}

        {/* Mostrar/ocultar las órdenes */}
        <ModalContent numOrders={adminOrders.length}>
          {ordersStatus === "loading" && <p>Cargando órdenes...</p>}
          {ordersStatus === "failed" && <p>{error}</p>}
          {adminOrders.map((order, index) => (
            <OrderItem key={order.id}>
              <ExpandButton onClick={() => handleOrderClick(order.id)}>
                {order.disponibilidad?.servicio?.nombre ? (
                  <>
                    {order.disponibilidad.servicio.nombre} -{" "}
                    {new Date(order.createdAt).toLocaleDateString()} - Orden #
                    {index + 1}
                  </>
                ) : (
                  <>
                    {new Date(order.createdAt).toLocaleDateString()} - Orden #
                    {index + 1}
                  </>
                )}
              </ExpandButton>
              {loadingOrderId === order.id && (
                <p>Cargando detalles de la orden...</p>
              )}
              {expandedOrderId === order.id && order.disponibilidad && (
                <OrderDetails>
                  <p>
                    <strong>Servicio:</strong>{" "}
                    {order.disponibilidad?.servicio?.nombre || "No disponible"}
                  </p>
                  <p>
                    <strong>Fecha Inicio:</strong>{" "}
                    {order.disponibilidad?.fecha_inicio
                      ? new Date(
                          order.disponibilidad.fecha_inicio
                        ).toLocaleString()
                      : "Fecha no disponible"}
                  </p>
                  <p>
                    <strong>Fecha Fin:</strong>{" "}
                    {order.disponibilidad?.fecha_fin
                      ? new Date(
                          order.disponibilidad.fecha_fin
                        ).toLocaleString()
                      : "Fecha no disponible"}
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
                    <strong>Usuario:</strong>{" "}
                    {order.user?.nombre || "No disponible"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {order.user?.email || "No disponible"}
                  </p>
                  <div>
                    <label htmlFor="status-select">Cambiar estado:</label>
                    <select
                      id="status-select"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="aprobado">Aprobado</option>
                      <option value="rechazado">Rechazado</option>
                    </select>
                    <Button onClick={() => handleStatusChange(order.id)}>
                      Actualizar Estado
                    </Button>
                  </div>
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

export default AdminOrdersModal;
