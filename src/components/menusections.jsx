"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart, menuItems } from "@/context/CartContext";

const categories = ["All", "Hot", "Cold", "Non-Coffee"];
const modernEase = [0.22, 1, 0.36, 1];

// 🎯 Smoother animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
      ease: modernEase,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: modernEase,
      type: "spring",
      stiffness: 280,
      damping: 24,
    },
  },
  exit: { opacity: 0, y: -15, scale: 0.97, transition: { duration: 0.3 } },
};

// 🔹 Compact Modal variants - smaller & snappier
const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: modernEase,
      type: "spring",
      stiffness: 420,
      damping: 32,
    },
  },
  exit: { opacity: 0, scale: 0.94, y: 12, transition: { duration: 0.16 } },
};

// Floating decoration
const floatVariants = {
  float: {
    y: [0, -6, 0],
    rotate: [0, 1.5, -1.5, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useCart();

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item) => {
    addToCart(item);
    setSelectedItem(null);
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#faf7f3] overflow-hidden">
      {/* 🔹 Subtle Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f3]/95 via-[#faf7f3]/70 to-[#faf7f3]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_45%,rgba(122,94,58,0.06)_100%)]" />

        {/* Minimal floating elements */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={floatVariants}
            animate="float"
            className="absolute text-xl md:text-2xl opacity-8"
            style={{
              left: `${12 + i * 20}%`,
              top: `${15 + (i % 2) * 35}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {i % 2 === 0 ? "☕" : "✦"}
          </motion.div>
        ))}
      </div>

      {/* 🔹 Header */}
      <div className="relative z-10 text-center px-6 mb-10 md:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-5xl font-light uppercase tracking-[0.25em] text-[#2c231a] mb-3"
        >
          Crafted{" "}
          <span className="font-semibold text-[#7a5e3a]">Excellence</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="max-w-xl mx-auto text-sm md:text-base text-[#4b3b2a]/75"
        >
          Every cup tells a story. Explore our curated collection of premium
          coffees.
        </motion.p>
      </div>

      {/* 🔹 Category Tabs - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="relative z-10 flex justify-center flex-wrap gap-2 px-6 mb-10 md:mb-12"
      >
        {categories.map((cat, idx) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + idx * 0.04 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-4 md:px-5 py-2 text-xs font-medium rounded-full border transition-all duration-250 tracking-wide ${
              activeCategory === cat
                ? "bg-[#7a5e3a] text-white border-[#7a5e3a] shadow-md shadow-[#7a5e3a]/20"
                : "border-[#e6e1da] text-[#4b3b2a]/80 hover:border-[#7a5e3a]/40 hover:bg-white/50"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* 🔹 Menu Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 px-6"
        >
          {filtered.map((item) => (
            <motion.div
              key={item.id || item.name}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-white/60 backdrop-blur-sm border border-[#e6e1da]/80 rounded-2xl overflow-hidden cursor-pointer hover:border-[#7a5e3a]/30 hover:shadow-lg hover:shadow-[#7a5e3a]/8 transition-all duration-400"
            >
              {/* Image */}
              <div className="relative h-48 md:h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c231a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Quick Add - appears on hover */}
                <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="px-4 py-2 bg-[#7a5e3a] text-white text-[10px] font-medium rounded-full shadow-md hover:bg-[#5d4a2f] transition-colors flex items-center gap-1.5"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                    </svg>
                    Add
                  </motion.button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[#7a5e3a] text-[10px] font-semibold rounded-full border border-[#e6e1da]">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-[#7a5e3a]/95 text-white text-[10px] font-bold rounded-full shadow">
                    Rp{item.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                <h3 className="text-base md:text-lg font-semibold text-[#2f2417] mb-1.5 uppercase tracking-wide group-hover:text-[#7a5e3a] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#6f5d48]/85 mb-3 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* Features */}
                {item.features && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.features.slice(0, 2).map((feat, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 bg-[#f5f0e8] text-[#6f5d48] rounded-full border border-[#e6e1da]/70"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-[#7a5e3a] font-medium group-hover:underline cursor-pointer">
                    Details →
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="p-2 rounded-full bg-[#faf7f3] border border-[#e6e1da] text-[#7a5e3a] hover:bg-[#7a5e3a] hover:text-white transition-all duration-250"
                    aria-label={`Add ${item.name}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 🔹 COMPACT MODAL - Smaller & Cleaner */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="modal-backdrop"
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c231a]/50 backdrop-blur-[3px] p-3 md:p-4"
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#faf7f3] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#e6e1da]"
            >
              {/* Modal Header - Compact Image */}
              <div className="relative h-40 md:h-44">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c231a]/80 via-[#2c231a]/20 to-transparent" />

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#2f2417] shadow transition-all"
                  aria-label="Close"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </motion.button>

                {/* Title & Price */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide drop-shadow">
                    {selectedItem.name}
                  </h2>
                  <p className="text-base font-bold text-[#f5e6d3]">
                    Rp{selectedItem.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Modal Body - Compact */}
              <div className="p-4 md:p-5 space-y-4">
                {/* Description */}
                <p className="text-sm text-[#4b3b2a]/85 leading-relaxed">
                  {selectedItem.fullDesc || selectedItem.desc}
                </p>

                {/* Features */}
                {selectedItem.features && (
                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2.5 py-1 bg-[#f5f0e8] text-[#6f5d48] rounded-full border border-[#e6e1da]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Customization */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Less Sugar", "Extra Shot", "Oat Milk"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/60 border border-[#e6e1da] text-[10px] text-[#4b3b2a] cursor-pointer hover:border-[#7a5e3a]/40 transition-all"
                    >
                      <input
                        type="checkbox"
                        className="accent-[#7a5e3a] w-3 h-3"
                      />
                      {opt}
                    </label>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAddToCart(selectedItem)}
                  className="w-full py-3 bg-[#7a5e3a] text-white text-sm font-semibold rounded-xl hover:bg-[#5d4a2f] transition-all shadow-md shadow-[#7a5e3a]/20 flex items-center justify-center gap-2"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                  Add to Cart — Rp{selectedItem.price.toLocaleString()}
                </motion.button>

                {/* Micro Trust Note */}
                <p className="text-center text-[10px] text-[#6f5d48]/70">
                  ✓ Freshly brewed • Customizable • Free consultation
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center py-16 px-6"
        >
          <div className="text-5xl mb-3">☕</div>
          <p className="text-sm text-[#6f5d48]">No items in this category</p>
        </motion.div>
      )}
    </section>
  );
}
