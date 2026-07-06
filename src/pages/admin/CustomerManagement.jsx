import React, { useState } from 'react';

const dummyCustomers = [
  { id: 1, name: 'Budi Santoso', email: 'budi@email.com', phone: '0812-3456-7890', gender: 'L', transactions: 18, total: 1850000, status: 'member', tier: 'Silver', segment: 'Sering', ktp: '3201010101010001' },
  { id: 2, name: 'Siti Rahayu', email: 'siti@email.com', phone: '0813-2345-6789', gender: 'P', transactions: 45, total: 5200000, status: 'member', tier: 'Gold', segment: 'Sangat Sering', ktp: '3201010101010002' },
  { id: 3, name: 'Ahmad Fauzi', email: 'ahmad@email.com', phone: '0822-3456-7890', gender: 'L', transactions: 3, total: 275000, status: 'regular', tier: 'Bronze', segment: 'Jarang', ktp: '3201010101010003' },
  { id: 4, name: 'Dewi Lestari', email: 'dewi@email.com', phone: '0856-7890-1234', gender: 'P', transactions: 72, total: 12500000, status: 'vip', tier: 'Platinum', segment: 'Sangat Sering', ktp: '3201010101010004' },
  { id: 5, name: 'Eko Prasetyo', email: 'eko@email.com', phone: '0878-9012-3456', gender: 'L', transactions: 9, total: 780000, status: 'member', tier: 'Bronze', segment: 'Jarang', ktp: '3201010101010005' },
  { id: 6, name: 'Fitri Handayani', email: 'fitri@email.com', phone: '0821-1234-5678', gender: 'P', transactions: 31, total: 3100000, status: 'member', tier: 'Silver', segment: 'Sering', ktp: '3201010101010006' },
];

const tierBadge = {
  Bronze:   'bg-amber-100 text-amber-800',
  Silver:   'bg-slate-100 text-slate-600',
  Gold:     'bg-yellow-100 text-yellow-800',
  Platinum: 'bg-purple-100 text-purple-800',
};

const segmentBadge = {
  'Jarang':        'bg-red-100 text-red-800',
  'Sering':        'bg-blue-100 text-blue-800',
  'Sangat Sering': 'bg-emerald-100 text-emerald-800',
};

const statusBadge = {
  regular: { bg: 'bg-gray-100 text-gray-700', label: 'Regular' },
  member:  { bg: 'bg-blue-100 text-blue-800', label: 'Member' },
  vip:     { bg: 'bg-purple-100 text-purple-800', label: 'VIP' },
};

export default function CustomerManagement() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSegment, setFilterSegment] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = dummyCustomers.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.email.includes(q) || c.phone.includes(q) || c.ktp.includes(q);
    const matchStatus  = !filterStatus  || c.status === filterStatus;
    const matchSegment = !filterSegment || c.segment === filterSegment;
    return matchSearch && matchStatus && matchSegment;
  });

  const totals = {
    all:    dummyCustomers.length,
    member: dummyCustomers.filter(c => c.status === 'member').length,
    vip:    dummyCustomers.filter(c => c.status === 'vip').length,
    regular:dummyCustomers.filter(c => c.status === 'regular').length,
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">

      {/* ── Stats ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pelanggan', value: totals.all, icon: '', colorClass: 'text-emerald-500 bg-emerald-50' },
          { label: 'Member', value: totals.member, icon: '', colorClass: 'text-blue-500 bg-blue-50' },
          { label: 'VIP', value: totals.vip, icon: '', colorClass: 'text-purple-500 bg-purple-50' },
          { label: 'Regular', value: totals.regular, icon: '', colorClass: 'text-gray-500 bg-gray-50' },
        ].map((s, i) => (
          <div key={i} className="card-modern flex items-center gap-4 p-5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${s.colorClass}`}>
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900 leading-tight">{s.value}</div>
              <div className="text-xs font-medium text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ────────────────────────────── */}
      <div className="card-modern flex flex-wrap items-center gap-3 p-4">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama, email, no HP, KTP..."
            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 cursor-pointer text-gray-700"
        >
          <option value="">Semua Status</option>
          <option value="regular">Regular</option>
          <option value="member">Member</option>
          <option value="vip">VIP</option>
        </select>
        <select
          value={filterSegment}
          onChange={e => setFilterSegment(e.target.value)}
          className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 cursor-pointer text-gray-700"
        >
          <option value="">Semua Segmen</option>
          <option value="Jarang">Jarang Belanja</option>
          <option value="Sering">Sering Belanja</option>
          <option value="Sangat Sering">Sangat Sering</option>
        </select>
        <button className="btn btn-primary px-4 py-2.5 text-sm rounded-xl">
           Refresh Status
        </button>
      </div>

      {/* ── Detail Panel ───────────────────────── */}
      {selected && (
        <div className="card-modern bg-white border border-emerald-100 shadow-md shadow-emerald-500/10 p-5 animate-fade-in">
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-extrabold text-2xl shadow-sm">
                {selected.name.charAt(0)}
              </div>
              <div>
                <h3 className="m-0 text-lg font-extrabold text-gray-900">{selected.name}</h3>
                <p className="m-0 text-sm text-gray-500">{selected.email} · {selected.phone}</p>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-red-500 transition-colors text-xl font-bold bg-transparent border-none cursor-pointer p-1">
              
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Tier Member', value: selected.tier },
              { label: 'Segmen', value: selected.segment },
              { label: 'Total Belanja', value: `Rp ${selected.total.toLocaleString('id-ID')}` },
              { label: 'Total Transaksi', value: `${selected.transactions}x` },
            ].map((info, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="text-xs text-gray-500 font-semibold mb-1">{info.label}</div>
                <div className="text-base font-extrabold text-gray-900">{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Table ──────────────────────────────── */}
      <div className="card-modern p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h3 className="m-0 text-sm font-extrabold text-gray-900">
            {filtered.length} Pelanggan
          </h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Pelanggan', 'Kontak', 'Segmen', 'Tier', 'Status', 'Total Belanja', 'Transaksi', 'Aksi'].map(h => (
                  <th key={h} className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => {
                const tb = tierBadge[c.tier];
                const sb = segmentBadge[c.segment];
                const stb = statusBadge[c.status];
                return (
                  <tr key={c.id} className="hover:bg-emerald-50/50 transition-colors bg-white">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{c.name}</div>
                          <div className="text-xs text-gray-500">{c.gender === 'L' ? ' Laki-laki' : ' Perempuan'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-700">{c.email}</div>
                      <div className="text-xs text-gray-500">{c.phone}</div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${sb}`}>
                        {c.segment}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${tb}`}>
                        {c.tier}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${stb.bg}`}>
                        {stb.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                      Rp {c.total.toLocaleString('id-ID')}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-gray-600">
                      {c.transactions}x
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <button
                        onClick={() => setSelected(selected?.id === c.id ? null : c)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors border-none cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm bg-white">
              Tidak ada pelanggan yang ditemukan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
