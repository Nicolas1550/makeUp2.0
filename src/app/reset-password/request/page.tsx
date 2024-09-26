"use client";
import React, { useState } from "react";
import axios from "axios";
// Eliminamos 'useRouter' ya que no se está utilizando
import {
  FormContainer,
  FormField,
  FormTitle,
  Input,
  Button,
  Spinner,
  SuccessMessage,
  ErrorMessage,
} from "@/app/components/requestStyles/RequestResetPasswordStyled";

const RequestResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await axios.post("https://makeupbackend2-0.onrender.com/api/password/request-reset-password", {
        email,
      });

      setMessage("Revisa tu correo electrónico para las instrucciones de recuperación.");
      setEmail("");
    } catch {
      setError("No pudimos encontrar una cuenta con ese correo electrónico.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Solicitar restablecimiento de contraseña</FormTitle>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="email">Correo electrónico</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingresa tu correo electrónico"
          />
        </FormField>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Enviar"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default RequestResetPassword;
