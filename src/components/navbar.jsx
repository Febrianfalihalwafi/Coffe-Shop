"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/",        label: "Home"    },
  { href: "/menu",    label: "Menu"    },
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { cart, setShowLogin, setShowCart, user, logout, mounted } = useCart();
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-12 py-6 text-[#4b3b2a] uppercase tracking-wide text-sm font-medium z-20 bg-[#faf7f3]/80 backdrop-blur-sm border-b border-[#e6e1da]"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image src="/Logo-Telu-Coffee-new.png" alt="Coffee Telkom Logo" width={36} height={36} priority className="object-contain" />
        <span className="font-semibold tracking-[0.2em] text-[#3b2e23]">Coffee Telkom</span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="relative group px-4 py-2 transition-all duration-300 hover:text-[#7a5e3a]">
            {label}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#7a5e3a] transform transition-transform origin-left
              ${pathname === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
          </Link>
        ))}
      </div>

      {/* Icons — tunggu mounted agar tidak flicker */}
      <div className="flex items-center gap-6 text-[#4b3b2a]">
        {mounted && (
          user ? (
            // Sudah login
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-xs tracking-widest text-[#7a5e3a] normal-case">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 hover:text-red-500 transition-all duration-300"
              >
                <LogOut size={18} />
                <span className="hidden md:inline text-xs tracking-widest">Logout</span>
              </button>
            </div>
          ) : (
            // Belum login
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 hover:text-[#7a5e3a] transition-all duration-300"
            >
              <User size={18} />
              <span className="hidden md:inline text-xs tracking-widest">Login</span>
            </button>
          )
        )}

        {/* Cart */}
        <button
          onClick={() => setShowCart(true)}
          className="flex items-center gap-2 hover:text-[#7a5e3a] transition-all duration-300 relative"
        >
          <ShoppingCart size={18} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#3b2e23] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
          <span className="hidden md:inline text-xs tracking-widest">Cart</span>
        </button>
      </div>
    </motion.nav>
  );
}
