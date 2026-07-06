import React, { useState } from 'react';

const dummyCats = [
  { id: 1, name: 'Antibiotik', description: 'Obat untuk mengatasi infeksi bakteri', total: 12 },
  { id: 2, name: 'Vitamin & Suplemen', description: 'Vitamin dan suplemen kesehatan', total: 18 },
  { id: 3, name: 'Analgetik', description: 'Obat pereda nyeri', total: 8 },
  { id: 4, name: 'Antasida', description: 'Obat gangguan lambung', total: 5 },
  { id: 5, name: 'Antihistamin', description: 'Obat alergi', total: 7 },
  { id: 6, name: 'Alat Kesehatan', description: 'Peralatan medis & kesehatan', total: 15 },
];

export default function CategoryManagement() {
  const [cats, setCats] = useState(dummyCats);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  const openAdd = () => { setForm({ name: '', description: '' }); setEditId(null); setModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, description: c.description }); setEditId(c.id); setModal(true); };
  const handleSave = () => {
    if (editId) {
      setCats(prev => prev.map(c => c.id === editId ? { ...c, ...form } : c));
    } else {
      setCats(prev => [...prev, { ...form, id: Date.now(), total: 0 }]);
    }
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="m-0 text-xl font-extrabold text-gray-900">Kategori Obat</h2>
          <p className="m-0 mt-1 text-sm text-gray-500">Kelola kategori produk apotek</p>
        </div>
        <button 
          onClick={openAdd} 
          className="bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-5 py-2.5 text-sm font-bold cursor-pointer transition-colors shadow-sm flex items-center gap-2"
        >
          <span></span> Tambah Kategori
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cats.map((c, i) => (
          <div key={c.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-emerald-500/20">
                ️
              </div>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(c)} className="text-[10px] text-blue-700 bg-blue-50 hover:bg-blue-100 border-none rounded-md px-2.5 py-1 cursor-pointer font-bold transition-colors">Edit</button>
                <button onClick={() => setCats(prev => prev.filter(x => x.id !== c.id))} className="text-[10px] text-red-700 bg-red-50 hover:bg-red-100 border-none rounded-md px-2.5 py-1 cursor-pointer font-bold transition-colors">Hapus</button>
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="m-0 mb-1.5 text-base font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors">{c.name}</h3>
              <p className="m-0 mb-4 text-xs text-gray-500 leading-relaxed min-h-[36px]">{c.description}</p>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
                <span></span> {c.total} produk
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="m-0 mb-6 text-xl font-extrabold text-gray-900">
              {editId ? 'Edit Kategori' : 'Tambah Kategori'}
            </h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wide">Nama Kategori</label>
                <input 
                  value={form.name} 
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))} 
                  placeholder="Contoh: Antibiotik"
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm outline-none focus:border-emerald-500 transition-colors bg-gray-50 focus:bg-white" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wide">Deskripsi</label>
                <textarea 
                  value={form.description} 
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))} 
                  placeholder="Penjelasan singkat kategori..." 
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm outline-none focus:border-emerald-500 transition-colors resize-y bg-gray-50 focus:bg-white" 
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setModal(false)} 
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl bg-transparent text-gray-700 font-bold text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSave} 
                className="flex-1 py-3 border-2 border-emerald-500 rounded-xl bg-emerald-500 text-white font-bold text-sm cursor-pointer hover:bg-emerald-600 hover:border-emerald-600 transition-colors shadow-sm shadow-emerald-500/30"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
