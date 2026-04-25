"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// 🎯 Easing & timing persis seperti Hero
const modernEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3, ease: modernEase },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: modernEase },
  },
};

export default function AboutSection() {
  const stats = [
    { value: "50+", label: "Premium Blends" },
    { value: "12K+", label: "Happy Customers" },
    { value: "100%", label: "Ethically Sourced" },
    { value: "4.9★", label: "Average Rating" },
  ];

  const values = [
    {
      title: "Innovation First",
      desc: "Leveraging cutting-edge technology from Telkom Innovation Lab to perfect every brew.",
      icon: "⚡",
    },
    {
      title: "Local Soul",
      desc: "Celebrating Indonesian coffee heritage with beans sourced from sustainable local farms.",
      icon: "🌱",
    },
    {
      title: "Crafted with Care",
      desc: "Every cup is prepared by certified baristas who treat coffee as an art form.",
      icon: "☕",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-[#faf7f3] overflow-hidden">
      {/* 🔹 Background Layer */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1600&q=80"
          alt="Coffee beans"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay - sama persis dengan Hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f3]/90 via-[#faf7f3]/50 to-[#faf7f3]/95" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(43,32,24,0.2)_100%)]" />
      </div>

      {/* 🔹 Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header Section */}
          <div className="text-center space-y-6">
            <motion.div variants={itemVariants}></motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.25em] text-[#2c231a] leading-tight"
            >
              Where Technology <br />
              <span className="font-semibold text-[#7a5e3a]">
                Meets Tradition
              </span>
            </motion.h1>
          </div>

          {/* Story Text */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto space-y-6"
          >
            <p className="text-base md:text-lg text-[#4b3b2a]/90 leading-relaxed text-center">
              Coffee Telkom was born from a simple yet powerful idea:{" "}
              <span className="font-semibold text-[#7a5e3a]">
                what if the precision of technology could elevate the soul of
                coffee?
              </span>{" "}
              Nestled in the heart of Telkom Innovation Center, we blend
              data-driven brewing methods with time-honored craftsmanship to
              create an experience that's both innovative and deeply human.
            </p>

            <p className="text-base md:text-lg text-[#4b3b2a]/90 leading-relaxed text-center">
              From bean selection to the final pour, every step is optimized
              with care. Our AI-assisted roasting profiles ensure consistency,
              while our master baristas bring intuition and passion to each cup.
              We source exclusively from{" "}
              <span className="font-semibold text-[#7a5e3a]">
                ethical Indonesian farms
              </span>
              , supporting local communities while delivering exceptional
              flavor. Because great coffee shouldn't just taste good — it should{" "}
              <span className="italic">feel</span> good too.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#e6e1da] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-light text-[#7a5e3a] mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[#4b3b2a]/70 uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-[#e6e1da] hover:border-[#7a5e3a]/40 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-[#2f2417] mb-3 uppercase tracking-wide">
                  {value.title}
                </h3>
                <p className="text-sm text-[#4b3b2a]/80 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg md:text-xl italic text-[#3b2e23]/90 leading-relaxed">
              "We don't just serve coffee. We craft moments of connection,
              powered by innovation and rooted in tradition."
            </p>
          </motion.blockquote>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#7a5e3a] text-white text-sm font-medium rounded-full uppercase tracking-wide hover:bg-[#5d4a2f] transition-all duration-300 shadow-lg shadow-[#7a5e3a]/25 hover:shadow-xl hover:shadow-[#7a5e3a]/30"
            >
              Explore Our Menu
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
