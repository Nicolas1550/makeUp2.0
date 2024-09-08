import React, { useEffect, useState } from "react";
import {
  ActionButton,
  Input,
  ProductTable,
  TableWrapper,
  Textarea,
} from "./styles/ecommerceWithAdminStyles";
import { Product } from "@/redux/features/cart/cartSlice";
import Image from "next/image"; 

interface EditableProduct extends Product {
  imageFile?: File;
}

interface ProductTableProps {
  products: Product[];
  editingProductId: number | null;
  editedProduct: Partial<EditableProduct>;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  onSaveProduct: (formData: FormData) => void;
  onCancelEdit: () => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductTableComponent: React.FC<ProductTableProps> = ({
  products,
  editingProductId,
  editedProduct,
  onEditProduct,
  onDeleteProduct,
  onSaveProduct,
  onCancelEdit,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [localEditedProduct, setLocalEditedProduct] = useState<Partial<EditableProduct>>(editedProduct);

  // Sincroniza el estado local con el global cuando se cambia el producto editado
  useEffect(() => {
    setLocalEditedProduct(editedProduct);
    if (editedProduct.imageFileName) {
      setImagePreview(`http://localhost:3001/uploads/images/${editedProduct.imageFileName}`);
    } else {
      setImagePreview(null);
    }
  }, [editedProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      formData.append("description", localEditedProduct.description || "");

      if (localEditedProduct.imageFile) {
        formData.append("image", localEditedProduct.imageFile);
      }

      onSaveProduct(formData);
    }
  };

  return (
    <TableWrapper>
      <ProductTable>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
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
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
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

