import React from 'react';
import PageHeader from '../components/PageHeader';

export default function CekStok() {
  const dataStok = [
    { id: 1, nama: "Paracetamol 500mg", kategori: "Obat Bebas", stok: 120, status: "Tersedia" },
    { id: 2, nama: "Amoxicillin 250mg", kategori: "Obat Keras", stok: 15, status: "Menipis" },
    { id: 3, nama: "Dexa-M", kategori: "Obat Keras", stok: 0, status: "Kosong" },
    { id: 4, nama: "Vitamin C 1000mg", kategori: "Suplemen", stok: 250, status: "Tersedia" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Cek Stok Pusat" />

      <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-50 mt-6">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-gray-700">Daftar Inventaris Obat</h3>
          <button className="bg-apotek-merah text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-100 flex items-center gap-2">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" className="w-4 h-4 invert" alt="" />
            Tambah Stok
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase tracking-widest border-b border-gray-50">
              <th className="pb-4 pl-4">Obat</th>
              <th className="pb-4">Kategori</th>
              <th className="pb-4">Jumlah</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {dataStok.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 pl-4 font-bold text-gray-800">{item.nama}</td>
                <td className="py-5 text-gray-500">{item.kategori}</td>
                <td className="py-5 font-black">{item.stok} <span className="text-gray-400 font-normal italic">Pcs</span></td>
                <td className="py-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                    item.status === 'Tersedia' ? 'bg-green-100 text-apotek-hijau' : 
                    item.status === 'Menipis' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-apotek-merah'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-5">
                   <img src="https://cdn-icons-png.flaticon.com/512/2311/2311524.png" className="w-4 h-4 opacity-20 cursor-pointer hover:opacity-100" alt="detail" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}