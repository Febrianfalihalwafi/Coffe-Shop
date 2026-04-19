"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-center bg-[#faf7f3] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1600&q=80"
          alt="Coffee beans"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f3]/70 via-[#faf7f3]/60 to-[#faf7f3]/90 backdrop-blur-[2px]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 max-w-3xl px-6 md:px-0"
      >
        <h1 className="text-5xl md:text-6xl font-light uppercase tracking-[0.25em] text-[#2f2417] mb-8">
          Tentang Coffee Telkom
        </h1>
        <p className="text-base md:text-lg text-[#4a3a2c] leading-relaxed mb-6">
          Coffee Telkom lahir dari semangat inovasi dan kecintaan terhadap kopi. Kami menggabungkan{" "}
          <span className="font-semibold text-[#7a5e3a]">teknologi modern</span> dengan{" "}
          <span className="font-semibold text-[#7a5e3a]">keunikan rasa lokal</span>, menciptakan pengalaman kopi yang berbeda.
        </p>
        <p className="text-base md:text-lg text-[#4a3a2c] leading-relaxed mb-10">
          Setiap biji kopi kami diseduh dengan presisi, dari tangan barista profesional hingga mesin kopi canggih milik Telkom Innovation Lab.
          Kami percaya bahwa <span className="italic">setiap tegukan bercerita</span> — tentang kualitas, koneksi, dan kreativitas tanpa batas. ☕
        </p>
        <Link
          href="/menu"
          className="inline-block mt-6 px-8 py-4 border border-[#4b3b2a] text-[#4b3b2a] rounded-full uppercase tracking-wide hover:bg-[#4b3b2a] hover:text-white transition-all duration-300"
        >
          Jelajahi Menu Kami
        </Link>
      </motion.section>
    </main>
  );
}
