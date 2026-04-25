"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem("ct_token");

    if (!token) {
      setMessage("Silakan login terlebih dahulu");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/order/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
        setMessage("");
      } else {
        setOrders([]);
        setMessage(data.msg || data.message || "Gagal mengambil pesanan");
      }
    } catch {
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf7f3] pt-32 px-6 pb-20 text-[#2f2417]">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.25em]">
            My <span className="font-semibold text-[#7a5e3a]">Orders</span>
          </h1>
          <p className="mt-3 text-[#6f5d48]">
            Lihat status pesanan dan nomor antrian kamu di sini.
          </p>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {message && <p className="text-center text-red-500">{message}</p>}

        {!loading && orders.length === 0 && !message && (
          <p className="text-center">Belum ada pesanan.</p>
        )}

        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-[#e6e1da] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <p className="text-sm uppercase tracking-widest text-[#7a5e3a]">
                    Queue Number
                  </p>
                  <h2 className="text-4xl font-bold">#{order.queueNumber}</h2>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <p className="font-semibold">
                    Total: Rp {order.totalAmount?.toLocaleString("id-ID")}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "done"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Status: {order.status}
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t border-[#e6e1da] pt-4">
                <p className="font-semibold mb-2">Items</p>

                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-[#6f5d48]"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}