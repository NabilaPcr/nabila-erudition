import React, { useState } from 'react';

const dummyStaff = [
  { id: 1, name: 'Admin Utama', email: 'admin@apotek.com', role: 'admin', status: 'aktif' },
  { id: 2, name: 'Sari Wulandari', email: 'sari@apotek.com', role: 'apoteker', status: 'aktif' },
  { id: 3, name: 'Rina Kusuma', email: 'rina@apotek.com', role: 'kasir', status: 'aktif' },
];

export default function StaffManagement() {
  const [staff, setStaff] = useState(dummyStaff);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="m-0 text-xl font-extrabold text-gray-900">Manajemen Staff</h2>
          <p className="m-0 mt-1 text-sm text-gray-500">Kelola akun admin, apoteker, dan kasir</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-5 py-2.5 text-sm font-bold cursor-pointer transition-colors shadow-sm flex items-center gap-2">
          <span></span> Tambah Staff
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Nama', 'Email', 'Role', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {staff.map((s, idx) => (
                <tr key={s.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-bold text-gray-900 whitespace-nowrap flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {s.name.charAt(0)}
                    </div>
                    {s.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{s.email}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      s.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                      s.role === 'apoteker' ? 'bg-blue-100 text-blue-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {s.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      s.status === 'aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {s.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border-none rounded-lg px-3 py-1.5 cursor-pointer transition-colors">
                        Edit
                      </button>
                      <button className="text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border-none rounded-lg px-3 py-1.5 cursor-pointer transition-colors">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
