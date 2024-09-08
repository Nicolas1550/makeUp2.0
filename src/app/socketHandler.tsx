"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  orderAdded,
  orderUpdated,
  fetchOrderById,
} from "@/redux/features/orders/ordersSlice";
import io from "socket.io-client";

export default function SocketHandler() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      withCredentials: true,
    });

    socket.on("orderCreated", (order) => {
      dispatch(orderAdded(order));
    });

    socket.on("orderUpdated", async (order) => {

      // Validar si los datos están completos
      const hasCompleteData =
        order.disponibilidad && order.disponibilidad.servicio;

      if (!hasCompleteData) {
        console.warn(
          `Orden ${order.id} no tiene disponibilidad completa, recargando...`
        );
        await dispatch(fetchOrderById(order.id));
      } else {
        dispatch(orderUpdated(order));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return null;
}
