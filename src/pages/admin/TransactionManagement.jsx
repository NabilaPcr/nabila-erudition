import React, { useState } from 'react';

const dummyTransactions = [
  { id: 'TRX-001', customer: 'Budi Santoso', type: 'online', items: [{ name: 'Paracetamol 500mg', qty: 2, price: 15000 }, { name: 'Vitamin C', qty: 1, price: 45000 }], total: 75000, status: 'pending', date: '2026-07-02 14:32', approver: null },
  { id: 'TRX-002', customer: 'Siti Rahayu', type: 'kasir', items: [{ name: 'Amoxicillin 500mg', qty: 1, price: 35000 }], total: 35000, status: 'selesai', date: '2026-07-02 13:15', approver: 'Admin' },
  { id: 'TRX-003', customer: 'Ahmad Fauzi', type: 'online', items: [{ name: 'Vitamin B Complex', qty: 2, price: 55000 }, { name: 'Suplemen Imun', qty: 1, price: 120000 }], total: 230000, status: 'proses', date: '2026-07-02 12:50', approver: 'Apoteker' },
  { id: 'TRX-004', customer: 'Dewi Lestari', type: 'kasir', items: [{ name: 'Antasida Doen', qty: 3, price: 12000 }], total: 36000, status: 'selesai', date: '2026-07-02 11:20', approver: 'Kasir' },
  { id: 'TRX-005', customer: 'Eko Prasetyo', type: 'online', items: [{ name: 'Obat Batuk', qty: 1, price: 35000 }], total: 35000, status: 'ditolak', date: '2026-07-02 10:05', approver: 'Admin' },
  { id: 'TRX-006', customer: 'Fitri Handayani', type: 'kasir', items: [{ name: 'Tensimeter', qty: 1, price: 250000 }], total: 250000, status: 'pending', date: '2026-07-01 16:45', approver: null },
];

const statusCfg = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: ' Pending' },
  proses:  { bg: 'bg-blue-100', text: 'text-blue-800', label: ' Diproses' },
  selesai: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: ' Selesai' },
  ditolak: { bg: 'bg-red-100', text: 'text-red-800', label: ' Ditolak' },
};

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [filter, setFilter] = useState('');
  const [type, setType] = useState('');
  const [detail, setDetail] = useState(null);

  const filtered = transactions.filter(t => {
    return (!filter || t.status === filter) && (!type || t.type === type);
  });

  const updateStatus = (id, newStatus) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, status: newStatus, approver: 'Admin' } : t)
    );
    if (detail?.id === id) setDetail(prev => ({ ...prev, status: newStatus }));
  };

  const statCards = [
    { label: 'Total', value: transactions.length, icon: '', color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Pending', value: transactions.filter(t => t.status === 'pending').length, icon: '', color: 'text-amber-500 bg-amber-50' },
    { label: 'Selesai', value: transactions.filter(t => t.status === 'selesai').length, icon: '', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Ditolak', value: transactions.filter(t => t.status === 'ditolak').length, icon: '', color: 'text-red-500 bg-red-50' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="m-0 text-xl font-extrabold text-gray-900">Transaksi Penjualan</h2>
        <p className="m-0 mt-1 text-sm text-gray-500">Kelola semua transaksi online dan kasir</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="proses">Diproses</option>
            <option value="selesai">Selesai</option>
            <option value="ditolak">Ditolak</option>
          </select>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="">Semua Tipe</option>
            <option value="online">Online</option>
            <option value="kasir">Kasir</option>
          </select>
        </div>
        <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-5 py-2.5 text-sm font-bold cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-2">
          <span></span> Transaksi Manual
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {['ID Transaksi', 'Pelanggan', 'Tipe', 'Total', 'Status', 'Approver', 'Tanggal', 'Aksi'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((t) => {
                const s = statusCfg[t.status];
                return (
                  <tr key={t.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-5 py-3.5 text-xs font-extrabold text-emerald-600 whitespace-nowrap">{t.id}</td>
                    <td className="px-5 py-3.5 text-xs font-bold text-gray-700 whitespace-nowrap">{t.customer}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`inline-flex text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                        t.type === 'online' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-50 text-gray-600 border-gray-100'
                      }`}>
                        {t.type === 'online' ? ' Online' : ' Kasir'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-extrabold text-gray-900 whitespace-nowrap">Rp {t.total.toLocaleString('id-ID')}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`inline-flex text-[10px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">{t.approver || '—'}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">{t.date}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex gap-1.5">
                        <button onClick={() => setDetail(t)} className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-md px-2.5 py-1.5 cursor-pointer font-bold transition-colors">Detail</button>
                        {t.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(t.id, 'proses')} className="text-[10px] text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-md px-2.5 py-1.5 cursor-pointer font-bold transition-colors">Proses</button>
                            <button onClick={() => updateStatus(t.id, 'ditolak')} className="text-[10px] text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 rounded-md px-2.5 py-1.5 cursor-pointer font-bold transition-colors">Tolak</button>
                          </>
                        )}
                        {t.status === 'proses' && (
                          <button onClick={() => updateStatus(t.id, 'selesai')} className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-md px-2.5 py-1.5 cursor-pointer font-bold transition-colors">Selesai</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-10 text-center text-gray-400 font-medium text-sm">Tidak ada transaksi yang ditemukan.</div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="m-0 text-xl font-extrabold text-gray-900">Detail Transaksi</h3>
                <p className="m-0 text-sm text-emerald-600 font-bold">{detail.id}</p>
              </div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors text-sm"></button>
            </div>

            <div className="flex flex-col gap-3 mb-5">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase">Pelanggan</span>
                <span className="text-sm font-bold text-gray-900">{detail.customer}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase">Tipe</span>
                <span className="text-sm font-bold text-gray-900 capitalize">{detail.type}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusCfg[detail.status].bg} ${statusCfg[detail.status].text}`}>
                  {statusCfg[detail.status].label}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">Item Obat</p>
              <div className="flex flex-col gap-2">
                {detail.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-xs font-semibold text-gray-700"> {item.name} <span className="text-gray-400">× {item.qty}</span></span>
                    <span className="text-xs font-extrabold text-gray-900">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <span className="text-sm font-extrabold text-gray-900">Total Pembayaran</span>
              <span className="text-lg font-extrabold text-emerald-600">Rp {detail.total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
