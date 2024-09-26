import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAdminOrders,
  selectAdminOrders,
} from "@/redux/features/orders/ordersSlice";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface OrdersChartProps {
  startDate: string;
  endDate: string;
}

const OrdersChart: React.FC<OrdersChartProps> = ({ startDate, endDate }) => {
  const dispatch = useAppDispatch();
  const adminOrders = useAppSelector(selectAdminOrders);
  const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null);

  useEffect(() => {
    if (adminOrders.length === 0) {
      dispatch(fetchAdminOrders());
    }
  }, [dispatch, adminOrders.length]);

  useEffect(() => {
    if (adminOrders.length > 0) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const filteredOrders = adminOrders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate >= start &&
          orderDate <= end &&
          (order.status === "pendiente" || order.status === "aprobado")
        );
      });

      const allOrders =
        startDate === endDate
          ? adminOrders.filter(
              (order) =>
                order.status === "pendiente" || order.status === "aprobado"
            )
          : filteredOrders;

      const pendingOrders = allOrders.filter(
        (order) => order.status === "pendiente"
      );
      const approvedOrders = allOrders.filter(
        (order) => order.status === "aprobado"
      );

      const labels = allOrders.map((order) =>
        new Date(order.createdAt).toLocaleDateString()
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Pendiente",
            data: pendingOrders.map((order) => order.total),
            backgroundColor: "#FFCE56",
          },
          {
            label: "Aprobado",
            data: approvedOrders.map((order) => order.total),
            backgroundColor: "#36A2EB",
          },
        ],
      });
    }
  }, [adminOrders, startDate, endDate]);

  return chartData ? (
    <div>
      <h2>Evolución de Órdenes</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Órdenes desde ${startDate} hasta ${endDate}`,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Fecha",
              },
            },
            y: {
              title: {
                display: true,
                text: "Monto Total",
              },
            },
          },
        }}
      />
    </div>
  ) : (
    <p>Cargando datos...</p>
  );
};

export default OrdersChart;
