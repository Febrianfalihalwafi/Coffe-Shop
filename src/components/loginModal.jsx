"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const API = "http://localhost:5000/api/auth";

export function LoginContent({ onClose }) {
  const router = useRouter();
  const { setShowLogin, login } = useCart();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setShowLogin(false);
    router.push("/signup");
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.email || !form.password) {
      setError('Email dan password harus diisi');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.msg); return; }

      login(data.user, data.token); // simpan ke context + localStorage
      setShowLogin(false);
      router.push("/menu");         // redirect setelah login
    } catch (err) {
      setError('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 relative border border-[#e8dfd4]"
    >
      {onClose && (
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
          <X size={22} />
        </button>
      )}

      <h2 className="text-2xl font-light text-[#3b2e23] mb-8 text-center tracking-wide">
        Log in to Coffee Telkom
      </h2>

      {error && (
        <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-[#f9f7f4] border border-[#e8dfd4] rounded-xl px-4 py-3 flex items-center gap-3">
          <svg width="18" height="18" fill="none" className="stroke-[#6b5640]">
            <path d="M4 4h16v12H4z" strokeWidth="1.5"/>
            <path d="M4 4l8 6 8-6" strokeWidth="1.5"/>
          </svg>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent text-sm outline-none text-[#3b2e23]"
          />
        </div>

        <div className="bg-[#f9f7f4] border border-[#e8dfd4] rounded-xl px-4 py-3 flex items-center gap-3">
          <svg width="18" height="18" fill="none" className="stroke-[#6b5640]">
            <circle cx="9" cy="6" r="4" strokeWidth="1.5"/>
            <path d="M2 16c0-4 4-7 8-7s8 3 8 7" strokeWidth="1.5"/>
          </svg>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full bg-transparent text-sm outline-none text-[#3b2e23]"
          />
        </div>
      </div>

      <div className="text-right mt-3 mb-4">
        <button className="text-[#7a5e3a] text-sm hover:underline">Forget password</button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#3b2e23] text-white py-3 rounded-xl text-sm hover:bg-[#2e241a] transition disabled:opacity-60"
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>

      <p className="text-center text-sm text-[#6d5c49] mt-4">
        Don't have an account?{" "}
        <button onClick={handleSignup} className="text-[#7a5e3a] font-medium hover:underline">
          Sign up
        </button>
      </p>

      <div className="flex items-center gap-4 my-6">
        <div className="h-px bg-[#d4c7b8] flex-1" />
        <span className="text-xs uppercase tracking-wide text-[#9b8b78]">or</span>
        <div className="h-px bg-[#d4c7b8] flex-1" />
      </div>

      <div className="space-y-3">
        <button className="w-full border border-[#ded4c7] bg-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-[#f3ece4] transition">
          <Image src="/google.png" width={20} height={20} alt="Google" />
          <span className="text-sm text-[#3b2e23]">Continue with Google</span>
        </button>
        <button className="w-full border border-[#ded4c7] bg-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-[#f3ece4] transition">
          <Image src="/github.png" width={20} height={20} alt="Github" />
          <span className="text-sm text-[#3b2e23]">Continue with Github</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function LoginModal() {
  const { showLogin, setShowLogin } = useCart();

  return (
    <AnimatePresence>
      {showLogin && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowLogin(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <LoginContent onClose={() => setShowLogin(false)} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
