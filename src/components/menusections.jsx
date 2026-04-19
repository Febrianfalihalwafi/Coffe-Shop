"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { menuItems } from "@/context/CartContext";

const categories = ["All", "Hot", "Cold", "Non-Coffee"];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="flex justify-center gap-4 mt-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-sm rounded-full border transition-all ${
              activeCategory === cat
                ? "bg-[#7a5e3a] text-white border-[#7a5e3a]"
                : "border-[#cbb89e] text-[#4b3b2a] hover:bg-[#f0e9df]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 py-20"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white border border-[#e6e1da] rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <div className="w-full h-60 relative">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-[#2f2417] mb-2 uppercase">{item.name}</h3>
                <p className="text-sm text-[#6f5d48] mb-4">{item.desc}</p>
                <p className="font-bold text-[#7a5e3a] tracking-wider mb-4">
                  Rp{item.price.toLocaleString()}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full py-2 bg-[#3b2e23] text-white text-sm rounded-xl hover:bg-[#2e241a] transition"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
