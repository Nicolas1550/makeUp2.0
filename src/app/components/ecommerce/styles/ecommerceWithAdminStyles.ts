import styled from "styled-components";

// Botón para acciones de administrador
export const AdminButton = styled.button`
  background-color: #f4c2c2; /* Rosado suave */
  color: #1c1c1c;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f08080; /* Hover en rosa más oscuro */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

// Contenedor del modal con fondo oscuro y animación
export const ModalContainer = styled.div`
  padding: 2.5rem;
  background: linear-gradient(145deg, #fff, #f9f9f9); /* Fondo blanco suave */
  color: #1c1c1c; /* Color de texto oscuro */
  border-radius: 12px;
  max-width: 1200px;
  margin: 3rem auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15); /* Sombra suave */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

// Contenedor de los botones en el modal
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
`;

// Tabla de productos con colores consistentes con el diseño general
export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid rgba(200, 200, 200, 0.3); /* Línea de división clara */
  }

  th {
    background-color: #f4c2c2; /* Rosado suave */
    color: #1c1c1c;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  tr {
    transition: background-color 0.2s ease;
  }

  tr:nth-child(even) {
    background-color: rgba(245, 245, 245, 0.7); /* Fondo claro */
  }

  tr:hover {
    background-color: #f08080; /* Fondo rosa oscuro en hover */
  }

  td {
    background-color: #f9f9f9; /* Fondo suave */
    color: #6e5e4e; /* Marrón claro */
  }
`;

// Contenedor para la tabla con barra de desplazamiento personalizada
export const TableWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f9f9f9; /* Fondo claro */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #f4c2c2; /* Rosado suave */
    border-radius: 10px;
    border: 3px solid #f9f9f9;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #f08080; /* Hover en rosado más oscuro */
  }
`;

// Botón de acción para la tabla
export const ActionButton = styled.button`
  background-color: #f4c2c2;
  color: #fff;
  padding: 0.4rem 0.7rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #f08080;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// Input estilizado
export const Input = styled.input`
  color: #6e5e4e; /* Marrón claro */
  background-color: #f9f9f9; /* Fondo claro */
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #f4c2c2;
    box-shadow: 0 0 5px rgba(244, 194, 194, 0.5);
  }
`;

// Textarea estilizado
export const Textarea = styled.textarea`
  color: #6e5e4e; /* Marrón claro */
  background-color: #f9f9f9;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;

  &:focus {
    border-color: #f4c2c2;
    box-shadow: 0 0 5px rgba(244, 194, 194, 0.5);
  }
`;

// Select estilizado con wrapper para la flecha
export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  &::after {
    content: "▼";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 14px;
    color: #333;
  }
`;

// Select estilizado
export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 40px 8px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  appearance: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #f4c2c2;
    box-shadow: 0 0 5px rgba(244, 194, 194, 0.5);
  }
`;

// Opciones del select estilizadas
export const StyledOption = styled.option`
  color: #333;
  background-color: #f9f9f9;
  font-size: 16px;
`;
