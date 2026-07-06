import React, { useState } from 'react';

export default function ReportsAnalytics() {
  const [period, setPeriod] = useState('bulan');
  
  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="m-0 text-xl font-extrabold text-gray-900">Laporan & Analitik</h2>
          <p className="m-0 mt-1 text-sm text-gray-500">Ringkasan performa dan penjualan apotek</p>
        </div>
        <select 
          value={period} 
          onChange={e => setPeriod(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="hari">Hari Ini</option>
          <option value="minggu">Minggu Ini</option>
          <option value="bulan">Bulan Ini</option>
          <option value="tahun">Tahun Ini</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pendapatan', value: 'Rp 84.500.000', icon: '', colorClass: 'text-emerald-500 bg-emerald-50' },
          { label: 'Total Transaksi', value: '342', icon: '', colorClass: 'text-blue-500 bg-blue-50' },
          { label: 'Produk Terjual', value: '1.240', icon: '', colorClass: 'text-purple-500 bg-purple-50' },
          { label: 'Member Baru', value: '24', icon: '', colorClass: 'text-amber-500 bg-amber-50' },
        ].map((s, i) => (
          <div key={i} className="card-modern flex items-center gap-4 p-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${s.colorClass}`}>
              {s.icon}
            </div>
            <div>
              <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
              <div className="text-xs font-semibold text-gray-500 mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-modern p-6">
          <h3 className="m-0 mb-4 text-base font-extrabold text-gray-900">Penjualan (7 Hari Terakhir)</h3>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center text-sm font-medium text-gray-400 border border-dashed border-gray-200">
            [ Area Grafik Recharts ]
          </div>
        </div>
        <div className="card-modern p-6">
          <h3 className="m-0 mb-4 text-base font-extrabold text-gray-900">Top 5 Obat Terlaris</h3>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Paracetamol 500mg', qty: 145, total: 'Rp 2.175.000' },
              { name: 'Vitamin C 1000mg', qty: 98, total: 'Rp 4.410.000' },
              { name: 'Amoxicillin 500mg', qty: 76, total: 'Rp 2.660.000' },
              { name: 'Antasida Doen', qty: 54, total: 'Rp 648.000' },
              { name: 'Cetirizine 10mg', qty: 42, total: 'Rp 924.000' },
            ].map((o, i) => (
              <div key={i} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-6 font-extrabold text-emerald-500 text-lg">#{i+1}</div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{o.name}</div>
                    <div className="text-xs font-medium text-gray-500">Terjual {o.qty} item</div>
                  </div>
                </div>
                <div className="text-sm font-extrabold text-gray-900">{o.total}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
