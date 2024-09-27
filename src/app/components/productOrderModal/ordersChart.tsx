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
import styled from "styled-components";

// Estilos personalizados

const FormContainer = styled.div`
  margin-top: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #f4c2c2 !important; /* Botón rosado */
  color: #1c1c1c !important;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f08080 !important; /* Hover en rosado oscuro */
  }
`;

const ChartContainer = styled.div`
  margin-top: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

// Estilos personalizados para TextFields
const textFieldStyles = {
  "& .MuiInputBase-root": {
    color: "black", 
    fontWeight: "bold",
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
      borderColor: "#f4c2c2", 
    },
  },
  input: { color: "black" }, 
};


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

// Define el tipo de datos para el gráfico
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}

const OrdersChart: React.FC<{ showChart: boolean }> = ({ showChart }) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllProductOrders);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleFetchOrders = useCallback(async () => {
    setLoading(true);
    await dispatch(fetchProductOrders());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (showChart) {
      handleFetchOrders();
    }
  }, [showChart, handleFetchOrders]);

  const generateChartData = useCallback(() => {
    const ordersByDate: { [key: string]: number } = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const date = orderDate.toLocaleDateString();

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
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <FormContainer>
      <InputWrapper>
        <TextField
          label="Fecha de Inicio"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={textFieldStyles}
        />
        <TextField
          label="Fecha de Fin"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={textFieldStyles}
        />
        <StyledButton variant="contained" onClick={handleFilter}>
          Filtrar
        </StyledButton>
      </InputWrapper>
      {chartData && (
        <ChartContainer>
          <Line data={chartData} />
        </ChartContainer>
      )}
    </FormContainer>
  );
};

export default OrdersChart;
