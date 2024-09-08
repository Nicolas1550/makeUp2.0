import { Providers } from "@/redux/provider";
import { AuthInitializer } from "@/redux/authInitializer"; 
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
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
