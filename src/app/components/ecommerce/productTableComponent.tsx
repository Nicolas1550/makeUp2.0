import React, { useEffect, useState } from "react";
import {
  ActionButton,
  Input,
  ProductTable,
  SelectWrapper,
  StyledOption,
  StyledSelect,
  TableWrapper,
  Textarea,
} from "./styles/ecommerceWithAdminStyles";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSearchTerm,
  selectSearchTerm,
  selectFilteredProducts,
} from "@/redux/features/productsFilterSlice/FilterSlice";
import { Product } from "@/redux/features/cart/cartSlice";
import Image from "next/image";

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

interface EditableProduct extends Product {
  imageFile?: File;
  brand: string;
  color: string;
  category: string;
}

interface ProductTableProps {
  products: Product[];  // Ya existente
  editingProductId: number | null;
  editedProduct: Partial<EditableProduct>;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  onSaveProduct: (formData: FormData) => void;
  onCancelEdit: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; // Agregar esta línea
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Componente para resaltar el término de búsqueda
const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>; // Si no hay texto de búsqueda, devolver el texto completo

  const parts = text.split(new RegExp(`(${highlight})`, 'gi')); // Dividir el texto en partes

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: "#ffd700", fontWeight: "bold" }}>{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};

const ProductTableComponent: React.FC<ProductTableProps> = ({
  editingProductId,
  editedProduct,
  onEditProduct,
  onDeleteProduct,
  onSaveProduct,
  onCancelEdit,
}) => {
  const dispatch = useAppDispatch();

  // Obtener el término de búsqueda del estado
  const searchTerm = useAppSelector(selectSearchTerm);

  // Obtener los productos filtrados según el término de búsqueda
  const products = useAppSelector(selectFilteredProducts);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [localEditedProduct, setLocalEditedProduct] = useState<Partial<EditableProduct>>(editedProduct);

  useEffect(() => {
    setLocalEditedProduct(editedProduct);
    if (editedProduct.imageFileName) {
      setImagePreview(
        `http://localhost:3001/uploads/images/${editedProduct.imageFileName}`
      );
    } else {
      setImagePreview(null);
    }
  }, [editedProduct]);
  

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setLocalEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setLocalEditedProduct((prevProduct) => ({
        ...prevProduct,
        imageFile: file,
      }));
    }
  };

  const handleSaveClick = () => {
    if (editingProductId) {
      const formData = new FormData();
      formData.append("name", localEditedProduct.name || "");
      formData.append("price", localEditedProduct.price?.toString() || "0");
      formData.append("quantity", localEditedProduct.quantity?.toString() || "0");
      formData.append("description", localEditedProduct.description || "");  // Asegúrate de que la descripción se añada aquí
      formData.append("brand", localEditedProduct.brand || "");
      formData.append("color", localEditedProduct.color || "");
      formData.append("category", localEditedProduct.category || "");
  
      if (localEditedProduct.imageFile) {
        formData.append("image", localEditedProduct.imageFile);
      }
  
      onSaveProduct(formData);  // Envía el FormData con la descripción
    }
  };
  
  

  // Función para manejar el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value)); // Actualizar el término de búsqueda en el estado
  };

  return (
    <TableWrapper>
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos por nombre"
        value={searchTerm} // Vincular al estado del término de búsqueda
        onChange={handleSearchChange} // Controlar los cambios en el input
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%", color: "#000" }} // Color negro en el input
      />

      <ProductTable>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Marca</th>
            <th>Color</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              {editingProductId === product.id ? (
                <>
                  <td>
                    <Input
                      type="text"
                      name="name"
                      value={localEditedProduct.name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="price"
                      value={localEditedProduct.price?.toString() || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="quantity"
                      value={localEditedProduct.quantity?.toString() || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <SelectWrapper>
                      <StyledSelect
                        name="brand"
                        value={localEditedProduct.brand || ""}
                        onChange={handleInputChange}
                        required
                      >
                        {marcaOptions.map((option) => (
                          <StyledOption key={option.value} value={option.value}>
                            {option.label}
                          </StyledOption>
                        ))}
                      </StyledSelect>
                    </SelectWrapper>
                  </td>
                  <td>
                    <SelectWrapper>
                      <StyledSelect
                        name="color"
                        value={localEditedProduct.color || ""}
                        onChange={handleInputChange}
                        required
                      >
                        {colorOptions.map((option) => (
                          <StyledOption key={option.value} value={option.value}>
                            {option.label}
                          </StyledOption>
                        ))}
                      </StyledSelect>
                    </SelectWrapper>
                  </td>

                  <td>
                    <Input
                      type="text"
                      name="category"
                      value={localEditedProduct.category || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt={localEditedProduct.name || "Producto"}
                        width={50}
                        height={50}
                        style={{
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                      />
                    ) : (
                      product.imageFileName && (
                        <Image
                          src={`http://localhost:3001/uploads/images/${product.imageFileName}`}
                          alt={product.name}
                          width={50}
                          height={50}
                          style={{
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                          }}
                        />
                      )
                    )}
                    <Input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ marginTop: "10px" }}
                    />
                  </td>
                  <td>
                    <Textarea
                      name="description"
                      value={localEditedProduct.description ?? ""}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </td>
                  <td>
                    <ActionButton
                      onClick={handleSaveClick}
                      style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                    >
                      Guardar
                    </ActionButton>
                    <ActionButton
                      onClick={onCancelEdit}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                    >
                      Cancelar
                    </ActionButton>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <HighlightedText text={product.name} highlight={searchTerm} />
                  </td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.brand}</td>
                  <td>{product.color}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.imageFileName && (
                      <Image
                        src={`http://localhost:3001/uploads/images/${product.imageFileName}`}
                        alt={product.name}
                        width={50}
                        height={50}
                        style={{
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        }}
                      />
                    )}
                  </td>
                  <td>{product.description || ""}</td>
                  <td>
                    <ActionButton
                      onClick={() => onEditProduct(product)}
                      style={{ backgroundColor: "#2196F3", color: "#fff" }}
                    >
                      Editar
                    </ActionButton>
                    <ActionButton
                      onClick={() => onDeleteProduct(product.id)}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                    >
                      Eliminar
                    </ActionButton>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </ProductTable>
    </TableWrapper>
  );
};

export default ProductTableComponent;
