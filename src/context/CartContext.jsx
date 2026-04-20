"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

// 🔹 Menu items (tidak diubah)
export const menuItems = [
  {
    id: 1,
    name: "Espresso",
    price: 25000,
    desc: "Pure black coffee with a bold, intense flavor and sharp aroma.",
    fullDesc:
      "Our classic espresso is extracted from premium Arabica beans with a medium-dark roast. Each shot produces a rich golden crema, with notes of dark chocolate, roasted nuts, and a hint of caramel. Perfect for those seeking an instant energy boost with authentic Italian flavor.",
    image: "/espresso.jpg",
    category: "Hot",
    features: [
      "100% Arabica Single Origin",
      "25-30 second extraction for optimal flavor",
      "No added sugar",
      "Perfect base for other coffee drinks",
    ],
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 28000,
    desc: "Classic combination of espresso, steamed milk, and velvety foam.",
    fullDesc:
      "A traditional cappuccino with the perfect ratio: 1/3 espresso, 1/3 steamed milk, and 1/3 velvety microfoam. Our foam is crafted using a special steaming technique for a velvet-like texture that blends harmoniously with the coffee's flavor. Chocolate or cinnamon dusting available upon request.",
    image: "/cappucino.jpeg",
    category: "Hot",
    features: [
      "Fresh, pasteurized local milk",
      "Soft, stable microfoam texture",
      "Customizable: extra shot, less foam, or dairy-free",
      "Complimentary chocolate/cinnamon dusting",
    ],
  },
  {
    id: 3,
    name: "Latte",
    price: 30000,
    desc: "Smooth espresso blended with creamy steamed milk.",
    fullDesc:
      "Our latte offers the perfect balance between rich espresso and creamy steamed milk. With a milk-dominant ratio, it's ideal for those who enjoy a smooth, mellow coffee taste that still shines through. The silky texture and warm milk aroma make every sip soothing — like a warm hug in the morning.",
    image: "/latte.jpg",
    category: "Hot",
    features: [
      "Perfectly balanced milk & coffee ratio",
      "Milk steamed to the ideal 60-65°C",
      "Choose oat, almond, or soy milk",
      "Optional: vanilla, hazelnut, or caramel syrup",
    ],
  },
  {
    id: 4,
    name: "Cold Brew",
    price: 33000,
    desc: "Slow-steeped cold coffee with a smooth, refreshing taste.",
    fullDesc:
      "Our Cold Brew undergoes a cold extraction process for 12-16 hours at room temperature. This method yields a coffee with low acidity, naturally sweeter flavor, and an exceptionally smooth texture. Without excessive bitterness, it's best enjoyed black or with a little ice & sugar. A refreshing sensation that keeps you coming back!",
    image: "/coldbrew.jpeg",
    category: "Cold",
    features: [
      "12+ hour cold extraction process",
      "Low acidity, gentle on sensitive stomachs",
      "Naturally sweet without added sugar",
      "Higher caffeine content for long-lasting energy",
    ],
  },
  {
    id: 5,
    name: "Iced Latte",
    price: 30000,
    desc: "A chilled take on the classic latte — refreshing and creamy.",
    fullDesc:
      "The Iced Latte brings the freshness of a classic latte in a chilled serving. Freshly pulled espresso is poured over cold milk and ice cubes, creating an appealing layered look before stirring. It remains creamy and rich, but with a refreshing cool sensation — the perfect choice for hot afternoons or post-activity recovery.",
    image: "/iced-latte.jpg",
    category: "Cold",
    features: [
      "Freshly pulled espresso",
      "Premium creamy cold milk",
      "Customizable ice level: less ice / no ice",
      "Add flavored syrup at no extra charge",
    ],
  },
  {
    id: 6,
    name: "Matcha Latte",
    price: 33000,
    desc: "Premium Japanese matcha blended with fresh milk — calm & cozy.",
    fullDesc:
      "Our Matcha Latte uses ceremonial-grade matcha powder from Uji, Japan, traditionally whisked until finely frothed. Paired with creamy steamed milk, this drink offers a distinct umami flavor, a touch of natural sweetness, and a calming grassy aroma. Rich in antioxidants and L-Theanine for calm focus without the jitters.",
    image: "/matcha-latte.jpg",
    category: "Non-Coffee",
    features: [
      "Ceremonial-grade matcha from Uji, Japan",
      "Gentle caffeine boost, ideal for afternoon relaxation",
      "Rich in antioxidants & L-Theanine",
      "Easily made vegan with plant-based milk",
    ],
  },
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  // ✅ HELPER: Pastikan hanya 1 modal auth yang terbuka
  const openLogin = () => {
    setShowSignup(false); // Tutup signup jika terbuka
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false); // Tutup login jika terbuka
    setShowSignup(true);
  };

  const closeAuthModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  // Baca token dari localStorage setelah mount
  useEffect(() => {
    const savedToken = localStorage.getItem("ct_token");
    const savedUser = localStorage.getItem("ct_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setMounted(true);
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("ct_token", jwt);
    localStorage.setItem("ct_user", JSON.stringify(userData));
    closeAuthModals(); // ✅ Tutup modal setelah login sukses
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    localStorage.removeItem("ct_token");
    localStorage.removeItem("ct_user");
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((x) => x.id === item.id);
      if (exist)
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x,
        );
      return [...prev, { ...item, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQuantity = (itemId, change) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== itemId) return item;
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        })
        .filter(Boolean),
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        showCart,
        setShowCart,
        showLogin,
        setShowLogin,
        showSignup,
        setShowSignup,
        // ✅ Tambahkan helper functions ke context
        openLogin,
        openSignup,
        closeAuthModals,
        totalItems,
        totalPrice,
        user,
        token,
        login,
        logout,
        mounted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}
