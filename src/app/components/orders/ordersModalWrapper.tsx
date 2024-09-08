import React, { useEffect } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalActions,
  Button,
} from "../services&Calendar/modalStyled/modalStyled";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchOrders,
  fetchAdminOrders,
  getOrdersStatus,
  getOrdersError,
} from "@/redux/features/orders/ordersSlice";

import { ModalHeader } from "../modal/modalStyled";
import OrdersModal from "./ordersModal";

interface OrdersModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean; 
}

const OrdersModalWrapper: React.FC<OrdersModalWrapperProps> = ({
  isOpen,
  onClose,
  isAdmin,
}) => {
  const dispatch = useAppDispatch();
  const ordersStatus = useAppSelector(getOrdersStatus);
  const error = useAppSelector(getOrdersError);

  useEffect(() => {
    if (isOpen && ordersStatus === "idle") {
      if (isAdmin) {
        dispatch(fetchAdminOrders());
      } else {
        dispatch(fetchOrders());
      }
    }
  }, [isOpen, ordersStatus, dispatch, isAdmin]);

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          {isAdmin ? "Órdenes Administrativas" : "Órdenes"}
        </ModalHeader>
        <OrdersModal isOpen={isOpen} onClose={onClose} isAdmin={isAdmin} />
        <ModalActions>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default OrdersModalWrapper;
