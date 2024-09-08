"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/product/productSlice";

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #ffd700;
  margin-bottom: 2rem;
  text-transform: uppercase;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
`;

const Button = styled.button`
  background-color: #ffd700;
  color: #1c1c1c;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
  &:hover {
    background-color: #e5c200;
  }
`;

const AddProductForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  color: black;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #333;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  color: black;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #333;
  border-radius: 5px;
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
`;

const AdminProductManager: React.FC = () => {
  const dispatch = useAppDispatch();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <FileInput type="file" name="image" onChange={handleFileChange} />
        <Button type="submit">Agregar Producto</Button>
      </AddProductForm>
    </div>
  );
};

export default AdminProductManager;
