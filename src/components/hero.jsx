"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const modernEase = [0.22, 1, 0.36, 1];

const slides = [
  {
    title: "COFFEE TELKOM",
    subtitle: "MODERN COFFEE • INNOVATION • CONNECTION",
    quote: '"High-quality coffee, crafted with technology and tradition."',
    features: [
      "Brewed with technology",
      "Served with care",
      "Designed for you",
    ],
  },
  {
    title: "PERFECT EVERY BREW",
    subtitle: "MODERN TECHNOLOGY • AUTHENTIC TASTE",
    quote:
      '"Where innovation meets tradition, that\'s where the finest coffee is born."',
    features: [
      "Premium coffee beans",
      "Precision process",
      "Consistent flavor",
    ],
  },
  {
    title: "PREMIUM ROASTED",
    subtitle: "ARTISAN BREWED • EXCEPTIONAL TASTE",
    quote: '"Experience the perfect blend of craftsmanship and innovation."',
    features: [
      "Award winning blend",
      "Lab tested quality",
      "Sustainably sourced",
    ],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: modernEase },
  },
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 🔹 HERO SECTION */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/Tel-U-Coffee.jpg"
            alt="Coffee Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f3]/85 via-[#faf7f3]/45 to-[#faf7f3]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(43,32,24,0.22)_100%)]" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6">
          <div className="w-full max-w-3xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                  },
                }}
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-6xl font-light uppercase tracking-[0.25em] text-[#2c231a] mb-4 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-sm md:text-base tracking-[0.2em] text-[#4b3b2a]/85 uppercase mb-10"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="italic text-[#3b2e23]/90 text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed"
                >
                  {slides[currentSlide].quote}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-[#4b3b2a] font-light tracking-wide"
                >
                  {slides[currentSlide].features.map((text, i) => (
                    <span
                      key={i}
                      className="relative px-5 py-1.5 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-1.5 before:h-1.5 before:bg-[#4b3b2a] before:transform before:-translate-y-1/2 before:rounded-full"
                    >
                      {text}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-12">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentSlide
                      ? "w-8 bg-[#7a5e3a]"
                      : "w-2 bg-[#4b3b2a]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 FOOTER SECTION (Multi-Column Layout) */}
      <motion.footer
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#faf7f3] border-t border-[#e6e1da] w-full py-8"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Grid 4 Kolom */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
            {/* Kolom 1: Brand & Contact */}
            <div className="space-y-5">
              {/* Brand Header */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#e6e1da] bg-white/50 backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 text-[#7a5e3a]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-wide text-[#2f2417]">
                    Coffee Telkom
                  </h3>
                  <p className="text-[11px] font-medium text-[#4b3b2a]/60 uppercase tracking-wider">
                    Berdaya & Tumbuh Bersama
                  </p>
                </div>
              </div>

              {/* Subtle Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e6e1da] to-transparent"></div>

              {/* Contact List */}
              <div className="space-y-3">
                <p className="group flex items-start gap-3 text-sm text-[#4b3b2a]/80 hover:text-[#7a5e3a] transition-colors duration-200">
                  <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg border border-[#e6e1da] bg-white/50 flex items-center justify-center group-hover:border-[#7a5e3a]/40 group-hover:bg-[#faf8f5] transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-[#7a5e3a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="leading-relaxed">
                    Telkom Innovation Center,
                    <br />
                    Bandung, Indonesia
                  </span>
                </p>

                <p className="group flex items-center gap-3 text-sm text-[#4b3b2a]/80 hover:text-[#7a5e3a] transition-colors duration-200">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg border border-[#e6e1da] bg-white/50 flex items-center justify-center group-hover:border-[#7a5e3a]/40 group-hover:bg-[#faf8f5] transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-[#7a5e3a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span>+62 852 1279 3050</span>
                </p>

                <p className="group flex items-center gap-3 text-sm text-[#4b3b2a]/80 hover:text-[#7a5e3a] transition-colors duration-200">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg border border-[#e6e1da] bg-white/50 flex items-center justify-center group-hover:border-[#7a5e3a]/40 group-hover:bg-[#faf8f5] transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-[#7a5e3a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span>hello@coffeetelkom.id</span>
                </p>
              </div>
            </div>

            {/* Kolom 2: Metode Pembayaran */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#2f2417] uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-[#7a5e3a] rounded-full"></span>
                Metode Pembayaran
              </h4>

              <div className="grid grid-cols-3 gap-2.5">
                {["BCA", "Mandiri", "BNI", "GoPay", "OVO", "DANA"].map(
                  (pay) => (
                    <button
                      key={pay}
                      className="flex items-center justify-center px-3 py-2.5 rounded-xl border border-[#e6e1da] bg-white/70 backdrop-blur-sm text-[11px] font-medium text-[#4b3b2a] transition-all duration-200 hover:border-[#7a5e3a] hover:bg-[#faf8f5] hover:text-[#7a5e3a] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]/30 focus:ring-offset-1 cursor-pointer"
                    >
                      {pay}
                    </button>
                  ),
                )}
              </div>

              <p className="text-[10px] text-[#4b3b2a]/50 text-center pt-1">
                Transaksi aman & terenkripsi
              </p>
            </div>
            {/* Kolom 3: Lokasi Google Maps */}
            <div className="lg:col-span-2">
              <h4 className="text-base font-semibold text-[#2f2417] mb-1 uppercase tracking-wide">
                Lokasi Kami
              </h4>

              {/* Google Maps Embed */}
              <div className="w-full h-40 rounded-lg overflow-hidden border border-[#e6e1da] mb-1 bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1234567890123!2d107.6317743!3d-6.973463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTgnMjQuNCJTIDEwN8KwMzcnNTQuNCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Coffee Telkom Location"
                />
              </div>

              {/* Address & Directions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-start gap-2 text-sm text-[#4b3b2a]/80">
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-[#7a5e3a] mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                {/* Get Directions Button */}
                <a
                  href="https://maps.app.goo.gl/3eJmX2JTsYLEREbHA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#7a5e3a] text-white text-sm rounded-lg hover:bg-[#5d4a2f] transition-colors duration-300 whitespace-nowrap"
                >
                  <svg
                    className="w-1 h-"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-[#e6e1da] my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#4b3b2a]/60">
              © {new Date().getFullYear()} Coffee Telkom. All rights reserved
            </p>

            <div className="flex gap-3">
              {["Facebook", "Twitter", "Instagram", "Pinterest"].map(
                (social) => (
                  <a
                    key={social}
                    href={`https://${social.toLowerCase()}.com/coffeetelkom`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4b3b2a]/60 hover:text-[#7a5e3a] transition-colors duration-300"
                    aria-label={social}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social === "Facebook" && (
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      )}
                      {social === "Twitter" && (
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      )}
                      {social === "Instagram" && (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      )}
                      {social === "Pinterest" && (
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                      )}
                    </svg>
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
