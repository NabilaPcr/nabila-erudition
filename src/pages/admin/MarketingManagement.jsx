import React, { useState } from 'react';

// SVG Icons
const TagIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const FileTextIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const StarIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const dummyPromos = [
  { id: 1, code: 'SEHAT10', type: 'persen', value: 10, target: 'semua', active: true, start: '2026-07-01', end: '2026-07-31', limit: 100, used: 23 },
  { id: 2, code: 'MEMBER20', type: 'persen', value: 20, target: 'member', active: true, start: '2026-07-01', end: '2026-07-15', limit: 50, used: 18 },
  { id: 3, code: 'VIP50K', type: 'nominal', value: 50000, target: 'vip', active: false, start: '2026-06-01', end: '2026-06-30', limit: 30, used: 30 },
];

const dummyArticles = [
  { id: 1, title: 'Tips Menjaga Kesehatan di Musim Hujan', category: 'Kesehatan', date: '2026-07-01', status: 'published' },
  { id: 2, title: '10 Obat yang Wajib Ada di Rumah', category: 'Edukasi', date: '2026-06-28', status: 'published' },
  { id: 3, title: 'Manfaat Vitamin C untuk Imunitas', category: 'Nutrisi', date: '2026-06-20', status: 'draft' },
];

const dummyDoctors = [
  { id: 1, name: 'Dr. Sari Wulandari', speciality: 'Apoteker', online: true, image: 'https://i.pravatar.cc/150?img=47' },
  { id: 2, name: 'Dr. Budi Santoso', speciality: 'Dokter Umum', online: true, image: 'https://i.pravatar.cc/150?img=12' },
  { id: 3, name: 'Dr. Rina Kusuma', speciality: 'Dokter Anak', online: false, image: 'https://i.pravatar.cc/150?img=32' },
];

const dummyTestimonials = [
  { id: 1, name: 'Budi S.', text: 'Pelayanan sangat memuaskan!', rating: 5, visible: true },
  { id: 2, name: 'Siti R.', text: 'Obat selalu tersedia dan harga terjangkau.', rating: 5, visible: true },
  { id: 3, name: 'Ahmad F.', text: 'Kurang puas dengan pengiriman yang lambat.', rating: 3, visible: false },
];

