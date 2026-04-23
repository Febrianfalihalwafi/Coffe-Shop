"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useCart } from "@/context/CartContext";

const API = "http://localhost:5000/api/auth";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function SignupContent({ onClose }) {
  const router = useRouter();
  const { login } = useCart();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (document.getElementById('google-gsi-script')) return;
    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const getPasswordStrength = (password) => {
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim()) { setError("Please enter your full name"); return; }
    if (!form.email.trim()) { setError("Please enter your email"); return; }
    if (!validateEmail(form.email)) { setError("Please enter a valid email"); return; }
    if (!form.password) { setError("Please create a password"); return; }
    if (form.password.length < 6) { setError("Password must be 6+ characters"); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.msg || "Registration failed"); return; }

      onClose?.();
      router.push("/login");
    } catch {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

 const handleGoogle = () => {
  setError("");

  // Tunggu sampai google script benar-benar siap
  const tryGoogle = (attempts = 0) => {
    if (!window.google?.accounts?.oauth2) {
      if (attempts > 10) {
        setError("Google belum siap, refresh halaman dan coba lagi");
        return;
      }
      setTimeout(() => tryGoogle(attempts + 1), 300);
      return;
    }

    setGoogleLoading(true);
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          setError("Login Google gagal: " + tokenResponse.error);
          setGoogleLoading(false);
          return;
        }
        try {
          const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          const userInfo = await userInfoRes.json();

          const res = await fetch(`${API}/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
              email: userInfo.email,
              name: userInfo.name,
              googleId: userInfo.sub,
            }),
          });
          const data = await res.json();
          if (!res.ok) { setError(data.msg); return; }
          login(data.user, data.token);
          onClose?.();           // ganti closeAuthModals() untuk loginModal
          router.push("/menu");
        } catch {
          setError("Login Google gagal");
        } finally {
          setGoogleLoading(false);
        }
      },
    });

    client.requestAccessToken();
  };

  tryGoogle();
};

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative border border-[#e8dfd4] max-h-[80vh] flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-[#7a5e3a] to-[#5d4a2f] px-5 py-4 text-center relative flex-shrink-0">
        {onClose && (
          <motion.button onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute top-3 right-3 text-[#3d3226] hover:text-[#5d4a2f]">
            <X size={16} />
          </motion.button>
        )}
        <h2 className="text-base font-light text-white tracking-wide">Register Coffee Telkom</h2>
      </div>

      <div className="p-5 overflow-y-auto flex-1">
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-xs text-red-700">
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b8b78]" />
            <input type="text" placeholder="Full name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-[#faf7f3] border border-[#e8dfd4] rounded-lg text-xs outline-none focus:border-[#7a5e3a] focus:bg-white transition"
            />
          </div>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b8b78]" />
            <input type="email" placeholder="Email address" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-[#faf7f3] border border-[#e8dfd4] rounded-lg text-xs outline-none focus:border-[#7a5e3a] focus:bg-white transition"
            />
          </div>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b8b78]" />
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-9 pr-9 py-2.5 bg-[#faf7f3] border border-[#e8dfd4] rounded-lg text-xs outline-none focus:border-[#7a5e3a] focus:bg-white transition"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b8b78]">
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b8b78]" />
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-9 pr-9 py-2.5 bg-[#faf7f3] border border-[#e8dfd4] rounded-lg text-xs outline-none focus:border-[#7a5e3a] focus:bg-white transition"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b8b78]">
              {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {form.password && (
            <div className="flex gap-0.5 h-0.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex-1 rounded-full ${passwordStrength === "weak" && i === 1 ? "bg-red-400" : passwordStrength === "medium" && i <= 2 ? "bg-yellow-400" : passwordStrength === "strong" ? "bg-green-400" : "bg-[#e8dfd4]"}`} />
              ))}
            </div>
          )}
        </div>

        <motion.button onClick={handleSubmit} disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full mt-5 bg-[#7a5e3a] text-white py-2.5 rounded-lg text-xs font-medium hover:bg-[#5d4a2f] transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Account"}
        </motion.button>

        <p className="text-center text-[10px] text-[#6d5c49] mt-4">
          Have an account?{" "}
          <a href="/login" onClick={(e) => { e.preventDefault(); onClose?.(); router.push("/login"); }} className="text-[#7a5e3a] font-semibold hover:underline">
            Log in
          </a>
        </p>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-[#e8dfd4] flex-1" />
          <span className="text-[9px] text-[#9b8b78] uppercase">or</span>
          <div className="h-px bg-[#e8dfd4] flex-1" />
        </div>

        {/* Google Button */}
        <motion.button
          onClick={handleGoogle}
          disabled={googleLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full border border-[#e8dfd4] bg-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#faf7f3] transition disabled:opacity-60 mb-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-xs text-[#3b2e23]">
            {googleLoading ? "Menghubungkan..." : "Continue with Google"}
          </span>
        </motion.button> 

        <p className="text-center text-[9px] text-[#9b8b78] mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-[#7a5e3a] hover:underline">Terms</a> &{" "}
          <a href="#" className="text-[#7a5e3a] hover:underline">Privacy</a>
        </p>
      </div>
    </motion.div>
  );
}

export default function SignupModal() {
  const { showSignup, setShowSignup } = useCart();

  return (
    <AnimatePresence>
      {showSignup && (
        <motion.div
          className="fixed inset-0 bg-[#2c231a]/50 backdrop-blur-[2px] flex items-start justify-center z-[60] pt-12 pb-4 overflow-y-auto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setShowSignup(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full px-3">
            <SignupContent onClose={() => setShowSignup(false)} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
