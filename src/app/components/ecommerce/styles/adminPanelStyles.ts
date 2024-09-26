import styled from "styled-components";

// Refactorización del contenedor de la tabla
export const TableWrapper = styled.div`
  width: 100%;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco con opacidad */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Sombra suave */
  color: #1c1c1c; /* Color de texto oscuro */
  backdrop-filter: blur(5px); /* Efecto de desenfoque suave */
  border: 1px solid rgba(240, 240, 240, 0.7); /* Borde claro */

  @media (max-width: 768px) {
    padding: 1rem; /* Ajuste de padding en dispositivos pequeños */
  }
`;

// Refactorización de la tabla de productos
export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid rgba(200, 200, 200, 0.3); /* Líneas de división claras */
  }

  th {
    background-color: #f4c2c2; /* Color rosado suave */
    color: #1c1c1c; /* Texto oscuro */
    text-transform: uppercase;
    font-weight: bold;
  }

  td {
    background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco con transparencia */
    color: #6e5e4e; /* Marrón claro */
    font-size: 1rem;
  }

  tbody {
    display: block;
    max-height: 400px;
    overflow-y: auto; 
    width: 100%;
  }

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 0.5rem; /* Reducción del padding en dispositivos móviles */
      font-size: 0.9rem;
    }
  }
`;

// Refactorización del botón de acción
export const ActionButton = styled.button`
  background-color: #f4c2c2; /* Rosado suave */
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f08080; /* Hover en rosa más oscuro */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 500px) {
    padding: 0.5rem 1rem; /* Ajuste del padding en dispositivos pequeños */
  }
`;
