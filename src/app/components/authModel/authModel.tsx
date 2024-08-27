"use client";
import React, { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import {
  loginUser,
  registerUser,
  clearError,
  setAuthStateFromClient,
  checkAuthentication,
} from "@/redux/features/auth/authSlice";
import { hideAuthModal, setAuthModalMode } from "@/redux/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import dynamic from "next/dynamic";
import {
  Modal,
  ModalContent,
  ModalClose,
  Field,
  Label,
  Input,
  Button,
  Error,
} from "./AuthModalStyled";

const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector(
    (state: RootState) => state.ui.isAuthModalVisible
  );
  const modalMode = useAppSelector(
    (state: RootState) => state.ui.authModalMode
  );
  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const error = useAppSelector((state: RootState) => state.auth.error);
  const status = useAppSelector((state: RootState) => state.auth.status);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const isLogin = modalMode === "login";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ nombre, email, password }));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuthentication());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    let user = null;
    if (userString) {
      try {
        user = JSON.parse(userString);
      } catch (error) {
        console.error("Invalid user JSON:", error);
        user = null;
      }
    }
    const isAuthenticated = !!token;
    dispatch(setAuthStateFromClient({ isAuthenticated, user }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(hideAuthModal());
    } else if (status === "failed" && error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [status, dispatch, error]);

  useEffect(() => {
    if (!showModal) {
      setEmail("");
      setPassword("");
      setNombre("");
      dispatch(clearError());
    }
  }, [showModal, dispatch]);

  const toggleAuthMode = () => {
    // Cambia solo el modo sin cerrar el modal
    dispatch(setAuthModalMode(isLogin ? "register" : "login"));
  };

  return (
    <Modal $show={showModal}>
      <ModalContent $show={showModal}>
        <ModalClose onClick={() => dispatch(hideAuthModal())}>
          &times;
        </ModalClose>
        <h1>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h1>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <Field>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              autoComplete="email"
            />
            <Label className={email ? "filled" : ""}>Correo Electrónico</Label>
          </Field>
          <Field>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              autoComplete="current-password"
            />
            <Label className={password ? "filled" : ""}>Contraseña</Label>
          </Field>
          {!isLogin && (
            <Field>
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder=" "
                autoComplete="name"
              />
              <Label className={nombre ? "filled" : ""}>Nombre</Label>
            </Field>
          )}
          {error && (
            <Error>
              {typeof error === "object"
                ? Object.values(error).join(", ")
                : error}
            </Error>
          )}
          <div className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
          </div>
          <div className="mt-4">
            <Button type="button" onClick={toggleAuthMode}>
              {isLogin ? "Ir a Registrarse" : "Ir a Iniciar Sesión"}
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default dynamic(() => Promise.resolve(AuthModal), { ssr: false });
