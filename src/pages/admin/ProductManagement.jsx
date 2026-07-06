import React, { useState } from 'react';

const categories = ['Antibiotik', 'Vitamin', 'Analgetik', 'Antasida', 'Antihistamin', 'Suplemen', 'Alat Kesehatan'];

const dummyProducts = [
  { id: 1, code: 'OBT-001', name: 'Paracetamol 500mg', category: 'Analgetik', price: 15000, stock: 8, minStock: 20, unit: 'Box', status: 'aktif', image: '' },
  { id: 2, code: 'OBT-002', name: 'Amoxicillin 500mg', category: 'Antibiotik', price: 35000, stock: 5, minStock: 15, unit: 'Strip', status: 'aktif', image: '' },
  { id: 3, code: 'OBT-003', name: 'Vitamin C 1000mg', category: 'Vitamin', price: 45000, stock: 45, minStock: 25, unit: 'Botol', status: 'aktif', image: '' },
  { id: 4, code: 'OBT-004', name: 'Antasida Doen', category: 'Antasida', price: 12000, stock: 3, minStock: 10, unit: 'Box', status: 'aktif', image: '' },
  { id: 5, code: 'OBT-005', name: 'Cetirizine 10mg', category: 'Antihistamin', price: 22000, stock: 30, minStock: 20, unit: 'Strip', status: 'aktif', image: '' },
  { id: 6, code: 'OBT-006', name: 'Tensimeter Digital', category: 'Alat Kesehatan', price: 250000, stock: 10, minStock: 5, unit: 'Unit', status: 'aktif', image: '🩺' },
];

const emptyForm = { code: '', name: '', category: '', price: '', stock: '', minStock: '', unit: 'Box', status: 'aktif' };

export default function ProductManagement() {
  const [products, setProducts] = useState(dummyProducts);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q))
      && (!catFilter || p.category === catFilter);
  });

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModal('form'); };
  const openEdit = (p) => {
    setForm({ code: p.code, name: p.name, category: p.category, price: p.price, stock: p.stock, minStock: p.minStock, unit: p.unit, status: p.status });
    setEditId(p.id); setModal('form');
  };
  const handleSave = () => {
    if (editId) {
      setProducts(prev => prev.map(p => p.id === editId ? { ...p, ...form, price: +form.price, stock: +form.stock, minStock: +form.minStock } : p));
    } else {
      setProducts(prev => [...prev, { ...form, id: Date.now(), price: +form.price, stock: +form.stock, minStock: +form.minStock, image: '' }]);
    }
    setModal(null);
  };
  const handleDelete = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* ── Header & Stats ───────────────────────── */}
      <div>
        <div className="mb-4">
          <h2 className="m-0 text-xl font-extrabold text-gray-900">Katalog Obat & Produk</h2>
          <p className="m-0 mt-1 text-sm text-gray-500">Kelola inventaris, harga, dan ketersediaan produk</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Obat', value: products.length, icon: '', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Stok Menipis', value: products.filter(p => p.stock <= p.minStock).length, icon: '️', color: 'text-red-500', bg: 'bg-red-50' },
            { label: 'Kategori Aktif', value: categories.length, icon: '️', color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Total Nilai Stok', value: 'Rp 45Jt', icon: '', color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${s.bg} ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 flex-1">
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></span>
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Cari kode atau nama obat..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 outline-none transition-colors"
            />
          </div>
          <select 
            value={catFilter} 
            onChange={e => setCatFilter(e.target.value)}
            className="w-full sm:w-48 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 outline-none transition-colors cursor-pointer"
          >
            <option value="">Semua Kategori</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button 
          onClick={openAdd} 
          className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-5 py-2.5 text-sm font-bold cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <span></span> Tambah Obat
        </button>
      </div>

      {/* ── Table ────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {['Info Produk', 'Kategori', 'Harga', 'Sisa Stok', 'Min Stok', 'Aksi'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => {
                const isLow = p.stock <= p.minStock;
                return (
                  <tr key={p.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xl shadow-sm">
                          {p.image}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-600 mb-0.5">{p.code}</div>
                          <div className="text-sm font-extrabold text-gray-900">{p.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className="inline-flex bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-md border border-blue-100">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm font-extrabold text-gray-900">
                      Rp {p.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${isLow ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                        <span className={`text-sm font-bold ${isLow ? 'text-red-600' : 'text-gray-900'}`}>
                          {p.stock} <span className="text-gray-500 font-medium text-xs">{p.unit}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-xs text-gray-500 font-medium">
                      {p.minStock} {p.unit}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-[11px] text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors">Hapus</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-10 text-center text-gray-400 font-medium text-sm">
              Tidak ada produk yang ditemukan.
            </div>
          )}
        </div>
      </div>

      {/* ── Form Modal ────────────────────────────── */}
      {modal === 'form' && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setModal(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-xl shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="m-0 mb-6 text-xl font-extrabold text-gray-900">
              {editId ? 'Edit Data Obat' : 'Tambah Obat Baru'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'Kode Obat', key: 'code', type: 'text', placeholder: 'OBT-007' },
                { label: 'Nama Obat', key: 'name', type: 'text', placeholder: 'Nama produk' },
                { label: 'Harga (Rp)', key: 'price', type: 'number', placeholder: '15000' },
                { label: 'Satuan', key: 'unit', type: 'text', placeholder: 'Box/Strip/Botol/Unit' },
                { label: 'Stok Saat Ini', key: 'stock', type: 'number', placeholder: '100' },
                { label: 'Minimal Stok', key: 'minStock', type: 'number', placeholder: '20' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[11px] font-bold text-gray-500 block mb-1.5 uppercase tracking-wide">{f.label}</label>
                  <input 
                    type={f.type} 
                    placeholder={f.placeholder} 
                    value={form[f.key]} 
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-colors" 
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-[11px] font-bold text-gray-500 block mb-1.5 uppercase tracking-wide">Kategori Obat</label>
                <select 
                  value={form.category} 
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-colors cursor-pointer"
                >
                  <option value="">Pilih Kategori...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
              <button 
                onClick={() => setModal(null)} 
                className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-bold text-sm cursor-pointer transition-colors border-none"
              >
                Batal
              </button>
              <button 
                onClick={handleSave} 
                className="flex-[2] py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm cursor-pointer transition-colors shadow-sm shadow-emerald-500/30 border-none"
              >
                {editId ? 'Simpan Perubahan' : 'Tambahkan ke Katalog'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
