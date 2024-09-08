import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Estilos personalizados utilizando styled-components
export const StyledModalContainer = styled.div`
  padding: 2.5rem;
  background: linear-gradient(145deg, #1a1a1a, #333333);
  color: #f8f9fa;
  border-radius: 12px;
  max-width: 500px;
  margin: 5rem auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  }
`;

export const ModalHeader = styled.h2`
  margin-bottom: 1.5rem;
  color: #ffd700;
  text-align: center;
`;

export const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #f8f9fa;
    color: #1c1c1c;
  }

  & .MuiInputLabel-root {
    color: #ffd700;
  }

  & .MuiInput-underline:before {
    border-bottom-color: #ffd700;
  }

  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom-color: #e5c200;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const StyledButton = styled(Button)`
  background-color: #ffd700 !important;
  color: #1c1c1c !important;
  padding: 0.6rem 1.2rem !important;
  border-radius: 8px !important;
  font-weight: bold !important;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;

  &:hover {
    background-color: #e5c200 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4) !important;
  }
`;