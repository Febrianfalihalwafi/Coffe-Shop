"use client";
import { useEffect, useState } from "react";

const CATEGORIES = ["Hot", "Cold", "Non-Coffee", "Makanan", "Snack", "Lainnya"];
const emptyForm = { name: "", desc: "", price: "", image: "", category: "" };

export default function AdminMenuPage() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const token = () => localStorage.getItem("ct_token");

  // ── FETCH ALL MENU ─────────────────────────────────────
  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/menu", {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      setMenus(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMenus(); }, []);

  // ── OPEN MODAL TAMBAH ──────────────────────────────────
  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setMessage("");
    setShowModal(true);
  };

  // ── OPEN MODAL EDIT ────────────────────────────────────
  const openEdit = (menu) => {
    setEditTarget(menu._id);
    setForm({
      name: menu.name || "",
      desc: menu.desc || "",
      price: menu.price || "",
      image: menu.image || "",
      category: menu.category || "",
    });
    setMessage("");
    setShowModal(true);
  };

  // ── SAVE (CREATE / UPDATE) ─────────────────────────────
  const handleSave = async () => {
    if (!form.name || !form.price) {
      setMessage("Nama dan harga wajib diisi");
      return;
    }
    setSaving(true);
    setMessage("");

    const url = editTarget
      ? `http://localhost:5000/api/menu/${editTarget}`
      : "http://localhost:5000/api/menu";
    const method = editTarget ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });

      if (res.ok) {
        setShowModal(false);
        fetchMenus();
      } else {
        const err = await res.json();
        setMessage(err.msg || "Gagal menyimpan menu");
      }
    } catch {
      setMessage("Gagal terhubung ke server");
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE ─────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/menu/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      setDeleteConfirm(null);
      fetchMenus();
    } catch {
      setMessage("Gagal menghapus menu");
    }
  };

  // ── RENDER ─────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#faf7f3] pt-32 px-6 pb-20 text-[#2f2417]">
      <section className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.25em]">
            Admin <span className="font-semibold text-[#7a5e3a]">Menu</span>
          </h1>
          <p className="mt-3 text-[#6f5d48]">
            Tambah, edit, dan hapus menu Coffee Telkom.
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {message && !showModal && (
          <p className="text-center text-red-500 mb-6">{message}</p>
        )}

        {/* TOMBOL TAMBAH */}
        <div className="flex justify-end mb-6">
          <button
            onClick={openAdd}
            className="bg-[#7a5e3a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5e4529] transition"
          >
            + Tambah Menu
          </button>
        </div>

        {/* LOADING */}
        {loading && <p className="text-center">Loading...</p>}

        {/* KOSONG */}
        {!loading && menus.length === 0 && (
          <p className="text-center text-[#6f5d48]">
            Belum ada menu. Klik &quot;+ Tambah Menu&quot; untuk mulai.
          </p>
        )}

        {/* GRID MENU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="bg-white border border-[#e6e1da] rounded-2xl shadow-sm overflow-hidden flex flex-col"
            >
              {/* GAMBAR */}
              {menu.image ? (
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-[#f0ebe4] flex items-center justify-center text-[#b5a898] text-sm">
                  Tidak ada gambar
                </div>
              )}

              {/* DETAIL */}
              <div className="p-5 flex flex-col flex-1 gap-2">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="font-semibold text-lg leading-tight">{menu.name}</h2>
                  {menu.category && (
                    <span className="text-xs bg-[#f0ebe4] text-[#7a5e3a] px-2 py-1 rounded-full whitespace-nowrap shrink-0">
                      {menu.category}
                    </span>
                  )}
                </div>

                {menu.desc && (
                  <p className="text-sm text-[#6f5d48] line-clamp-2">{menu.desc}</p>
                )}

                <p className="font-bold text-[#7a5e3a] mt-auto">
                  Rp {Number(menu.price).toLocaleString("id-ID")}
                </p>

                {/* TOMBOL AKSI */}
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => openEdit(menu)}
                    className="flex-1 border border-[#7a5e3a] text-[#7a5e3a] rounded-xl py-2 text-sm font-semibold hover:bg-[#7a5e3a] hover:text-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(menu._id)}
                    className="flex-1 border border-red-300 text-red-500 rounded-xl py-2 text-sm font-semibold hover:bg-red-500 hover:text-white transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODAL TAMBAH / EDIT ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-[#2f2417] mb-6">
              {editTarget ? "Edit Menu" : "Tambah Menu Baru"}
            </h2>

            <div className="flex flex-col gap-4">
              {/* NAMA */}
              <div>
                <label className="text-sm font-medium text-[#6f5d48] block mb-1">
                  Nama Menu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Matcha Latte"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#e6e1da] rounded-xl px-4 py-2 bg-[#faf7f3] focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]"
                />
              </div>

              {/* DESKRIPSI */}
              <div>
                <label className="text-sm font-medium text-[#6f5d48] block mb-1">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Deskripsi singkat menu..."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  rows={3}
                  className="w-full border border-[#e6e1da] rounded-xl px-4 py-2 bg-[#faf7f3] focus:outline-none focus:ring-2 focus:ring-[#7a5e3a] resize-none"
                />
              </div>

              {/* HARGA */}
              <div>
                <label className="text-sm font-medium text-[#6f5d48] block mb-1">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 35000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-[#e6e1da] rounded-xl px-4 py-2 bg-[#faf7f3] focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]"
                />
              </div>

              {/* KATEGORI */}
              <div>
                <label className="text-sm font-medium text-[#6f5d48] block mb-1">
                  Kategori
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-[#e6e1da] rounded-xl px-4 py-2 bg-[#faf7f3] focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* URL GAMBAR */}
              <div>
                <label className="text-sm font-medium text-[#6f5d48] block mb-1">
                  URL Gambar
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full border border-[#e6e1da] rounded-xl px-4 py-2 bg-[#faf7f3] focus:outline-none focus:ring-2 focus:ring-[#7a5e3a]"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="mt-2 w-full h-32 object-cover rounded-xl border border-[#e6e1da]"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                )}
              </div>
            </div>

            {/* ERROR DALAM MODAL */}
            {message && (
              <p className="text-red-500 text-sm mt-3">{message}</p>
            )}

            {/* TOMBOL */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowModal(false); setMessage(""); }}
                className="flex-1 border border-[#e6e1da] rounded-xl py-3 text-[#6f5d48] hover:bg-[#f0ebe4] transition"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#7a5e3a] text-white rounded-xl py-3 font-semibold hover:bg-[#5e4529] transition disabled:opacity-60"
              >
                {saving ? "Menyimpan..." : editTarget ? "Simpan Perubahan" : "Tambah Menu"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL KONFIRMASI HAPUS ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
            <h2 className="text-xl font-semibold text-[#2f2417] mb-2">Hapus Menu?</h2>
            <p className="text-[#6f5d48] mb-6 text-sm">
              Menu ini akan dihapus permanen dan tidak bisa dikembalikan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-[#e6e1da] rounded-xl py-3 text-[#6f5d48] hover:bg-[#f0ebe4] transition"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white rounded-xl py-3 font-semibold hover:bg-red-600 transition"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
