import { Providers } from "@/redux/provider";
import { AuthInitializer } from "@/redux/authInitializer";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

export const metadata = {
  title: "💇‍♀️ Salon de Belleza - Gestión Online 💻",
  description:
    "Bienvenido/a al **Salon de Belleza**, una plataforma completa para gestionar servicios de peluquería, reservas en línea, productos, empleados, y mucho más. Este sistema es ideal para salones de belleza que buscan optimizar su flujo de trabajo tanto para los clientes como para los administradores.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Inicializa la autenticación al montar el Provider */}
          <AuthInitializer />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
