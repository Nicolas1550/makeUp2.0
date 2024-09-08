import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #f8f9fa;
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #444;
  }

  th {
    background-color: #ffd700;
    color: #1c1c1c;
    text-transform: uppercase;
  }

  td {
    background-color: #333;
    color: #f8f9fa;
  }
`;

export const ActionButton = styled.button`
  background-color: #ffd700;
  color: #1c1c1c;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #e5c200;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;
