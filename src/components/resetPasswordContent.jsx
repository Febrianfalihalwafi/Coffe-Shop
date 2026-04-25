"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const API = "http://localhost:5000/api/password";

export function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [tokenValid, setTokenValid] = useState(null);
  const [tokenMsg, setTokenMsg] = useState("");
  const [form, setForm] = useState({ newPassword: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useCart();

  useEffect(() => {
    // Auto logout saat buka halaman reset password
    logout();

    if (!token) { setTokenValid(false); setTokenMsg("Token tidak ditemukan"); return; }
    fetch(`${API}/verify-token?token=${token}`)
      .then(r => r.json())
      .then(data => { setTokenValid(data.valid); setTokenMsg(data.msg || ""); })
      .catch(() => { setTokenValid(false); setTokenMsg("Gagal verifikasi token"); });
  }, [token]);

  const handleSubmit = async () => {
    setError("");
    if (!form.newPassword) { setError("Password baru harus diisi"); return; }
    if (form.newPassword.length < 6) { setError("Password minimal 6 karakter"); return; }
    if (form.newPassword !== form.confirm) { setError("Konfirmasi password tidak cocok"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API}/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.msg); return; }
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-[#e8dfd4]"
    >
      <div className="bg-gradient-to-br from-[#7a5e3a] to-[#5d4a2f] px-5 py-5 text-center">
        <h2 className="text-base font-light text-white tracking-wide">☕ Coffee Telkom</h2>
        <p className="text-[#e8dfd4] text-xs mt-1">Reset Password</p>
      </div>

      <div className="p-6">
        {/* Loading verifikasi token */}
        {tokenValid === null && (
          <p className="text-center text-sm text-[#9b8b78] py-4">Memverifikasi link...</p>
        )}

        {/* Token tidak valid */}
        {tokenValid === false && (
          <div className="text-center py-4">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-sm text-red-600 font-medium">{tokenMsg || "Link tidak valid atau sudah kadaluarsa"}</p>
            <button onClick={() => router.push("/login")}
              className="mt-4 text-xs text-[#7a5e3a] hover:underline">
              Kembali ke Login
            </button>
          </div>
        )}

        {/* Sukses */}
        {success && (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-sm text-green-700 font-medium">Password berhasil diubah!</p>
            <p className="text-xs text-[#9b8b78] mt-2">Mengalihkan ke halaman login...</p>
          </div>
        )}

        {/* Form reset */}
        {tokenValid === true && !success && (
          <>
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="mb-4 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-xs text-red-700">
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b8b78]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password baru"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  className="w-full pl-9 pr-9 py-2.5 bg-[#faf7f3] border border-[#e8dfd4] rounded-lg text-xs outline-none focus:border-[#7a5e3a] focus:bg-white transition"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b8b78]">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b8b78]" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Konfirmasi password baru"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full pl-9 pr-9 py-2.5 bg-[#faf7f3] border border-[#e8dfd4] rounded-lg text-xs outline-none focus:border-[#7a5e3a] focus:bg-white transition"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b8b78]">
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <motion.button onClick={handleSubmit} disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full mt-5 bg-[#7a5e3a] text-white py-2.5 rounded-lg text-xs font-medium hover:bg-[#5d4a2f] transition disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Password Baru"}
            </motion.button>

            <p className="text-center mt-4">
              <button onClick={() => router.push("/login")}
                className="text-[10px] text-[#7a5e3a] hover:underline">
                Kembali ke Login
              </button>
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}