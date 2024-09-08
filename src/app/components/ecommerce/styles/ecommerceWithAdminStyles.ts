import styled from "styled-components";

export const AdminButton = styled.button`
  background-color: #ffd700;
  color: #1c1c1c;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #e5c200;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;

export const ModalContainer = styled.div`
  padding: 2.5rem;
  background: linear-gradient(145deg, #1a1a1a, #333333);
  color: #f8f9fa;
  border-radius: 12px;
  max-width: 1200px;
  margin: 3rem auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #444;
  }

  th {
    background-color: #ffd700;
    color: #1c1c1c;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  tr {
    transition: background-color 0.2s ease;
  }

  tr:nth-child(even) {
    background-color: #2a2a2a;
  }

  tr:hover {
    background-color: #333;
  }

  td {
    background-color: #1f1f1f;
  }
`;

export const TableWrapper = styled.div`
  max-height: 500px; /* Altura máxima para la tabla */
  overflow-y: auto; /* Añadir scroll vertical cuando se excede la altura */
  margin-bottom: 1.5rem;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); /* Sombra interna para el scroll */

  /* Personalización de la barra de desplazamiento */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #2a2a2a; /* Fondo de la barra */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffd700; /* Color de la barra */
    border-radius: 10px;
    border: 3px solid #2a2a2a; /* Espacio entre la barra y el borde */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #e5c200; /* Color de la barra al hacer hover */
  }
`;

export const ActionButton = styled.button`
  background-color: #ffd700;
  color: #1c1c1c;
  padding: 0.4rem 0.7rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #e5c200;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const Input = styled.input`
  color: #1c1c1c;
  background-color: #f8f9fa;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #333;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #ffd700;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
`;

export const Textarea = styled.textarea`
  color: #1c1c1c;
  background-color: #f8f9fa;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #333;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;

  &:focus {
    border-color: #ffd700;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
`;
