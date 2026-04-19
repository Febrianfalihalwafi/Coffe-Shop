"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-center bg-[#faf7f3] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1510626176961-4b37d0d4d5c3?auto=format&fit=crop&w=1600&q=80"
          alt="Coffee cup"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f3]/70 via-[#faf7f3]/60 to-[#faf7f3]/90 backdrop-blur-[2px]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 max-w-2xl px-6 md:px-0"
      >
        <h1 className="text-5xl md:text-6xl font-light uppercase tracking-[0.25em] text-[#2f2417] mb-8">
          Hubungi Kami
        </h1>
        <p className="text-base md:text-lg text-[#4a3a2c] leading-relaxed mb-8">
          Kami selalu senang mendengar dari Anda!<br />
          Baik pertanyaan, saran, atau kolaborasi, tim kami siap membantu ☕
        </p>
        <div className="space-y-4 text-[#4a3a2c]">
          <p>✉️ Email kami di <span className="font-semibold text-[#7a5e3a]">hello@coffeetelkom.id</span></p>
          <p>📍 Kunjungi kami di <span className="font-semibold text-[#7a5e3a]">Telkom Innovation Center, Bandung</span></p>
          <p>📱 Instagram:{" "}
            <a href="https://instagram.com/coffeetelkom" target="_blank" className="font-semibold text-[#7a5e3a] hover:underline">
              @coffeetelkom
            </a>
          </p>
        </div>
      </motion.section>
    </main>
  );
}
