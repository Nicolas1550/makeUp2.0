import styled from "styled-components";

export const UserServiceManagementContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(28, 28, 28, 0.9);
  border-radius: 10px;
  border: 1px solid rgba(244, 194, 194, 0.3); /* Borde rosado suave */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h2`
  color: #f4c2c2; /* Rosado suave */
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border-radius: 5px;
  border: 1px solid rgba(244, 194, 194, 0.3); /* Borde rosado suave */
  background-color: #1c1c1c;
  color: #f8f9fa;
`;

export const UserTableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #f4c2c2 rgba(28, 28, 28, 0.9); /* Scroll rosado suave */
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

export const TableHeader = styled.th`
  background-color: #333;
  color: #f4c2c2; /* Texto rosado suave */
  padding: 1rem;
  text-transform: uppercase;
`;

export const TableCell = styled.td`
  background-color: #1c1c1c;
  color: #f8f9fa;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(244, 194, 194, 0.3); /* Borde rosado suave */
`;

export const AssignButton = styled.button`
  background-color: #f4c2c2; /* Fondo rosado suave */
  color: #1c1c1c;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #f08080; /* Hover en rosado oscuro */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background-color: #555;
    color: #888;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4d;
  text-align: center;
  font-weight: bold;
`;

export const SelectService = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(244, 194, 194, 0.3); /* Borde rosado suave */
  background-color: #1c1c1c;
  color: #f4c2c2; /* Texto rosado suave */
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='292.362' height='292.362'%3E%3Cpath fill='%23f4c2c2' d='M287 69.34l-134 134a21.44 21.44 0 01-30.34 0L5 69.34c-8.36-8.36-8.36-21.96 0-30.34 8.36-8.36 21.96-8.36 30.34 0l119.83 119.83L256.66 39c8.36-8.36 21.96-8.36 30.34 0 8.37 8.36 8.37 21.96 0 30.34z'/%3E%3C/svg%3E");
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  background-size: 12px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: #f4c2c2;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  &:focus {
    border-color: #f4c2c2;
    outline: none;
    box-shadow: 0 6px 12px rgba(244, 194, 194, 0.5);
  }

  &::placeholder {
    color: #888;
  }
`;

export const Option = styled.option`
  background-color: #1c1c1c;
  color: #f8f9fa;
  padding: 1rem;
  font-size: 1rem;
`;
