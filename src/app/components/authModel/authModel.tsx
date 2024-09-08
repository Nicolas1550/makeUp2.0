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
  FormRow,
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
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [passwordError, setPasswordError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);  
  const [isLoggingIn, setIsLoggingIn] = useState(false);  

  const isLogin = modalMode === "login";  

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);  
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);  

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      setIsRegistering(false); // Resetear el estado de registro
      return;
    }
    setPasswordError("");

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("telefono", telefono);
    if (foto) {
      formData.append("foto", foto);
    }

    dispatch(registerUser(formData));
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
    // Solo cambiar a "login" después de un registro exitoso
    if (status === "succeeded" && isRegistering) {
      dispatch(setAuthModalMode("login"));  
      setIsRegistering(false);  
    } else if (status === "failed" && error) {
      setTimeout(() => {
        dispatch(clearError());
        setIsRegistering(false);  // Resetear estado de registro si falla
      }, 3000);
    }

    if (status === "succeeded" && isLogin && isLoggingIn) {
      dispatch(hideAuthModal());
      setIsLoggingIn(false);  
    }
  }, [status, dispatch, error, modalMode, isRegistering, isLoggingIn, isLogin]);

  useEffect(() => {
    if (!showModal) {
      setEmail("");
      setPassword("");
      setConfirmPassword(""); 
      setNombre("");
      setApellido("");
      setTelefono("");
      setFoto(null);
      dispatch(clearError());
    }
  }, [showModal, dispatch]);

  // Alternar entre el modo de login y registro
  const toggleAuthMode = () => {
    setIsLoggingIn(false);  
    if (modalMode === "login") {
      dispatch(setAuthModalMode("register"));
    } else {
      dispatch(setAuthModalMode("login"));
    }
  };

  return (
    <Modal $show={showModal}>
      <ModalContent $show={showModal}>
        <ModalClose onClick={() => {
          dispatch(hideAuthModal());
        }}>
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
              required
            />
            <Label className={email ? "filled" : ""}>Correo Electrónico</Label>
          </Field>

          <Field>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              autoComplete="new-password"
              required
            />
            <Label className={password ? "filled" : ""}>Contraseña</Label>
          </Field>

          {!isLogin && ( // Mostrar estos campos solo en el modo de registro
            <>
              <Field>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder=" "
                  autoComplete="new-password"
                  required
                />
                <Label className={confirmPassword ? "filled" : ""}>
                  Confirmar Contraseña
                </Label>
              </Field>
              <Error>{passwordError}</Error>

              <FormRow>
                <Field>
                  <Input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder=" "
                    autoComplete="name"
                    required
                  />
                  <Label className={nombre ? "filled" : ""}>Nombre</Label>
                </Field>

                <Field>
                  <Input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder=" "
                    autoComplete="family-name"
                    required
                  />
                  <Label className={apellido ? "filled" : ""}>Apellido</Label>
                </Field>
              </FormRow>

              <Field>
                <Input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder=" "
                  autoComplete="tel"
                  required
                />
                <Label className={telefono ? "filled" : ""}>Teléfono</Label>
              </Field>

              <Field>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFoto(e.target.files ? e.target.files[0] : null)
                  }
                />
                <Label className={foto ? "filled" : ""}>
                  Foto de Perfil (opcional)
                </Label>
              </Field>
            </>
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
