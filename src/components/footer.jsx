"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const modernEase = [0.22, 1, 0.36, 1];

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: modernEase },
  },
};

const menuCategories = ["Hot Coffee", "Cold Coffee", "Non Coffee", "Snacks"];
const companyLinks = ["Tentang Kami", "Lokasi", "Karir", "Partnership"];

export default function Footer() {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#faf7f3] border-t border-[#e6e1da] pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section - Multi Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-8 h-8 text-[#7a5e3a]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
              </svg>
              <h3 className="text-2xl font-light uppercase tracking-[0.15em] text-[#2f2417]">
                Coffee Telkom
              </h3>
            </div>
            <p className="text-sm text-[#4b3b2a]/80 leading-relaxed">
              Berdaya dan Tumbuh Bersama
              <br />
              Coffee Telkom.
            </p>
            <div className="space-y-2 text-sm text-[#4b3b2a]/80">
              <p className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
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
                <span>
                  Telkom Innovation Center,
                  <br />
                  Bandung, Indonesia
                </span>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
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
                <span>+62 812 4100 1068</span>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
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
                <span>hello@coffeetelkom.id</span>
              </p>
            </div>
          </div>

          {/* Column 2: Kategori */}
          <div>
            <h4 className="text-base font-semibold text-[#2f2417] mb-4 uppercase tracking-wide">
              Kategori
            </h4>
            <ul className="space-y-3">
              {menuCategories.map((item) => (
                <li key={item}>
                  <Link
                    href={`/menu?category=${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-[#4b3b2a]/80 hover:text-[#7a5e3a] transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Coffee Telkom HUB */}
          <div>
            <h4 className="text-base font-semibold text-[#2f2417] mb-4 uppercase tracking-wide">
              Coffee Telkom HUB
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-[#4b3b2a]/80 hover:text-[#7a5e3a] transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Metode Pembayaran */}
          <div>
            <h4 className="text-base font-semibold text-[#2f2417] mb-4 uppercase tracking-wide">
              Metode Pembayaran
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                "BCA",
                "Mandiri",
                "BNI",
                "GoPay",
                "OVO",
                "DANA",
                "ShopeePay",
                "Alfamart",
                "Indomaret",
              ].map((payment) => (
                <div
                  key={payment}
                  className="bg-white border border-[#e6e1da] rounded-lg px-3 py-2 text-center text-xs font-medium text-[#4b3b2a] hover:border-[#7a5e3a] hover:text-[#7a5e3a] transition-colors duration-300"
                >
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e6e1da]/60 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#4b3b2a]/60">
            © {new Date().getFullYear()} Coffee Telkom. All rights reserved
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#4b3b2a]/60">Stay connected :</span>
            <div className="flex gap-3">
              {[
                {
                  name: "Facebook",
                  icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  name: "Twitter",
                  icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                },
                {
                  name: "Instagram",
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                },
                {
                  name: "Pinterest",
                  icon: "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={`https://${social.name.toLowerCase()}.com/coffeetelkom`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4b3b2a]/60 hover:text-[#7a5e3a] transition-colors duration-300"
                  aria-label={social.name}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
