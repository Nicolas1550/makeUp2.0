import React, { useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Disponibilidad } from "@/app/types/types";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
} from "../services&Calendar/modalStyled/modalStyled";
import { showAuthModal } from "@/redux/features/ui/uiSlice";
import { checkAuthentication } from "@/redux/features/auth/authSlice";

interface ReserveModalProps {
  disponibilidad: Disponibilidad;
  isOpen: boolean;
  onClose: () => void;
  closeParentModal: () => void;
}

const ReserveModal: React.FC<ReserveModalProps> = ({
  disponibilidad,
  isOpen,
  onClose,
  closeParentModal,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuthentication());
    }
  }, [isAuthenticated, dispatch]);

  const handleConfirmReserve = async () => {
    if (!isAuthenticated || !user) {
      dispatch(showAuthModal("login"));
      closeParentModal();
      return;
    }

    try {
      const total = disponibilidad.servicio_precio;
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found.");
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        alert("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(showAuthModal("login"));
        closeParentModal();
        return;
      }

      // Realiza la reserva, ya no guardamos el response ya que no lo usamos
      await axios.post(
        "https://makeupbackend2-0.onrender.com/api/orders",
        {
          user_id: user.id,
          disponibilidad_id: disponibilidad.id,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Reserva realizada con éxito.");
      onClose();
    } catch (error: unknown) {
      console.error(
        "Error realizando la reserva:",
        (error as Error).message || "Error desconocido"
      );

      if (axios.isAxiosError(error) && error.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        alert(
          "Error realizando la reserva. Por favor, inicia sesión nuevamente."
        );
        dispatch(showAuthModal("login"));
      }

      closeParentModal();
    }
  };

  const numOrders = disponibilidad.numOrders || 0;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <ModalHeader>Confirmar Reserva</ModalHeader>
        <ModalContent numOrders={numOrders}>
          <p>Servicio: {disponibilidad.servicio_nombre}</p>
          <p>
            Fecha Inicio:{" "}
            {new Date(disponibilidad.fecha_inicio).toLocaleString()}
          </p>
          <p>
            Fecha Fin: {new Date(disponibilidad.fecha_fin).toLocaleString()}
          </p>
          <p>Precio: ${disponibilidad.servicio_precio}</p>
        </ModalContent>
        <ModalActions>
          <Button onClick={handleConfirmReserve}>Confirmar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ReserveModal;
