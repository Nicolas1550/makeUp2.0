"use client";
import React, { ReactNode } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
} from "./modalStyled";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  actions: { label: string; handler: () => void }[];
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children, actions }) => {
  // Si isOpen es false, el modal no se renderiza
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalActions>
          {actions.map((action, index) => (
            <Button key={index} onClick={action.handler}>
              {action.label}
            </Button>
          ))}
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

