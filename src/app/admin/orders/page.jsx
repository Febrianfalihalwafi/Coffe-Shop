"use client";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem("ct_token");

    try {
      const res = await fetch("http://localhost:5000/api/order/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
        setMessage("");
      } else {
        setMessage(data.msg || data.message || "Gagal mengambil data");
      }
    } catch {
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    const token = localStorage.getItem("ct_token");

    await fetch(`http://localhost:5000/api/order/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf7f3] pt-32 px-6 pb-20 text-[#2f2417]">
      <section className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.25em]">
            Admin <span className="font-semibold text-[#7a5e3a]">Orders</span>
          </h1>
          <p className="mt-3 text-[#6f5d48]">
            Kelola pesanan masuk, nomor antrian, dan status pesanan.
          </p>
        </div>

        {/* STATUS */}
        {loading && <p className="text-center">Loading...</p>}
        {message && <p className="text-center text-red-500">{message}</p>}

        {/* LIST ORDER */}
        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-[#e6e1da] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                {/* LEFT */}
                <div>
                  <p className="text-sm uppercase tracking-widest text-[#7a5e3a]">
                    Queue Number
                  </p>
                  <h2 className="text-4xl font-bold">#{order.queueNumber}</h2>

                  <p className="text-sm text-[#6f5d48] mt-2">
                    Customer: {order.userId?.name || "-"} / {order.userId?.email || "-"}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col md:items-end gap-2">

                  {/* TOTAL */}
                  <p className="font-semibold">
                    Total: Rp {order.totalAmount?.toLocaleString("id-ID")}
                  </p>

                  {/* STATUS BADGE */}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      order.status === "processing" ? "bg-blue-100 text-blue-700" :
                      order.status === "done" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"}
                  `}>
                    {order.status}
                  </span>

                  {/* SELECT UPDATE */}
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border border-[#e6e1da] rounded-xl px-4 py-2 bg-[#faf7f3]"
                  >
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="done">done</option>
                    <option value="cancelled">cancelled</option>
                  </select>

                </div>
              </div>

              {/* ITEMS */}
              <div className="mt-5 border-t border-[#e6e1da] pt-4">
                <p className="font-semibold mb-2">Items</p>

                {order.items?.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-[#6f5d48]">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
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

