import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// SVG Icons
const PillIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10.5 20.5L3.5 13.5a5 5 0 017.07-7.07l7 7a5 5 0 01-7.07 7.07z"/>
    <line x1="8.5" y1="11.5" x2="15.5" y2="4.5"/>
  </svg>
);
const CartIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/>
  </svg>
);
const TrendIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const ExternalLinkIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ── Dummy data ─────────────────────────────────────────────
// Last 7 days sales (Rp millions)
const salesChartData = [
  { day: '29 Jun', val: 1.2 },
  { day: '30 Jun', val: 2.8 },
  { day: '01 Jul', val: 1.9 },
  { day: '02 Jul', val: 0.8 },
  { day: '03 Jul', val: 0.5 },
  { day: '04 Jul', val: 0.3 },
  { day: '05 Jul', val: 0.1 },
];

const recentTransactions = [
  { id: 'TRX-20260629361707-728', customer: 'FATHUR RAHMAN', kasir: 'FATHUR RAHMAN', total: 'Rp 12', status: 'selesai' },
  { id: 'TRX-20260625169217-381', customer: 'FATHUR RAHMAN', kasir: 'FATHUR RAHMAN', total: 'Rp 12', status: 'selesai' },
  { id: 'TRX-20260623541203-992', customer: 'Budi Santoso', kasir: 'FATHUR RAHMAN', total: 'Rp 145.000', status: 'proses' },
  { id: 'TRX-20260621234512-441', customer: 'Rina Kusuma', kasir: 'Admin Demo', total: 'Rp 35.000', status: 'pending' },
];

const lowStockItems = [
  { name: 'Paracetamol 500mg', stock: 8, min: 20 },
  { name: 'Amoxicillin 500mg', stock: 5, min: 15 },
  { name: 'Vitamin C 1000mg', stock: 12, min: 25 },
];

const statusBadge = {
  selesai: { bg: '#f0fdf4', text: '#15803d', label: 'Selesai' },
  pending: { bg: '#fffbeb', text: '#92400e', label: 'Pending' },
  proses:  { bg: '#eff6ff', text: '#1e40af', label: 'Proses' },
  ditolak: { bg: '#fef2f2', text: '#991b1b', label: 'Ditolak' },
};

// ── Simple Area Chart ──────────────────────────────────────
function AreaChart({ data }) {
  const max = Math.max(...data.map(d => d.val));
  const h = 140;
  const w = 600;
  const padX = 40;
  const padY = 20;
  const chartW = w - padX * 2;
  const chartH = h - padY * 2;

  const points = data.map((d, i) => ({
    x: padX + (i / (data.length - 1)) * chartW,
    y: padY + (1 - d.val / (max * 1.2)) * chartH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padY + chartH} L ${points[0].x} ${padY + chartH} Z`;

  return (
    <div className="relative w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full" style={{ minWidth: '300px' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padY + t * chartH;
          return (
            <g key={i}>
              <line x1={padX} y1={y} x2={w - padX} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              <text x={padX - 5} y={y + 4} fontSize="9" fill="#9ca3af" textAnchor="end">
                {((max * 1.2 * (1 - t)) / 1).toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#22c55e" stroke="white" strokeWidth="2" />
        ))}

        {/* X axis labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={h + 15} fontSize="9" fill="#9ca3af" textAnchor="middle">
            {p.day}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();

  const stats = [
    {
      label: 'Total Obat',
      value: '2',
      sub: 'Jenis obat tersedia',
      icon: <PillIcon />,
      iconBg: 'rgba(59,130,246,0.1)',
      iconColor: '#3b82f6',
    },
    {
      label: 'Penjualan Hari Ini',
      value: 'Rp 0',
      sub: '0 transaksi',
      icon: <CartIcon />,
      iconBg: 'rgba(34,197,94,0.1)',
      iconColor: '#22c55e',
    },
    {
      label: 'Penjualan Bulan Ini',
      value: 'Rp 0',
      sub: 'Total bulan berjalan',
      icon: <TrendIcon />,
      iconBg: 'rgba(168,85,247,0.1)',
      iconColor: '#a855f7',
    },
    {
      label: 'Stok Menipis',
      value: '0',
      sub: 'Perlu segera restock',
      icon: <AlertIcon />,
      iconBg: 'rgba(245,158,11,0.1)',
      iconColor: '#f59e0b',
      alert: true,
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* ── Page Header ───────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 m-0">Dashboard Apotek</h2>
          <p className="text-sm text-gray-400 m-0">Ringkasan aktivitas apotek hari ini</p>
        </div>
      </div>

      {/* ── Stats Grid ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 m-0">{s.label}</p>
                <p className="text-2xl font-extrabold text-gray-900 m-0 mt-1">{s.value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: s.iconBg, color: s.iconColor }}>
                {s.icon}
              </div>
            </div>
            <p className="text-xs font-medium m-0" style={{ color: s.alert ? '#f59e0b' : '#22c55e' }}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── Middle Row ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900 m-0">Penjualan 7 Hari Terakhir</h3>
              <p className="text-xs text-gray-400 m-0 mt-0.5">Nilai penjualan dalam Rp juta</p>
            </div>
          </div>
          <AreaChart data={salesChartData} />
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-bold text-gray-900 m-0 flex items-center gap-2">
              <span className="text-amber-500"><AlertIcon /></span>
              Stok Menipis
            </h3>
          </div>

          {lowStockItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-300 mb-2 flex justify-center">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400">Semua stok aman</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {lowStockItems.map((item, i) => {
                const pct = Math.round((item.stock / item.min) * 100);
                const isCritical = item.stock <= 5;
                return (
                  <div key={i} className="p-3 rounded-xl border" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-700 truncate pr-2">{item.name}</span>
                      <span className="text-xs font-bold shrink-0" style={{ color: isCritical ? '#dc2626' : '#d97706' }}>
                        {item.stock}
                      </span>
                    </div>
                    <div className="bg-white rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: isCritical ? '#ef4444' : '#f59e0b' }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">Min: {item.min}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Recent Transactions ────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900 m-0">Transaksi Terbaru</h3>
          <button
            onClick={() => navigate('/transactions')}
            className="flex items-center gap-1.5 text-xs text-green-600 font-bold bg-transparent border-none cursor-pointer hover:text-green-700 transition-colors"
          >
            Lihat semua <ExternalLinkIcon />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['KODE', 'PEMBELI', 'KASIR', 'TOTAL'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, i) => {
                const s = statusBadge[tx.status];
                return (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold whitespace-nowrap" style={{ color: '#22c55e' }}>
                      {tx.id}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-700 whitespace-nowrap">
                      {tx.customer}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold whitespace-nowrap" style={{ color: '#22c55e' }}>
                      {tx.kasir}
                    </td>
                    <td className="px-6 py-4 text-xs font-extrabold text-gray-900 whitespace-nowrap">
                      {tx.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
