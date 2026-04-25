"use client";
import { useEffect, useState } from "react";

export default function AdminMenuPage() {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
    category: "",
  });

  const fetchMenus = async () => {
    const res = await fetch("http://localhost:5000/api/menu");
    const data = await res.json();
    setMenus(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("ct_token");

    await fetch("http://localhost:5000/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ name: "", desc: "", price: "", image: "", category: "" });
    fetchMenus();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("ct_token");

    await fetch(`http://localhost:5000/api/menu/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchMenus();
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf7f3] pt-32 px-6 pb-20 text-[#2f2417]">
      <section className="max-w-6xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-[#7a5e3a]">
            Admin Menu
          </h1>
          <p className="mt-2 text-[#6f5d48]">
            Kelola menu di sini
          </p>
        </div>

        {/* FORM TAMBAH */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="font-semibold mb-4">Tambah Menu</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Harga"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Kategori"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border p-2 rounded"
            />
          </div>

          <textarea
            placeholder="Deskripsi"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="border p-2 rounded w-full mt-4"
          />

          <button className="mt-4 bg-[#7a5e3a] text-white px-4 py-2 rounded">
            Tambah Menu
          </button>
        </form>

        {/* LIST MENU */}
        <div className="grid gap-4">
          {menus.map((menu) => (
            <div key={menu._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{menu.name}</p>
                <p className="text-sm text-gray-500">{menu.desc}</p>
                <p className="text-sm">Rp {menu.price?.toLocaleString("id-ID")}</p>
              </div>

              <button
                onClick={() => handleDelete(menu._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}