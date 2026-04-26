"use client";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#faf7f3] pt-32 px-6 text-[#2f2417]">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-[#7a5e3a]">
          Admin Dashboard
        </h1>
        <p className="mt-3 text-[#6f5d48]">
          Kelola pesanan dan menu Coffee Telkom.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
          <Link
            href="/admin/orders"
            className="bg-white border border-[#e6e1da] rounded-2xl p-8 shadow hover:shadow-md transition block text-left"
          >
            <div className="text-3xl mb-3">📋</div>
            <h2 className="text-2xl font-semibold">Kelola Orders</h2>
            <p className="mt-2 text-[#6f5d48]">
              Lihat pesanan dan update status.
            </p>
          </Link>

          <Link
            href="/admin/menu"
            className="bg-white border border-[#e6e1da] rounded-2xl p-8 shadow hover:shadow-md transition block text-left"
          >
            <div className="text-3xl mb-3">☕</div>
            <h2 className="text-2xl font-semibold">Kelola Menu</h2>
            <p className="mt-2 text-[#6f5d48]">
              Tambah, edit, dan hapus menu.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}