"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/orders", label: "Orders" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { cart, setShowLogin, setShowCart, user, logout, mounted } =
    useCart();

  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/register";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="fixed top-0 left-0 w-full flex justify-between items-center px-2 md:px-12 py-3 text-[#4b3b2a] uppercase tracking-wide text-sm font-medium z-20 bg-[#faf7f3]/80 backdrop-blur-sm border-b border-[#e6e1da]"
    >
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-5">
        <Image
          src="/Logo-Telu-Coffee-new.png"
          alt="Coffee Telkom Logo"
          width={36}
          height={36}
          priority
        />
        <span className="font-semibold tracking-[0.2em] text-[#3b2e23]">
          Coffee Telkom
        </span>
      </Link>

      {/* NAV LINKS */}
      <div className="hidden md:flex gap-8">

        {/* MENU UTAMA */}
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="relative group px-4 py-2 transition-all duration-300 hover:text-[#7a5e3a]"
          >
            {label}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#7a5e3a] transform transition-transform origin-left
              ${pathname === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
          </Link>
        ))}

        {/* ADMIN LINK (HANYA ADMIN) */}
        {mounted && user?.role === "admin" && (
          <Link
            href="/admin/orders"
            className="relative group px-4 py-2 transition-all duration-300 hover:text-[#7a5e3a]"
          >
            Admin
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#7a5e3a] transform transition-transform origin-left
              ${pathname === "/admin/orders" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
          </Link>
        )}

      </div>

      {/* ICONS */}
      <div className="flex items-center gap-6 text-[#4b3b2a]">

        {mounted &&
          (user ? (
            // ✅ SUDAH LOGIN
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-xs tracking-widest text-[#7a5e3a] normal-case">
                Hi, {user.name?.split(" ")[0] || "Coffee Lover"}
              </span>

              <button
                onClick={logout}
                className="flex items-center gap-2 hover:text-red-500 transition-all duration-300"
              >
                <LogOut size={18} />
                <span className="hidden md:inline text-xs tracking-widest">
                  Logout
                </span>
              </button>
            </div>
          ) : !isAuthPage ? (
            // ❌ BELUM LOGIN
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 hover:text-[#7a5e3a]"
            >
              <User size={18} />
              <span className="hidden md:inline text-xs tracking-widest">
                Login
              </span>
            </button>
          ) : null)}

        {/* CART */}
        <button
          onClick={() => setShowCart(true)}
          className="flex items-center gap-2 relative hover:text-[#7a5e3a]"
        >
          <ShoppingCart size={18} />

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#3b2e23] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}

          <span className="hidden md:inline text-xs tracking-widest">
            Cart
          </span>
        </button>

      </div>
    </motion.nav>
  );
}