"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/product/productSlice";

// Opciones para el selector de colores y marcas
const colorOptions = [
  { value: "", label: "Selecciona un color" },
  { value: "Blanco", label: "Blanco" },
  { value: "Negro", label: "Negro" },
  { value: "Nude", label: "Nude" },
  { value: "Rojo", label: "Rojo" },
  { value: "Rosa", label: "Rosa" },
  { value: "Azul", label: "Azul" },
  { value: "Marron", label: "Marron" },
];

const marcaOptions = [
  { value: "", label: "Selecciona una marca" },
  { value: "Ruby Rous", label: "Ruby Rous" },
  { value: "Natacha nina", label: "Natacha nina" },
  { value: "Idraet", label: "Idraet" },
  { value: "Prodermic", label: "Prodermic" },
  { value: "Liderma", label: "Liderma" },
];


// Título de sección con estilo coherente al navbar
export const SectionTitle = styled.h2`
  font-size: 2.5rem; /* Tamaño de texto mayor para énfasis */
  font-weight: bold;
  text-align: center;
  color: #f4c2c2; /* Rosado suave */
  margin-bottom: 2rem;
  text-transform: uppercase;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); /* Sombra más suave */
`;

// Botón con colores coherentes al navbar
export const Button = styled.button`
  background-color: #f4c2c2; /* Rosado suave */
  color: #1c1c1c;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f08080; /* Hover en rosado más oscuro */
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Formulario de agregar producto con diseño centrado
export const AddProductForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco con transparencia */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Estilo del input coherente al navbar
export const Input = styled.input`
  color: #1c1c1c;
  background-color: #f9f9f9;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #f4c2c2;
    box-shadow: 0 0 5px rgba(244, 194, 194, 0.5);
  }
`;

// Estilo del textarea coherente al navbar
export const TextArea = styled.textarea`
  color: #1c1c1c;
  background-color: #f9f9f9;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: vertical;

  &:focus {
    border-color: #f4c2c2;
    box-shadow: 0 0 5px rgba(244, 194, 194, 0.5);
  }
`;

// Input de archivo
export const FileInput = styled.input`
  margin-bottom: 1rem;
`;

// Contenedor del select con flecha estilizada
export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;

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

// Select estilizado con colores coherentes
export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 40px 8px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  appearance: none;
  color: #1c1c1c;
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

const AdminProductManager: React.FC = () => {
  const dispatch = useAppDispatch();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    brand: "",    // Nuevo campo para la marca
    color: "",    // Nuevo campo para el color
    category: "", // Nuevo campo para la categoría
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("quantity", newProduct.quantity);
    formData.append("description", newProduct.description);
    formData.append("brand", newProduct.brand);
    formData.append("color", newProduct.color);
    formData.append("category", newProduct.category);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }
    await dispatch(addProduct(formData));
  };

  return (
    <div>
      <SectionTitle>Agregar Producto</SectionTitle>
      <AddProductForm onSubmit={handleAddProduct}>
        <Input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          value={newProduct.quantity}
          onChange={handleInputChange}
          required
        />
        <TextArea
          name="description"
          placeholder="Descripción del producto"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        
        {/* Selector de Marca */}
        <SelectWrapper>
          <StyledSelect
            name="brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            required
          >
            {marcaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
        </SelectWrapper>

        {/* Selector de Color */}
        <SelectWrapper>
          <StyledSelect
            name="color"
            value={newProduct.color}
            onChange={handleInputChange}
            required
          >
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
        </SelectWrapper>

        <Input
          type="text"
          name="category"
          placeholder="Categoría"
          value={newProduct.category}
          onChange={handleInputChange}
          required
        />
        <FileInput type="file" name="image" onChange={handleFileChange} />
        <Button type="submit">Agregar Producto</Button>
      </AddProductForm>
    </div>
  );
};

export default AdminProductManager;
