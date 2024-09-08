import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalActions,
  Button,
  ModalContent,
  OrderDetails,
  OrderItem,
  ExpandButton,
  StatusLabel,
  StatusSelectContainer,
  StatusSelect,
  StatusOption,
} from "./ordersModalStyled";
import { ModalHeader } from "../modal/modalStyled";
import OrdersChart from "./ordersChart";
import { useOrdersModalLogic } from "./useOrdersModalLogic";

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}

const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
}) => {
  const {
    orders,
    ordersStatus,
    error,
    expandedOrderId,
    selectedStatus,
    isChartVisible,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setSelectedStatus,
    handleOrderClick,
    handleStatusChange,
    toggleChartVisibility,
    loadingOrderId,
  } = useOrdersModalLogic(isAdmin, isOpen);

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          {isAdmin ? "Órdenes Administrativas" : "Órdenes"}
        </ModalHeader>

        {isAdmin && (
          <>
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

            <div style={{ textAlign: "center", margin: "10px 0" }}>
              <Button onClick={toggleChartVisibility}>
                {isChartVisible ? "Contraer Gráfico" : "Expandir Gráfico"}
              </Button>
            </div>

            {isChartVisible && (
              <OrdersChart startDate={startDate} endDate={endDate} />
            )}
          </>
        )}

        <ModalContent numOrders={orders.length}>
          {ordersStatus === "loading" && <p>Cargando órdenes...</p>}
          {ordersStatus === "failed" && <p>{error}</p>}
          {orders.map((order, index) => {
            return (
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
                {expandedOrderId === order.id && (
                  <OrderDetails>
                    <p>
                      <strong>Servicio:</strong>{" "}
                      {order.disponibilidad?.servicio?.nombre ||
                        "No disponible"}
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
                      <strong>Estado:</strong>{" "}
                      <StatusLabel status={order.status}>
                        {order.status}
                      </StatusLabel>
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
              </OrderItem>
            );
          })}
        </ModalContent>

        <ModalActions>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default OrdersModal;
