import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PackageIcon = () => (
  <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const demoOrders = [
  {
    id: 'TRX-20260705001-001',
    date: '5 Jul 2026',
    items: [
      { name: 'Paracetamol 500mg', qty: 2, price: 15000, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&q=80' },
      { name: 'Vitamin C 1000mg', qty: 1, price: 45000, img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&q=80' },
    ],
    total: 75000,
    status: 'selesai',
  },
  {
    id: 'TRX-20260703002-002',
    date: '3 Jul 2026',
    items: [
      { name: 'Hand Sanitizer 500ml', qty: 1, price: 20000, img: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=100&q=80' },
      { name: 'Masker Medis 3ply', qty: 2, price: 25000, img: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=100&q=80' },
    ],
    total: 70000,
    status: 'dikirim',
  },
  {
    id: 'TRX-20260701003-003',
    date: '1 Jul 2026',
    items: [
      { name: 'Suplemen Imun Tablet', qty: 1, price: 120000, img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&q=80' },
    ],
    total: 120000,
    status: 'diproses',
  },
  {
    id: 'TRX-20260625004-004',
    date: '25 Jun 2026',
    items: [
      { name: 'Thermometer Digital', qty: 1, price: 75000, img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=100&q=80' },
    ],
    total: 75000,
    status: 'dibatalkan',
  },
];

const statusConfig = {
  selesai:    { label: 'Selesai',    bg: '#f0fdf4', text: '#16a34a', dot: '#22c55e' },
  dikirim:    { label: 'Dikirim',    bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  diproses:   { label: 'Diproses',  bg: '#fffbeb', text: '#92400e', dot: '#f59e0b' },
  dibatalkan: { label: 'Dibatalkan',bg: '#fef2f2', text: '#991b1b', dot: '#ef4444' },
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('semua');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = filterStatus === 'semua'
    ? demoOrders
    : demoOrders.filter(o => o.status === filterStatus);

  const filters = [
    { value: 'semua',    label: 'Semua' },
    { value: 'diproses', label: 'Diproses' },
    { value: 'dikirim',  label: 'Dikirim' },
    { value: 'selesai',  label: 'Selesai' },
    { value: 'dibatalkan', label: 'Dibatalkan' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 m-0">Riwayat Pesanan</h1>
        <p className="text-sm text-gray-400 m-0 mt-1">Pantau status dan riwayat pesanan Anda</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilterStatus(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all cursor-pointer ${
              filterStatus === f.value
                ? 'text-white border-transparent'
                : 'text-gray-600 border-gray-200 bg-white hover:bg-gray-50'
            }`}
            style={filterStatus === f.value ? { background: 'linear-gradient(135deg, #22c55e, #15803d)', borderColor: 'transparent' } : {}}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
          <div className="flex justify-center text-gray-200 mb-4"><PackageIcon /></div>
          <h3 className="font-bold text-gray-700 mb-1">Belum ada pesanan</h3>
          <p className="text-sm text-gray-400 mb-6">Anda belum pernah melakukan pemesanan obat.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white border-none cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(order => {
            const cfg = statusConfig[order.status];
            const isExpanded = expandedId === order.id;

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <div>
                    <p className="text-xs font-bold text-gray-400 m-0">Nomor Pesanan</p>
                    <p className="text-sm font-bold text-gray-700 m-0 mt-0.5">{order.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{order.date}</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                      style={{ background: cfg.bg, color: cfg.text }}>
                      {cfg.label}
                    </span>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="px-5 py-4">
                  <p className="text-xs text-gray-400 font-medium mb-2">{order.items.length} produk</p>
                  {(isExpanded ? order.items : order.items.slice(0, 2)).map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-3">
                        <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0" />
                        <div>
                          <p className="text-sm text-gray-700 font-bold m-0">{item.name}</p>
                          <p className="text-xs text-gray-400 font-medium m-0 mt-0.5">x{item.qty}</p>
                        </div>
                      </div>
                      <p className="text-sm font-extrabold text-gray-900 m-0">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <button onClick={() => setExpandedId(isExpanded ? null : order.id)}
                      className="text-xs text-green-600 font-semibold mt-1 bg-transparent border-none cursor-pointer hover:text-green-700 transition-colors">
                      {isExpanded ? 'Sembunyikan' : `+${order.items.length - 2} produk lainnya`}
                    </button>
                  )}
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50 bg-gray-50/50">
                  <div>
                    <p className="text-xs text-gray-400 font-medium m-0">Total Pembayaran</p>
                    <p className="text-base font-extrabold m-0 mt-0.5" style={{ color: '#16a34a' }}>
                      Rp {order.total.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'selesai' && (
                      <button className="px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
                        Beli Lagi
                      </button>
                    )}
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
