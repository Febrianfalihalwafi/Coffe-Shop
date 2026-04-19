"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const menuItems = [
  { id: 1, name: "Espresso",     price: 25000, desc: "Kopi hitam murni dengan rasa kuat dan aroma tajam.",             image: "/espresso.jpg",     category: "Hot"        },
  { id: 2, name: "Cappuccino",   price: 28000, desc: "Kombinasi espresso, susu hangat, dan foam lembut.",              image: "/cappucino.jpeg",   category: "Hot"        },
  { id: 3, name: "Latte",        price: 30000, desc: "Espresso lembut dengan susu steamed hangat.",                    image: "/latte.jpg",        category: "Hot"        },
  { id: 4, name: "Cold Brew",    price: 33000, desc: "Kopi diseduh dingin selama 12 jam, rasa halus dan menyegarkan.", image: "/coldbrew.jpeg",    category: "Cold"       },
  { id: 5, name: "Iced Latte",   price: 30000, desc: "Versi dingin dari latte — segar dan creamy.",                    image: "/iced-latte.jpg",   category: "Cold"       },
  { id: 6, name: "Matcha Latte", price: 33000, desc: "Matcha Jepang dengan susu segar — calm and cozy.",               image: "/matcha-latte.jpg", category: "Non-Coffee" },
];

export function CartProvider({ children }) {
  const [cart, setCart]             = useState([]);
  const [showCart, setShowCart]     = useState(false);
  const [showLogin, setShowLogin]   = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser]             = useState(null);
  const [token, setToken]           = useState(null);
  const [mounted, setMounted]       = useState(false);

  // Baca token dari localStorage setelah mount — fix navbar flicker
  useEffect(() => {
    const savedToken = localStorage.getItem('ct_token');
    const savedUser  = localStorage.getItem('ct_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setMounted(true);
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('ct_token', jwt);
    localStorage.setItem('ct_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    localStorage.removeItem('ct_token');
    localStorage.removeItem('ct_user');
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((x) => x.id === item.id);
      if (exist) return prev.map((x) => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x);
      return [...prev, { ...item, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQuantity = (itemId, change) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }).filter(Boolean)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, updateQuantity,
      showCart, setShowCart,
      showLogin, setShowLogin,
      showSignup, setShowSignup,
      totalItems, totalPrice,
      user, token, login, logout, mounted,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}
