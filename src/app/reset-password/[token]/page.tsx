"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation"; // Correcta API para obtener parámetros de la URL y redirigir
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ErrorMessage,
  FormContainer,
  FormField,
  FormTitle,
  Input,
  Spinner,
  SuccessMessage,
  PasswordContainer,
  ToggleVisibilityButton,
} from "@/app/components/requestStyles/ResetPasswordStyled";

const MIN_PASSWORD_LENGTH = 8; // Validación para la longitud de la contraseña

const ResetPassword = () => {
  const { token } = useParams(); // Obtener el token desde los parámetros de la URL
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // Para manejar la visibilidad de la contraseña
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false); // Para confirmar visibilidad
  const router = useRouter(); // Para redireccionar después de cambiar la contraseña

  useEffect(() => {
    if (!token) {
      setError("El token no es válido o ha expirado.");
    }
  }, [token]);

  // Validación de contraseña segura
  const validatePassword = (password: string) => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }
    if (!/[A-Z]/.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!/[a-z]/.test(password)) {
      return "La contraseña debe contener al menos una letra minúscula.";
    }
    if (!/[0-9]/.test(password)) {
      return "La contraseña debe contener al menos un número.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setError(passwordValidationError);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      // Llamar a la API de backend para restablecer la contraseña
      await axios.post("https://backendiaecommerce.onrender.com/api/password/reset-password", {
        token, // Utilizamos el token desde params
        newPassword,
      });

      setMessage(
        "Contraseña restablecida correctamente. Ahora puedes iniciar sesión."
      );
      setNewPassword("");
      setConfirmPassword("");

      // Redireccionar después del éxito
      setTimeout(() => {
        router.push("/login"); // Redirige a la página de inicio de sesión
      }, 2000);
    } catch (err) {
      setError("El token es inválido o ha expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Restablecer contraseña</FormTitle>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="newPassword">Nueva contraseña</label>
          <PasswordContainer>
            <Input
              type={isPasswordVisible ? "text" : "password"} // Condicional para mostrar la contraseña
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Debe tener al menos 8 caracteres"
              required
            />
            <ToggleVisibilityButton
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
            </ToggleVisibilityButton>
          </PasswordContainer>
        </FormField>
        <FormField>
          <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
          <PasswordContainer>
            <Input
              type={isConfirmPasswordVisible ? "text" : "password"} // Condicional para mostrar la contraseña
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <ToggleVisibilityButton
              type="button"
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
            >
              <FontAwesomeIcon
                icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
              />
            </ToggleVisibilityButton>
          </PasswordContainer>
        </FormField>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Restablecer Contraseña"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default ResetPassword;
