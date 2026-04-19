import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/navbar";
import CartModal from "@/components/cartModal";
import LoginModal from "@/components/loginModal";
import SignupModal from "@/components/signupModal";
import Script from "next/script";

export const metadata = {
  title: "Coffee Telkom",
  description: "Modern Coffee • Innovation • Connection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Midtrans Snap SDK — sandbox */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
        <CartProvider>
          <Navbar />
          {children}
          <CartModal />
          <LoginModal />
          <SignupModal />
        </CartProvider>
      </body>
    </html>
  );
}
