import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  fetchProductOrders,
  selectAllProductOrders,
} from "@/redux/features/productOrder/productOrderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField, Button } from "@mui/material";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrdersChart: React.FC<{ showChart: boolean }> = ({ showChart }) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllProductOrders);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>(""); 
  const [endDate, setEndDate] = useState<string>(""); 

  // Crear handleFetchOrders con useCallback para evitar que cambie entre renderizados
  const handleFetchOrders = useCallback(async () => {
    setLoading(true);
    await dispatch(fetchProductOrders());
    setLoading(false);
  }, [dispatch]); 

  // Solo llama a fetch cuando el componente es mostrado (showChart es true)
  useEffect(() => {
    if (showChart) {
      handleFetchOrders();
    }
  }, [showChart, handleFetchOrders]); 

  // Esta función se encarga de generar los datos del gráfico
  const generateChartData = useCallback(() => {
    const ordersByDate: { [key: string]: number } = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const date = orderDate.toLocaleDateString();

      // Filtrar por rango de fechas
      if (
        (!startDate || orderDate >= new Date(startDate)) &&
        (!endDate || orderDate <= new Date(endDate))
      ) {
        if (ordersByDate[date]) {
          ordersByDate[date] += 1;
        } else {
          ordersByDate[date] = 1;
        }
      }
    });

    const labels = Object.keys(ordersByDate);
    const data = Object.values(ordersByDate);

    setChartData({
      labels,
      datasets: [
        {
          label: "Número de órdenes",
          data,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    });
  }, [orders, startDate, endDate]);

  // Regenerar el gráfico cada vez que las órdenes cambian o se aplica un filtro
  useEffect(() => {
    if (orders.length > 0) {
      generateChartData();
    }
  }, [orders, startDate, endDate, generateChartData]);

  const handleFilter = () => {
    generateChartData(); 
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Fecha de Inicio"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              color: "white",
              fontWeight: "bold",
              borderColor: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: { color: "white" },
          }}
        />
        <TextField
          label="Fecha de Fin"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              color: "white",
              fontWeight: "bold",
              borderColor: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            input: { color: "white" },
          }}
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filtrar
        </Button>
      </div>
      {chartData && <Line data={chartData} />} {/* Renderiza el gráfico solo si hay datos */}
    </div>
  );
};

export default OrdersChart;
