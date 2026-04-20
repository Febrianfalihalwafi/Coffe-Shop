"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X, Mail, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";

const API = "http://localhost:5000/api/auth";

export function LoginContent({ onClose }) {
  const router = useRouter();
  // ✅ Ambil closeAuthModals dari context
  const { closeAuthModals, login } = useCart();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    // ✅ Tutup login, buka signup via router
    closeAuthModals();
    router.push("/signup");
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Email dan password harus diisi");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg);
        return;
      }

      login(data.user, data.token); // simpan ke context + localStorage
      closeAuthModals(); // ✅ Pakai helper context
      router.push("/menu"); // redirect setelah login
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      // ✅ Animasi match signup modal
      initial={{ scale: 0.95, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      // ✅ Card styling + CSS fix untuk glitch
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative border border-[#e8dfd4] max-h-[80vh] flex flex-col"
      // 🎨 CSS fix: cegah render glitch / efek miring
      style={{
        transform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
      }}
    >
      {/* ✅ Header dengan gradient coffee theme */}
      <div className="bg-gradient-to-br from-[#7a5e3a] to-[#5d4a2f] px-5 py-4 text-center relative flex-shrink-0">
        {onClose && (
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 text-[#3d3226] hover:text-[#5d4a2f]"
          >
            <X size={16} />
          </motion.button>
        )}
        <h2 className="text-base font-light text-[#ffffff] tracking-wide">
          Log in to Coffee Telkom
        </h2>
      </div>

      {/* ✅ Scrollable form container */}
      <div className="p-5 overflow-y-auto flex-1">
        {/* ✅ Error message dengan animation */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-xs text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          {/* ✅ Email Input */}
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b8b78]"
            />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-9 pr-3 py-2.5 bg-[#faf7f3] border border-[#e8dfd4] rounded-lg text-xs outline-none focus:border-[#7a5e3a] focus:bg-white transition"
            />
          </div>

          {/* ✅ Password Input */}
          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b8b78]"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-9 pr-3 py-2.5 bg-[#faf7f3] border border-[#e8dfd4] rounded-lg text-xs outline-none focus:border-[#7a5e3a] focus:bg-white transition"
            />
          </div>
        </div>

        {/* ✅ Forgot Password */}
        <div className="text-right mt-2">
          <button className="text-[10px] text-[#7a5e3a] hover:underline">
            Forgot password?
          </button>
        </div>

        {/* ✅ Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full mt-5 bg-[#7a5e3a] text-white py-2.5 rounded-lg text-xs font-medium hover:bg-[#5d4a2f] transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </motion.button>

        {/* ✅ Signup Link */}
        <p className="text-center text-[10px] text-[#6d5c49] mt-4">
          Don't have an account?{" "}
          <button
            onClick={handleSignup}
            className="text-[#7a5e3a] font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>

        {/* ✅ Divider "or" */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-[#e8dfd4] flex-1" />
          <span className="text-[9px] text-[#9b8b78] uppercase">or</span>
          <div className="h-px bg-[#e8dfd4] flex-1" />
        </div>

        {/* ✅ Social Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {/* Google Button */}
          <button className="border border-[#e8dfd4] bg-white py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#faf7f3] transition">
            {/* Google SVG Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-[10px] text-[#3b2e23]">Google</span>
          </button>

          {/* GitHub Button */}
          <button className="border border-[#e8dfd4] bg-white py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#faf7f3] transition">
            {/* GitHub SVG Logo */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-[10px] text-[#3b2e23]">GitHub</span>
          </button>
        </div>

        {/* ✅ Terms */}
        <p className="text-center text-[9px] text-[#9b8b78] mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#7a5e3a] hover:underline">
            Terms
          </a>{" "}
          &{" "}
          <a href="#" className="text-[#7a5e3a] hover:underline">
            Privacy
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default function LoginModal() {
  // ✅ Ambil showLogin dan closeAuthModals dari context
  const { showLogin, closeAuthModals } = useCart();

  return (
    <AnimatePresence>
      {showLogin && (
        // ✅ Modal backdrop + CSS fix untuk glitch visual
        <motion.div
          className="fixed inset-0 bg-[#2c231a]/50 backdrop-blur-[2px] flex items-start justify-center z-[60] pt-12 pb-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModals}
          // 🎨 CSS fix: cegah efek miring/blur pada backdrop
          style={{
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            isolation: "isolate",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full px-3"
            // 🎨 CSS fix tambahan untuk container card
            style={{
              transform: "translateZ(0)",
              perspective: "1000px",
            }}
          >
            {/* ✅ Pass closeAuthModals sebagai onClose */}
            <LoginContent onClose={closeAuthModals} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
