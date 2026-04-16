import { FaArrowLeft } from "react-icons/fa";

export default function Orders() {
  const orders = [
    { id: "#ORD-001", customer: "Nabila Azzahra", menu: "Nasi Goreng Hijau", status: "Completed", total: "Rp 25.000" },
    { id: "#ORD-002", customer: "Budi Santoso", menu: "Es Teh Manis", status: "Pending", total: "Rp 5.000" },
    { id: "#ORD-003", customer: "Siti Aminah", menu: "Ayam Bakar", status: "Canceled", total: "Rp 35.000" },
  ];

  return (
    <div id="orders-page" className="p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-teks">Order List</h1>
        <span className="text-gray-400">Dashboard / Orders</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-garis">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-teks-samping">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Menu</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t border-garis hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-biru">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.menu}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${order.status === 'Completed' ? 'bg-green-100 text-hijau' : 
                      order.status === 'Pending' ? 'bg-yellow-100 text-kuning' : 'bg-red-100 text-merah'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 font-bold">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}