"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ContenedorContacto = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco suave */
  color: #6e5e4e; /* Marrón claro */
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContenidoContacto = styled.div`
  max-width: 1200px;
  text-align: center;
  background: rgba(255, 255, 255, 0.7); /* Fondo blanco suave */
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* Sombra suave */
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  backdrop-filter: blur(10px);
  transition: background 0.3s ease, border 0.3s ease;
`;

const EncabezadoContacto = styled.h1`
  color: #d9b3a8; /* Beige suave rosado */
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(217, 179, 168, 0.5); /* Sombra suave */
`;

const ParrafoContacto = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #6e5e4e; /* Marrón claro */
`;



const FormularioContacto = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const InputFormulario = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco claro */
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  border-radius: 5px;
  color: #6e5e4e; /* Marrón claro */
  font-size: 1rem;
  transition: border 0.3s ease, background 0.3s ease;

  &:focus {
    border-color: #d9b3a8; /* Beige suave rosado en focus */
    background: rgba(255, 255, 255, 1);
  }
`;

const TextAreaFormulario = styled.textarea`
  width: 100%;
  max-width: 500px;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco claro */
  border: 1px solid rgba(240, 240, 240, 0.6); /* Borde claro */
  border-radius: 5px;
  color: #6e5e4e; /* Marrón claro */
  font-size: 1rem;
  resize: none;
  transition: border 0.3s ease, background 0.3s ease;

  &:focus {
    border-color: #d9b3a8; /* Beige suave rosado en focus */
    background: rgba(255, 255, 255, 1);
  }
`;

const BotonEnviar = styled.button`
  padding: 0.75rem 2rem;
  background-color: #f4c2c2; /* Rosado suave */
  color: #fff; /* Texto blanco */
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f08080; /* Hover en rosa más oscuro */
    color: #fff;
  }
`;

const PaginaContacto: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const formulario = useRef<HTMLFormElement>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const enviarCorreo = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      if (formulario.current) {
        const formData = new FormData(formulario.current);

        const data = {
          from_name: formData.get("from_name"),
          user_email: formData.get("user_email"),
          message: formData.get("message"),
        };

        // Llamar a tu backend Express con la URL completa
        await axios.post(
          "http://localhost:3001/api/email/send-email",
          data
        );
        alert("¡Mensaje enviado con éxito!");
        formulario.current.reset();
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Ocurrió un error. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <ContenedorContacto>
      <ContenidoContacto>
        <EncabezadoContacto>Contáctanos</EncabezadoContacto>
        <ParrafoContacto>
          ¡Estamos aquí para ayudarte! Llena el formulario a continuación y un
          miembro de nuestro equipo se pondrá en contacto contigo lo antes
          posible.
        </ParrafoContacto>

        <FormularioContacto ref={formulario} onSubmit={enviarCorreo}>
          <InputFormulario
            type="text"
            name="from_name"
            placeholder="Tu Nombre"
            required
          />
          <InputFormulario
            type="email"
            name="user_email"
            placeholder="Tu Correo Electrónico"
            required
          />
          <TextAreaFormulario
            name="message"
            placeholder="Tu Mensaje"
            rows={6}
            required
          />
          <BotonEnviar type="submit" disabled={cargando}>
            {cargando ? "Enviando..." : "Enviar Mensaje"}
          </BotonEnviar>
        </FormularioContacto>
      </ContenidoContacto>
    </ContenedorContacto>
  );
};

export default PaginaContacto;
