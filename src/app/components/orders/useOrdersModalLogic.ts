import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchOrders,
  fetchAdminOrders,
  fetchOrderById,
  getOrdersError,
  getOrdersStatus,
  selectAllOrders,
  selectAdminOrders,
  updateOrderStatus,
} from "@/redux/features/orders/ordersSlice";

export const useOrdersModalLogic = (isAdmin: boolean, isOpen: boolean) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(isAdmin ? selectAdminOrders : selectAllOrders);
  const ordersStatus = useAppSelector(getOrdersStatus);
  const error = useAppSelector(getOrdersError);

  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("pendiente");
  const [isChartVisible, setIsChartVisible] = useState<boolean>(false);
  const [loadingOrderId, setLoadingOrderId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Cargar las órdenes al abrir el modal
  useEffect(() => {
    if (isOpen && ordersStatus === "idle") {
      if (isAdmin) {
        dispatch(fetchAdminOrders());
      } else {
        dispatch(fetchOrders());
      }
    }
  }, [isOpen, ordersStatus, dispatch, isAdmin]);

  const handleOrderClick = async (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null); 
    } else {
      setExpandedOrderId(orderId); 
      if (isAdmin) setIsChartVisible(false); 
      setLoadingOrderId(orderId);

      const order = orders.find((o) => o.id === orderId);


      if (!order || !order.disponibilidad || !order.user) {
        await dispatch(fetchOrderById(orderId));
      }

      setLoadingOrderId(null); 
    }
  };

  // Cambiar el estado de la orden y recargar los detalles de la orden
  const handleStatusChange = async (orderId: number) => {
    try {
      setLoadingOrderId(orderId); 
      const result = await dispatch(
        updateOrderStatus({ orderId, status: selectedStatus })
      );

      if (updateOrderStatus.fulfilled.match(result)) {
        // Recargar los detalles completos de la orden después de cambiar el estado
        await dispatch(fetchOrderById(orderId));

        // Forzar la re-renderización de la orden expandida
        setExpandedOrderId(null);
        setTimeout(() => {
          setExpandedOrderId(orderId);
        }, 0);
      } else {
        console.error("Error al actualizar el estado de la orden:", result);
      }

      setLoadingOrderId(null); 
    } catch (error) {
      console.error("Error al cambiar el estado de la orden:", error);
      setLoadingOrderId(null); 
    }
  };

  const toggleChartVisibility = () => {
    setIsChartVisible(!isChartVisible);
    setExpandedOrderId(null); 
  };

  // Recargar los datos de la orden si está expandida
  useEffect(() => {
    if (expandedOrderId !== null) {
      dispatch(fetchOrderById(expandedOrderId)).then((action) => {
        if (fetchOrderById.fulfilled.match(action)) {
          const updatedOrder = orders.find(
            (o) => o.id === expandedOrderId
          );

          // Verifica si los datos en el store se reflejan correctamente
          if (!updatedOrder || !updatedOrder.disponibilidad || !updatedOrder.user) {
            console.error("Data missing after reload:", updatedOrder);
          } else {
          }
        } else {
          console.error("Failed to reload order details for order ID:", expandedOrderId);
        }
      });
    }
  }, [expandedOrderId, dispatch, orders]);

  return {
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
  };
};
