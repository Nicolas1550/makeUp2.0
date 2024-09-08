import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createProductOrder,
  createProductOrderMercadoPago,
  OrderCreationPayload,
} from "@/redux/features/productOrder/productOrderSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import emailjs from "emailjs-com"; 
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress"; 
import {
  ButtonGroup,
  ModalHeader,
  StyledButton,
  StyledModalContainer,
  StyledTextField,
} from "./checkoutStyles";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const user = useAppSelector((state) => state.auth.user); 
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("local_pickup");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const [errors, setErrors] = useState({
    phoneNumber: "",
    address: "",
    city: "",
    paymentProof: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const validatePhoneNumber = (phone: string) => {
    if (!/^\d{10,15}$/.test(phone)) {
      return "El número de teléfono debe tener entre 10 y 15 dígitos.";
    }
    return "";
  };

  const validateAddress = (address: string) => {
    if (shippingMethod === "delivery" && !address) {
      return "La dirección es requerida para envío a domicilio.";
    }
    return "";
  };

  const validateCity = (city: string) => {
    if (shippingMethod === "delivery" && !city) {
      return "La ciudad es requerida para envío a domicilio.";
    }
    return "";
  };

  const handleNextStep = () => {
    const phoneError = validatePhoneNumber(phoneNumber);
    const addressError = validateAddress(address);
    const cityError = validateCity(city);

    if (phoneError || addressError || cityError) {
      setErrors({
        phoneNumber: phoneError,
        address: addressError,
        city: cityError,
        paymentProof: errors.paymentProof,
      });
      return;
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const sendConfirmationEmail = (orderData: any) => {
    if (!user) return; 

    const userTemplateParams = {
      from_name: "Tu Tienda",
      to_name: user.nombre, 
      message: `Gracias por tu compra. Número de orden: ${orderData.id}, Total: ${orderData.total}`,
      user_email: user.email, 
    };

    const seoTemplateParams = {
      from_name: "Tu Tienda",
      to_name: "SEO Empresa",
      message: `Nueva compra realizada por ${user.nombre}. Número de orden: ${orderData.id}, Total: ${orderData.total}`,
      user_email: "luciuknicolas15@gmail.com", 
    };

    // Enviar el email al usuario
    emailjs
      .send(
        "service_mwmmqvd", 
        "template_n3xuwgd", 
        userTemplateParams,
        "R93T5B0hw-lOz08xE" 
      )
      .then(() => {
      })
      .catch((error) => {
        console.error("Error al enviar el correo al usuario:", error);
      });

    // Enviar el email al SEO
    emailjs
      .send(
        "service_mwmmqvd", 
        "template_n3xuwgd", 
        seoTemplateParams,
        "R93T5B0hw-lOz08xE" 
      )
      .then(() => {
      })
      .catch((error) => {
        console.error("Error al enviar el correo al SEO:", error);
      });
  };

  const handlePlaceOrder = () => {
    // Verificar que el usuario esté definido
    if (!user) return;
  
    const phoneError = validatePhoneNumber(phoneNumber);
    if (phoneError) {
      setErrors({ ...errors, phoneNumber: phoneError });
      return;
    }
  
    if (paymentMethod === "deposito" && !paymentProof) {
      setErrors({
        ...errors,
        paymentProof: "Debe subir un comprobante de pago.",
      });
      return;
    }
  
    setIsLoading(true); 
  
    // Si el método de pago es "mercadopago"
    if (paymentMethod === "mercadopago") {
      const orderData: OrderCreationPayload = {
        user_id: Number(user.id), 
        phone_number: phoneNumber,
        total: total,
        products: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        shipping_method: shippingMethod,
        address: shippingMethod === "delivery" ? address : undefined,
        city: shippingMethod === "delivery" ? city : undefined,
        payment_method: paymentMethod,
        status: "pendiente",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      dispatch(createProductOrderMercadoPago(orderData)).then((result) => {
        setIsLoading(false); 
        if (createProductOrderMercadoPago.fulfilled.match(result)) {
          const redirectUrl = result.payload as string;
          window.location.href = redirectUrl;
        } else {
          console.error(
            "Error al crear la orden con Mercado Pago:",
            result.payload
          );
        }
      });
    }
  
    // Si el método de pago es "deposito"
    else if (paymentMethod === "deposito") {
      const orderData = new FormData();
      orderData.append("user_id", user.id.toString()); 
      orderData.append("phone_number", phoneNumber);
      orderData.append("total", total.toString());
      orderData.append("shipping_method", shippingMethod);
      orderData.append("address", shippingMethod === "delivery" ? address : "");
      orderData.append("city", shippingMethod === "delivery" ? city : "");
      orderData.append("payment_method", paymentMethod);
      orderData.append("status", "pendiente");
      orderData.append("createdAt", new Date().toISOString());
      orderData.append("updatedAt", new Date().toISOString());
  
      cartItems.forEach((item, index) => {
        orderData.append(`products[${index}][id]`, item.id.toString());
        orderData.append(
          `products[${index}][quantity]`,
          item.quantity.toString()
        );
      });
  
      if (paymentProof) {
        orderData.append("payment_proof", paymentProof);
      }
  
      dispatch(createProductOrder(orderData)).then((result) => {
        setIsLoading(false); 
        if (createProductOrder.fulfilled.match(result)) {
          dispatch(clearCart()); 
          onClose(); 
          sendConfirmationEmail(result.payload); 
        } else {
          console.error("Error al confirmar la orden:", result.payload);
        }
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPaymentProof(e.target.files[0]);
      setErrors({ ...errors, paymentProof: "" }); 
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalContainer>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
            <p>Procesando tu orden, por favor espera...</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div>
                <ModalHeader>Seleccionar método de envío</ModalHeader>
                <StyledTextField
                  select
                  label="Método de Envío"
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="local_pickup">Retirar en el local</MenuItem>
                  <MenuItem value="delivery">Envío a domicilio</MenuItem>
                </StyledTextField>

                {shippingMethod === "delivery" && (
                  <>
                    <StyledTextField
                      label="Dirección"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                      margin="normal"
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                    <StyledTextField
                      label="Ciudad"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      fullWidth
                      margin="normal"
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </>
                )}

                <StyledTextField
                  label="Número de Teléfono"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />

                <ButtonGroup>
                  <StyledButton onClick={handleNextStep}>
                    Siguiente
                  </StyledButton>
                </ButtonGroup>
              </div>
            )}

            {step === 2 && (
              <div>
                <ModalHeader>Método de Pago</ModalHeader>
                <StyledTextField
                  select
                  label="Método de Pago"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="deposito">Transferencia</MenuItem>
                  <MenuItem value="mercadopago">Mercado Pago</MenuItem>
                </StyledTextField>

                {paymentMethod === "deposito" && (
                  <>
                    <p>Datos bancarios para transferencia:</p>
                    <p>Banco: Banco Ejemplo</p>
                    <p>CBU: 1234567890123456789012</p>
                    <p>Alias: alias.ejemplo</p>
                    <StyledTextField
                      type="file"
                      onChange={handleFileChange}
                      fullWidth
                      margin="normal"
                      error={!!errors.paymentProof}
                      helperText={errors.paymentProof}
                    />
                  </>
                )}

                <ButtonGroup>
                  <StyledButton onClick={handlePreviousStep}>
                    Anterior
                  </StyledButton>
                  <StyledButton onClick={handlePlaceOrder}>
                    Confirmar Orden
                  </StyledButton>
                </ButtonGroup>
              </div>
            )}
          </>
        )}
      </StyledModalContainer>
    </Modal>
  );
};

export default CheckoutModal;
