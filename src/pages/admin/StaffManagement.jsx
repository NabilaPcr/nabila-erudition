import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- CONFIGURATION REST API SUPABASE ---
const API_URL = "https://bbmnmqqdxmnnwnkgmdhi.supabase.co/rest/v1/User";
const API_KEY = "sb_publishable_YmLVBXGPd4qGmAH2slNBdg_--Srz8sH";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

// --- SERVICE API ---
export const userAPI = {
    async fetchUsers() {
        try {
            const response = await axios.get(API_URL, { headers, params: { select: '*' } });
            return response.data;
        } catch (error) {
            console.error('❌ Error fetchUsers:', error);
            throw error;
        }
    },
    async createUser(data) {
        try {
            const userData = {
                name: data.name,           
                email: data.email,
                password_hash: data.password || '123456',
                role: data.role || 'kasir',
                status: data.status || 'aktif'
            };
            const response = await axios.post(API_URL, userData, { headers });
            return response.data[0];
        } catch (error) {
            console.error('❌ Error createUser:', error);
            throw error;
        }
    },
    async updateUser(id, data) {
        try {
            const userData = {
                name: data.name,
                email: data.email,
                role: data.role,
                status: data.status
            };
            if (data.password) userData.password_hash = data.password;

            const response = await axios.patch(API_URL, userData, {
                headers,
                params: { id: `eq.${id}` }
            });
            return response.data[0];
        } catch (error) {
            console.error('❌ Error updateUser:', error);
            throw error;
        }
    },
    async deleteUser(id) {
        try {
            const response = await axios.delete(API_URL, { headers, params: { id: `eq.${id}` } });
            return response.data;
        } catch (error) {
            console.error('❌ Error deleteUser:', error);
            throw error;
        }
    }
};

// --- MAIN COMPONENT ---
export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk mengontrol Modal (Form Tambah/Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // State Form Input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'kasir',
    status: 'aktif',
    password: ''
  });

  // Ambil data dari Supabase
  const loadStaffData = async () => {
    try {
      setLoading(true);
      const data = await userAPI.fetchUsers();
      setStaff(data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaffData();
  }, []);

  // Handler Tombol Tambah
  const handleAddClick = (e) => {
    e.stopPropagation(); // Mencegah bentrokan klik dengan elemen luar
    console.log("➡️ Tombol Tambah Staff ditekan!");
    setIsEditMode(false);
    setFormData({ name: '', email: '', role: 'kasir', status: 'aktif', password: '' });
    setIsModalOpen(true);
  };

  // Handler Tombol Edit
  const handleEditClick = (e, s) => {
    e.stopPropagation();
    console.log(`➡️ Tombol Edit ditekan untuk ID: ${s.id}`);
    setIsEditMode(true);
    setSelectedId(s.id);
    setFormData({
      name: s.name || '',
      email: s.email || '',
      role: s.role || 'kasir',
      status: s.status || 'aktif',
      password: '' 
    });
    setIsModalOpen(true);
  };

  // Handler Tombol Hapus
  const handleDeleteClick = async (e, id, name) => {
    e.stopPropagation();
    console.log(`➡️ Tombol Hapus ditekan untuk ID: ${id}`);
    if (window.confirm(`Apakah Anda yakin ingin menghapus staf ${name}?`)) {
      try {
        await userAPI.deleteUser(id);
        alert("Staf berhasil dihapus!");
        loadStaffData(); 
      } catch (error) {
        alert("Gagal menghapus staf");
      }
    }
  };

  // Handler Simpan Data (Submit Form)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await userAPI.updateUser(selectedId, formData);
        alert("Staf berhasil diperbarui!");
      } else {
        await userAPI.createUser(formData);
        alert("Staf baru berhasil ditambahkan!");
      }
      setIsModalOpen(false);
      loadStaffData(); 
    } catch (error) {
      alert("Gagal menyimpan data staf");
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in relative z-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="m-0 text-xl font-extrabold text-gray-900">Manajemen Staff</h2>
          <p className="m-0 mt-1 text-sm text-gray-500">Kelola akun admin, apoteker, dan kasir</p>
        </div>
        {/* Tombol Tambah dengan z-50 dan stopPropagation */}
        <button 
          onClick={handleAddClick}
          className="relative z-50 bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-5 py-2.5 text-sm font-bold cursor-pointer transition-colors shadow-sm flex items-center gap-2"
        >
          Tambah Staff
        </button>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm relative z-20">
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
              {loading ? (
                <tr><td colSpan="5" className="px-5 py-8 text-center text-sm text-gray-500">Memuat data dari database...</td></tr>
              ) : staff.length === 0 ? (
                <tr><td colSpan="5" className="px-5 py-8 text-center text-sm text-gray-500">Tidak ada data staf di Supabase.</td></tr>
              ) : (
                staff.map((s) => (
                  <tr key={s.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="px-5 py-4 text-sm font-bold text-gray-900 whitespace-nowrap flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        {s.name ? s.name.charAt(0) : '?'}
                      </div>
                      {s.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{s.email}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        s.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                        s.role === 'apoteker' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>{s.role}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        s.status === 'aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>{s.status === 'aktif' ? 'Aktif' : 'Nonaktif'}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {/* Tombol Aksi dengan z-50 */}
                      <div className="flex gap-2 relative z-50">
                        <button 
                          onClick={(e) => handleEditClick(e, s)}
                          className="relative z-50 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border-none rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={(e) => handleDeleteClick(e, s.id, s.name)}
                          className="relative z-50 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border-none rounded-lg px-3 py-1.5 cursor-pointer transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POP-UP MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {isEditMode ? 'Edit Data Staff' : 'Tambah Staff Baru'}
            </h3>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input 
                  type="email" required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              {!isEditMode && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" required
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="admin">Admin</option>
                    <option value="apoteker">Apoteker</option>
                    <option value="kasir">Kasir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl border-none cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl border-none cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}