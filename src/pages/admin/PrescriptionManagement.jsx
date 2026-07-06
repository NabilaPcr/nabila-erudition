import React, { useState } from 'react';

const dummyPrescriptions = [
  { id: 'RES-001', patient: 'Budi Santoso', date: '2026-07-02 09:15', status: 'pending', doctor: null, image: '', notes: 'Resep rutin bulanan', recommendations: [] },
  { id: 'RES-002', patient: 'Siti Rahayu', date: '2026-07-01 14:30', status: 'diproses', doctor: 'Dr. Budi Santoso', image: '', notes: 'Resep antibiotik', recommendations: ['Amoxicillin 500mg', 'Paracetamol 500mg'] },
  { id: 'RES-003', patient: 'Ahmad Fauzi', date: '2026-07-01 11:00', status: 'selesai', doctor: 'Dr. Rina Kusuma', image: '', notes: 'Resep vitamin', recommendations: ['Vitamin C 1000mg', 'Vitamin B Complex'] },
  { id: 'RES-004', patient: 'Dewi Lestari', date: '2026-06-30 16:20', status: 'ditolak', doctor: null, image: '', notes: 'Resep tidak terbaca dengan jelas', recommendations: [] },
  { id: 'RES-005', patient: 'Eko Prasetyo', date: '2026-06-30 08:45', status: 'pending', doctor: null, image: '', notes: '', recommendations: [] },
];

const dummyMeds = ['Paracetamol 500mg', 'Amoxicillin 500mg', 'Vitamin C 1000mg', 'Ibuprofen 400mg', 'Antasida Doen', 'Cetirizine 10mg', 'OBH Combi', 'Curcuma Plus'];

const statusCfg = {
  pending:   { bg: 'bg-amber-100', text: 'text-amber-800', label: ' Pending' },
  diproses:  { bg: 'bg-blue-100', text: 'text-blue-800', label: ' Diproses' },
  selesai:   { bg: 'bg-emerald-100', text: 'text-emerald-800', label: ' Selesai' },
  ditolak:   { bg: 'bg-red-100', text: 'text-red-800', label: ' Ditolak' },
};

export default function PrescriptionManagement() {
  const [prescriptions, setPrescriptions] = useState(dummyPrescriptions);
  const [filter, setFilter] = useState('');
  const [detail, setDetail] = useState(null);
  const [recInput, setRecInput] = useState('');

  const filtered = prescriptions.filter(p => !filter || p.status === filter);

  const updateStatus = (id, status) => {
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    if (detail?.id === id) setDetail(prev => ({ ...prev, status }));
  };

  const addRecommendation = (id) => {
    if (!recInput.trim()) return;
    const newRec = recInput.trim();
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, recommendations: [...p.recommendations, newRec] } : p));
    if (detail?.id === id) setDetail(prev => ({ ...prev, recommendations: [...prev.recommendations, newRec] }));
    setRecInput('');
  };

  const deleteRec = (presId, idx) => {
    setPrescriptions(prev => prev.map(p => p.id === presId ? { ...p, recommendations: p.recommendations.filter((_, i) => i !== idx) } : p));
    if (detail?.id === presId) setDetail(prev => ({ ...prev, recommendations: prev.recommendations.filter((_, i) => i !== idx) }));
  };

  const statCards = [
    { label: 'Total Resep', value: prescriptions.length, icon: '', color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Pending', value: prescriptions.filter(p => p.status === 'pending').length, icon: '', color: 'text-amber-500 bg-amber-50' },
    { label: 'Diproses', value: prescriptions.filter(p => p.status === 'diproses').length, icon: '', color: 'text-blue-500 bg-blue-50' },
    { label: 'Selesai', value: prescriptions.filter(p => p.status === 'selesai').length, icon: '', color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="m-0 text-xl font-extrabold text-gray-900">Manajemen Resep</h2>
        <p className="m-0 mt-1 text-sm text-gray-500">Kelola dan proses resep yang diunggah pelanggan</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${s.color}`}>{s.icon}</div>
            <div>
              <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-3 shadow-sm">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
          <option value="ditolak">Ditolak</option>
        </select>
        <span className="text-xs font-semibold text-gray-400 self-center">
          Menampilkan {filtered.length} dari {prescriptions.length} resep
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((p) => {
          const s = statusCfg[p.status];
          return (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-extrabold text-emerald-600">{p.id}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{p.date}</div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
              </div>

              {/* Preview area */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center border border-gray-100">
                <div className="text-4xl mb-1">{p.image}</div>
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">File Resep</div>
              </div>

              <div className="flex flex-col gap-2 flex-1 mb-4">
                <div className="text-xs text-gray-700"><span className="font-bold">Pasien:</span> {p.patient}</div>
                {p.doctor && <div className="text-xs text-gray-500"><span className="font-bold">Dokter:</span> {p.doctor}</div>}
                {p.notes && <div className="text-xs text-gray-400 italic">"{p.notes}"</div>}
                {p.recommendations.length > 0 && (
                  <div className="mt-2">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Rekomendasi Obat</div>
                    <div className="flex flex-wrap gap-1">
                      {p.recommendations.map((r, ri) => (
                        <span key={ri} className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 flex-wrap mt-auto">
                <button onClick={() => setDetail(p)} className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors">
                  Detail & Rekomendasi
                </button>
                {p.status === 'pending' && (
                  <>
                    <button onClick={() => updateStatus(p.id, 'diproses')} className="text-[10px] text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors">Proses</button>
                    <button onClick={() => updateStatus(p.id, 'ditolak')} className="text-[10px] text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors">Tolak</button>
                  </>
                )}
                {p.status === 'diproses' && (
                  <button onClick={() => updateStatus(p.id, 'selesai')} className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors">Selesai</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="m-0 text-xl font-extrabold text-gray-900">Resep {detail.id}</h3>
                <p className="m-0 mt-0.5 text-xs text-gray-400">{detail.date}</p>
              </div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors text-sm"></button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Pasien</span>
                <span className="text-sm font-extrabold text-gray-900">{detail.patient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusCfg[detail.status].bg} ${statusCfg[detail.status].text}`}>
                  {statusCfg[detail.status].label}
                </span>
              </div>
            </div>

            {/* Tambah rekomendasi */}
            <div className="mb-5">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-3">Tambah Rekomendasi Obat</p>
              <div className="flex gap-2">
                <select
                  value={recInput}
                  onChange={e => setRecInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="">Pilih obat...</option>
                  {dummyMeds.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <button
                  onClick={() => addRecommendation(detail.id)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Tambah
                </button>
              </div>
            </div>

            {/* List rekomendasi */}
            {detail.recommendations.length > 0 && (
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide mb-3">Rekomendasi Obat ({detail.recommendations.length})</p>
                <div className="flex flex-col gap-2">
                  {detail.recommendations.map((r, ri) => (
                    <div key={ri} className="flex justify-between items-center bg-white rounded-xl px-3 py-2.5 border border-emerald-100 shadow-sm">
                      <span className="text-xs font-bold text-gray-700"> {r}</span>
                      <button onClick={() => deleteRec(detail.id, ri)} className="text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer text-sm transition-colors ml-2 shrink-0"></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
