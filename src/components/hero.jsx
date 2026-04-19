"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Tel-U-Coffee.jpg"
          alt="Coffee Background"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[#faf7f3]/70 backdrop-blur-sm" />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 max-w-3xl px-4"
      >
        <h1 className="text-4xl md:text-6xl font-light uppercase tracking-[0.25em] text-[#3b2e23] mb-3 leading-tight">
          Coffee Telkom
        </h1>
        <p className="text-sm md:text-base tracking-[0.2em] text-[#4b3b2a] uppercase mb-8">
          modern coffee • innovation • connection
        </p>
      </motion.div>

      {/* Quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="italic text-[#4b3b2a] text-base md:text-lg max-w-lg mx-auto mb-10 px-4"
      >
        "High-quality coffee, crafted with technology and tradition."
      </motion.p>

      {/* Text Strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex flex-wrap justify-center gap-8 text-sm text-[#4b3b2a] font-light tracking-wide max-w-2xl"
      >
        <span className="relative px-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-1 before:h-1 before:bg-[#4b3b2a] before:transform before:-translate-y-1/2 before:rounded-full">
          Brewed with technology
        </span>
        <span className="relative px-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-1 before:h-1 before:bg-[#4b3b2a] before:transform before:-translate-y-1/2 before:rounded-full">
          Served with care
        </span>
        <span className="relative px-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-1 before:h-1 before:bg-[#4b3b2a] before:transform before:-translate-y-1/2 before:rounded-full">
          Designed for you
        </span>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 text-xs text-[#4b3b2a]"
      >
        © 2025 Coffee Telkom — crafted with ❤️ & technology.
      </motion.footer>
    </>
  );
}
