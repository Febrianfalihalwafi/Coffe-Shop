"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
=======
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { menuItems } from "@/context/CartContext";
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf

const API = "http://localhost:5000/api";

export function CartContent({ onClose }) {
  const { cart, addToCart, updateQuantity, user, token, setShowLogin } = useCart();
  const router = useRouter();
<<<<<<< HEAD
  const [menuItems, setMenuItems] = useState([]);

  // ── FETCH MENU DARI DATABASE ─────────────────────────
  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setMenuItems(data); })
      .catch(() => {});
  }, []);

  const handleCheckout = async () => {
=======

  const handleCheckout = async () => {
    // Belum login — arahkan ke login dulu
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
    if (!user || !token) {
      onClose?.();
      setShowLogin(true);
      return;
    }

    if (cart.length === 0) return;

    try {
<<<<<<< HEAD
      const orderRes = await fetch(`${API}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
=======
      // 1. Buat order — kirim items dengan name, price, quantity (tanpa productId)
      const orderRes = await fetch(`${API}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const order = await orderRes.json();
      if (!orderRes.ok) {
<<<<<<< HEAD
        alert(order.msg || "Gagal membuat order");
        return;
      }

      const payRes = await fetch(`${API}/payment/midtrans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
=======
        alert(order.msg || 'Gagal membuat order');
        return;
      }

      // 2. Buat transaksi Midtrans
      const payRes = await fetch(`${API}/payment/midtrans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
        },
        body: JSON.stringify({ orderId: order._id }),
      });

      const payData = await payRes.json();
      if (!payRes.ok) {
<<<<<<< HEAD
        alert(payData.msg || "Gagal membuat pembayaran");
        return;
      }

      if (window.snap) {
        window.snap.pay(payData.token, {
          onSuccess: () => { onClose?.(); router.push("/"); },
          onPending: () => { onClose?.(); },
          onError: () => alert("Pembayaran gagal"),
          onClose: () => {},
        });
      } else {
        window.location.href = payData.redirect_url;
      }
    } catch (err) {
      alert("Gagal terhubung ke server");
=======
        alert(payData.msg || 'Gagal membuat pembayaran');
        return;
      }

      // 3. Buka Midtrans Snap
      if (window.snap) {
        window.snap.pay(payData.token, {
          onSuccess: () => { onClose?.(); router.push('/'); },
          onPending: () => { onClose?.(); },
          onError: () => alert('Pembayaran gagal'),
          onClose: () => {},
        });
      } else {
        // Fallback: redirect ke URL Midtrans
        window.location.href = payData.redirect_url;
      }
    } catch (err) {
      alert('Gagal terhubung ke server');
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
    }
  };

  return (
<<<<<<< HEAD
    <div className="bg-white w-full sm:w-96 h-screen shadow-2xl flex flex-col">

      {/* Header */}
=======
    // Fix masalah 3: h-screen + flex flex-col agar footer tidak terdorong
    <div className="bg-white w-full sm:w-96 h-screen shadow-2xl flex flex-col">

      {/* Header — fixed di atas */}
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
      <div className="flex justify-between items-center px-6 py-5 border-b border-[#e6e1da] shrink-0">
        <h3 className="text-xl font-semibold text-[#3b2e23]">Your Cart</h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        )}
      </div>

<<<<<<< HEAD
      {/* Body */}
=======
      {/* Body — scrollable, mengisi ruang yang tersisa */}
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

        {/* Items di keranjang */}
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          <>
            <h4 className="text-sm font-medium text-[#3b2e23] mb-2">In Your Cart</h4>
<<<<<<< HEAD
            {cart.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="text-sm font-medium text-[#3b2e23]">{item.name}</h4>
                    <p className="text-xs text-gray-500">
                      Rp{Number(item.price).toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(itemId, -1)}
                      className="w-6 h-6 flex items-center justify-center border rounded-md text-stone-600 hover:bg-stone-100"
                    >-</button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(itemId, 1)}
                      className="w-6 h-6 flex items-center justify-center border rounded-md text-stone-600 hover:bg-stone-100"
                    >+</button>
                    <p className="font-semibold ml-1 text-[#3b2e23] text-sm">
                      Rp{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
=======
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <h4 className="text-sm font-medium text-[#3b2e23]">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    Rp{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center border rounded-md text-stone-600 hover:bg-stone-100"
                  >-</button>
                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center border rounded-md text-stone-600 hover:bg-stone-100"
                  >+</button>
                  <p className="font-semibold ml-1 text-[#3b2e23] text-sm">
                    Rp{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
          </>
        )}

        {/* Add More Items */}
        <div className="pt-4">
          <h4 className="text-sm font-medium text-[#3b2e23] mb-3">Add More Items</h4>
          <div className="space-y-3">
            {menuItems.map((item) => (
<<<<<<< HEAD
              <div key={item._id} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-[#f0ebe4] flex items-center justify-center text-xs text-[#b5a898]">
                      ☕
                    </div>
                  )}
                  <div>
                    <h5 className="text-sm font-medium text-[#3b2e23]">{item.name}</h5>
                    <p className="text-xs text-gray-500">Rp{Number(item.price).toLocaleString()}</p>
=======
              <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md object-cover" />
                  <div>
                    <h5 className="text-sm font-medium text-[#3b2e23]">{item.name}</h5>
                    <p className="text-xs text-gray-500">Rp{item.price.toLocaleString()}</p>
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
                  </div>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 bg-[#3b2e23] text-white text-xs rounded-lg hover:bg-[#2e241a] transition"
                >Add</button>
              </div>
            ))}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Footer */}
=======
      {/* Footer — fixed di bawah, tidak ikut scroll */}
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
      <div className="px-6 py-4 border-t border-[#e6e1da] shrink-0 bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-[#3b2e23]">Total</span>
          <span className="text-lg font-semibold text-[#3b2e23]">
            Rp{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}
          </span>
        </div>

<<<<<<< HEAD
=======
        {/* Masalah 2: checkout hanya bisa jika sudah login */}
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
        {user ? (
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-[#3b2e23] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#2e241a] transition disabled:opacity-50"
          >
            Checkout
          </button>
        ) : (
          <button
            onClick={() => { onClose?.(); setShowLogin(true); }}
            className="w-full bg-[#7a5e3a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#6a4e2a] transition"
          >
            Login untuk Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default function CartModal() {
  const { showCart, setShowCart } = useCart();

  return (
    <AnimatePresence>
      {showCart && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-end z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCart(false)}
        >
          <motion.div
            className="h-full"
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: 200 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CartContent onClose={() => setShowCart(false)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
