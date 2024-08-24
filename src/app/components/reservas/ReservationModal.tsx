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
    console.log("ReserveModal mounted. Checking authentication status...");
    if (!isAuthenticated) {
      dispatch(checkAuthentication());
    }
  }, [isAuthenticated, dispatch]);

  const handleConfirmReserve = async () => {
    console.log("Confirming reservation...");
    if (!isAuthenticated || !user) {
      console.log("User not authenticated. Opening login modal...");
      dispatch(showAuthModal("login"));
      closeParentModal();
      return;
    }

    try {
      const total = disponibilidad.servicio_precio;
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found. User is not authenticated.");
        throw new Error("Token not found.");
      }

      // Verificar expiración del token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        console.error("Token has expired");
        alert("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(showAuthModal("login"));
        closeParentModal();
        return;
      }

      console.log("Token is valid:", token);

      // Agregando log para verificar las cabeceras
      console.log("Sending request with headers:", {
        Authorization: `Bearer ${token}`,
      });

      const response = await axios.post(
        "http://localhost:3001/api/orders",
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

      console.log("Reservation successful:", response.data);
      alert("Reserva realizada con éxito.");
      onClose();
    } catch (error: any) {
      console.error(
        "Error realizando la reserva:",
        error.response || error.message
      );

      // Manejo de error más amigable
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Mensaje amigable si la reserva ya está tomada
      } else {
        alert(
          "Error realizando la reserva. Por favor, inicia sesión nuevamente."
        );
        dispatch(showAuthModal("login"));
      }

      closeParentModal();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <ModalHeader>Confirmar Reserva</ModalHeader>
        <ModalContent>
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