export default function MarketingManagement() {
  const [tab, setTab] = useState('promo');
  const [promos, setPromos] = useState(dummyPromos);
  const [doctors, setDoctors] = useState(dummyDoctors);
  const [testimonials, setTestimonials] = useState(dummyTestimonials);

  const tabs = [
    { id: 'promo', label: 'Promo & Diskon', icon: <TagIcon /> },
    { id: 'article', label: 'Artikel', icon: <FileTextIcon /> },
    { id: 'doctor', label: 'Dokter', icon: <UserIcon /> },
    { id: 'testimonial', label: 'Testimoni', icon: <StarIcon /> },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in w-full">
      {/* Tabs */}
      <div className="bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm inline-flex gap-1 self-start overflow-x-auto w-full sm:w-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 border-none whitespace-nowrap
              ${tab === t.id ? 'text-white shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'}
            `}
            style={tab === t.id ? { background: 'linear-gradient(135deg, #22c55e, #15803d)', boxShadow: '0 4px 10px rgba(34,197,94,0.2)' } : {}}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Promo ─────────────────────────────────── */}
      {tab === 'promo' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-gray-900 m-0">Daftar Kode Promo</h3>
              <p className="text-xs text-gray-400 m-0 mt-0.5">Kelola voucher dan diskon untuk pelanggan</p>
            </div>
            <button className="px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center gap-2 transition-transform hover:scale-105 shadow-sm"
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
              <PlusIcon /> Tambah Promo
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {promos.map((p) => (
              <div key={p.id} className={`bg-white rounded-2xl p-5 transition-shadow border shadow-sm ${p.active ? 'border-green-200 shadow-green-500/10' : 'border-gray-200'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xl font-black font-mono tracking-widest" style={{ color: '#16a34a' }}>{p.code}</div>
                    <div className="text-xs font-semibold text-gray-500 mt-1">
                      {p.type === 'persen' ? `Diskon ${p.value}%` : `Potongan Rp ${p.value.toLocaleString('id-ID')}`}
                    </div>
                  </div>
                  <button
                    onClick={() => setPromos(prev => prev.map(x => x.id === p.id ? { ...x, active: !x.active } : x))}
                    className={`w-11 h-6 rounded-full border-none cursor-pointer relative transition-colors ${p.active ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${p.active ? 'left-[22px]' : 'left-1'}`} />
                  </button>
                </div>
                <div className="text-xs font-medium text-gray-500 mb-2">
                  Target: <span className="font-bold text-gray-800 capitalize">{p.target}</span>
                </div>
                <div className="text-xs font-medium text-gray-500 mb-4">
                  Periode: {p.start} s/d {p.end}
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-semibold text-gray-500">Klaim Terpakai</span>
                    <span className="text-[11px] font-extrabold text-gray-800">{p.used} / {p.limit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(p.used / p.limit) * 100}%`, background: '#22c55e' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Articles ────────────────────────────── */}
      {tab === 'article' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-gray-900 m-0">Konten Artikel</h3>
              <p className="text-xs text-gray-400 m-0 mt-0.5">Kelola artikel edukasi kesehatan</p>
            </div>
            <button className="px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center gap-2 transition-transform hover:scale-105 shadow-sm"
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
              <PlusIcon /> Tambah Artikel
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Judul Artikel', 'Kategori', 'Tanggal', 'Status', 'Aksi'].map(h => (
                      <th key={h} className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dummyArticles.map(a => (
                    <tr key={a.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                      <td className="px-5 py-4 text-sm font-bold text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600"><FileTextIcon /></span> {a.title}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">{a.category}</span>
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-gray-500 whitespace-nowrap">{a.date}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-max border ${
                          a.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {a.status === 'published' ? <><CheckCircleIcon /> Published</> : <><ClockIcon /> Draft</>}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button className="bg-white border border-gray-200 hover:border-blue-500 text-gray-600 hover:text-blue-600 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">Edit</button>
                          <button className="bg-white border border-gray-200 hover:border-red-500 text-gray-600 hover:text-red-600 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Doctors ──────────────────────────────── */}
      {tab === 'doctor' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-gray-900 m-0">Dokter Konsultasi</h3>
              <p className="text-xs text-gray-400 m-0 mt-0.5">Kelola status aktif dokter untuk telekonsultasi</p>
            </div>
            <button className="px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer flex items-center gap-2 transition-transform hover:scale-105 shadow-sm"
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
              <PlusIcon /> Tambah Dokter
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {doctors.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <img src={d.image} alt={d.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-50" />
                <div className="mb-5">
                  <div className="font-bold text-gray-900 text-sm mb-1">{d.name}</div>
                  <div className="text-xs font-semibold text-gray-400">{d.speciality}</div>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <span className={`w-2 h-2 rounded-full ${d.online ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                    <span className={`text-[11px] font-bold ${d.online ? 'text-green-600' : 'text-gray-400'}`}>
                      {d.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 justify-center">
                  <button className="flex-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer shadow-sm">
                    Edit
                  </button>
                  <button
                    onClick={() => setDoctors(prev => prev.map(x => x.id === d.id ? { ...x, online: !x.online } : x))}
                    className={`flex-1 font-bold px-3 py-2 rounded-xl text-xs transition-colors border-none cursor-pointer shadow-sm ${
                      d.online ? 'bg-amber-50 hover:bg-amber-100 text-amber-700' : 'bg-green-50 hover:bg-green-100 text-green-700'
                    }`}>
                    {d.online ? 'Set Offline' : 'Set Online'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Testimonials ─────────────────────────── */}
      {tab === 'testimonial' && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {testimonials.map((t) => (
            <div key={t.id} className={`bg-white rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm ${t.visible ? 'border-green-200 shadow-green-500/5' : 'border-gray-100'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm leading-none mb-1">{t.name}</div>
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(t.rating)].map((_, si) => <StarIcon key={si} />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600 italic m-0">"{t.text}"</p>
              </div>
              <div className="flex gap-2 items-center sm:ml-4 shrink-0">
                <button
                  onClick={() => setTestimonials(prev => prev.map(x => x.id === t.id ? { ...x, visible: !x.visible } : x))}
                  className={`font-bold px-4 py-2.5 rounded-xl text-xs transition-colors border-none cursor-pointer flex items-center gap-2 ${
                    t.visible ? 'bg-green-50 hover:bg-green-100 text-green-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}>
                  {t.visible ? <><EyeIcon /> Tampil</> : <><EyeOffIcon /> Disembunyikan</>}
                </button>
                <button className="bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
