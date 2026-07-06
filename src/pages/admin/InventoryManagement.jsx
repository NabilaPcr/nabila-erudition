import React, { useState } from 'react';

const dummySuppliers = [
  { id: 1, name: 'PT Kimia Farma', contact: 'Budi Hartono', phone: '021-5555-1234', email: 'kimiafarma@email.com', address: 'Jakarta Pusat', status: 'aktif' },
  { id: 2, name: 'PT Indofarma', contact: 'Siti Aminah', phone: '021-4444-5678', email: 'indofarma@email.com', address: 'Bandung', status: 'aktif' },
  { id: 3, name: 'CV Maju Bersama', contact: 'Ahmad Yusuf', phone: '0812-3333-7890', email: 'majubersama@email.com', address: 'Surabaya', status: 'nonaktif' },
];

const dummyPurchases = [
  { id: 'BLI-001', supplier: 'PT Kimia Farma', items: 5, total: 2500000, date: '2026-07-01', status: 'diterima', note: 'Pembelian rutin bulanan' },
  { id: 'BLI-002', supplier: 'PT Indofarma', items: 3, total: 1800000, date: '2026-06-28', status: 'pending', note: 'Restok antibiotik' },
  { id: 'BLI-003', supplier: 'PT Kimia Farma', items: 8, total: 4200000, date: '2026-06-15', status: 'diterima', note: '' },
];

export default function InventoryManagement() {
  const [tab, setTab] = useState('supplier');
  const [suppliers, setSuppliers] = useState(dummySuppliers);
  const [purchases, setPurchases] = useState(dummyPurchases);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', phone: '', email: '', address: '' });
  const [editId, setEditId] = useState(null);

  const handleSaveSupplier = () => {
    if (editId) {
      setSuppliers(prev => prev.map(s => s.id === editId ? { ...s, ...form, status: 'aktif' } : s));
    } else {
      setSuppliers(prev => [...prev, { ...form, id: Date.now(), status: 'aktif' }]);
    }
    setModal(false);
  };

  const getTabClass = (t) => `
    px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 border-none
    ${tab === t ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20' : 'bg-transparent text-gray-500 hover:bg-gray-100'}
  `;

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="mb-2">
        <h2 className="m-0 text-xl font-extrabold text-gray-900">Inventaris & Supplier</h2>
        <p className="m-0 mt-1 text-sm text-gray-500">Kelola data pemasok dan riwayat pembelian stok obat</p>
      </div>

      {/* ── Tabs ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm inline-flex gap-1 self-start w-full sm:w-auto overflow-x-auto">
        <button className={getTabClass('supplier')} onClick={() => setTab('supplier')}> Supplier</button>
        <button className={getTabClass('purchase')} onClick={() => setTab('purchase')}> Pembelian Baru</button>
        <button className={getTabClass('history')} onClick={() => setTab('history')}> Riwayat</button>
      </div>

      {/* ── Supplier Tab ─────────────────────────── */}
      {tab === 'supplier' && (
        <div className="flex flex-col gap-5 animate-fade-in">
          <div className="flex justify-end">
            <button 
              onClick={() => { setForm({ name: '', contact: '', phone: '', email: '', address: '' }); setEditId(null); setModal(true); }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-5 py-2.5 text-sm font-bold cursor-pointer transition-colors shadow-sm flex items-center gap-2"
            >
              <span></span> Tambah Supplier
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {suppliers.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-transparent rounded-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
                
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-xl text-white shadow-md shadow-emerald-500/20 shrink-0">
                      
                    </div>
                    <div>
                      <h3 className="m-0 text-base font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors">{s.name}</h3>
                      <div className="mt-1">
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          s.status === 'aktif' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {s.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setForm({ name: s.name, contact: s.contact, phone: s.phone, email: s.email, address: s.address }); setEditId(s.id); setModal(true); }}
                      className="text-[10px] text-blue-700 bg-blue-50 hover:bg-blue-100 border-none rounded-md px-2.5 py-1.5 cursor-pointer font-bold transition-colors"
                    >Edit</button>
                    <button 
                      onClick={() => setSuppliers(prev => prev.filter(x => x.id !== s.id))}
                      className="text-[10px] text-red-700 bg-red-50 hover:bg-red-100 border-none rounded-md px-2.5 py-1.5 cursor-pointer font-bold transition-colors"
                    >Hapus</button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 text-xs text-gray-500 relative z-10 bg-gray-50 rounded-xl p-4 border border-gray-100/50">
                  <div className="flex items-center gap-2"><span className="text-gray-400"></span> <span className="font-semibold text-gray-700">{s.contact}</span></div>
                  <div className="flex items-center gap-2"><span className="text-gray-400"></span> {s.phone}</div>
                  <div className="flex items-center gap-2"><span className="text-gray-400">️</span> {s.email}</div>
                  <div className="flex items-start gap-2"><span className="text-gray-400 mt-0.5"></span> <span className="leading-tight">{s.address}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Purchase Tab ─────────────────────────── */}
      {tab === 'purchase' && (
        <div className="bg-white rounded-3xl p-10 border border-gray-100 text-center shadow-sm animate-scale-in">
          <div className="text-7xl mb-6 animate-float inline-block"></div>
          <h3 className="text-2xl font-extrabold text-gray-900 m-0 mb-2">Input Pembelian Stok</h3>
          <p className="text-sm text-gray-500 m-0 mb-8 max-w-sm mx-auto">Catat faktur pembelian obat dari supplier untuk menambahkan stok secara otomatis.</p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-colors shadow-sm shadow-emerald-500/30">
             Buat Faktur Pembelian Baru
          </button>
        </div>
      )}

      {/* ── History Tab ──────────────────────────── */}
      {tab === 'history' && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-fade-in-right">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="m-0 text-base font-extrabold text-gray-900">Riwayat Pembelian</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  {['ID Beli', 'Supplier', 'Item', 'Total', 'Status', 'Tanggal', 'Catatan'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {purchases.map(p => (
                  <tr key={p.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-5 py-4 text-xs font-bold text-emerald-600 whitespace-nowrap">{p.id}</td>
                    <td className="px-5 py-4 text-xs font-bold text-gray-700 whitespace-nowrap">{p.supplier}</td>
                    <td className="px-5 py-4 text-xs font-medium text-gray-500 whitespace-nowrap">{p.items} item</td>
                    <td className="px-5 py-4 text-xs font-extrabold text-gray-900 whitespace-nowrap">Rp {p.total.toLocaleString('id-ID')}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        p.status === 'diterima' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-gray-400 whitespace-nowrap">{p.date}</td>
                    <td className="px-5 py-4 text-xs text-gray-500">{p.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Supplier Modal ───────────────────────── */}
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
              {editId ? 'Edit Supplier' : 'Tambah Supplier Baru'}
            </h3>
            
            <div className="flex flex-col gap-4">
              {[
                { label: 'Nama Perusahaan', key: 'name', placeholder: 'PT ...' },
                { label: 'Nama PIC (Kontak)', key: 'contact', placeholder: 'Nama perwakilan' },
                { label: 'No. Telepon', key: 'phone', placeholder: '0812-...' },
                { label: 'Email', key: 'email', placeholder: 'email@supplier.com' },
                { label: 'Alamat Lengkap', key: 'address', placeholder: 'Kota/Jalan' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[11px] font-bold text-gray-500 block mb-1.5 uppercase tracking-wide">{f.label}</label>
                  <input 
                    value={form[f.key]} 
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} 
                    placeholder={f.placeholder}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setModal(false)} 
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl bg-transparent text-gray-700 font-bold text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSaveSupplier} 
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
