import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShieldIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const LogOutIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
  </svg>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 m-0">Profil Saya</h1>
        <p className="text-sm text-gray-400 m-0 mt-1">Kelola informasi pribadi dan pengaturan keamanan akun Anda</p>
      </div>
      
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8 mb-8 shadow-sm">
        <div className="w-24 h-24 shrink-0 rounded-full flex items-center justify-center text-white text-3xl font-extrabold shadow-lg"
             style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)', boxShadow: '0 8px 20px rgba(34,197,94,0.3)' }}>
          {(user?.fullname || user?.name || 'U').charAt(0).toUpperCase()}
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-extrabold text-gray-900 m-0 mb-1">{user?.fullname || user?.name || 'Pengguna Apotek'}</h2>
          <p className="text-sm text-gray-500 m-0 mb-4">{user?.email || 'user@email.com'}</p>
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200">
            <ShieldIcon /> Member Bronze
          </div>
        </div>
        <div className="shrink-0 mt-4 md:mt-0">
           <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 font-bold px-6 py-2.5 rounded-xl transition-colors text-sm cursor-pointer shadow-sm">
             <EditIcon /> Edit Profil
           </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-green-300 transition-colors">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0" />
          <div className="relative z-10">
            <div className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-wide">Poin Loyalitas</div>
            <div className="text-4xl font-extrabold text-green-600">250</div>
            <div className="mt-3 text-xs font-semibold text-gray-500">
              Bisa ditukar dengan <span className="text-green-600 font-bold">Voucher Rp 25.000</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0" />
          <div className="relative z-10">
            <div className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-wide">Total Transaksi Selesai</div>
            <div className="text-4xl font-extrabold text-gray-900">12</div>
            <div className="mt-3 text-xs font-semibold text-gray-500">Terakhir belanja: <span className="text-gray-900 font-bold">2 hari lalu</span></div>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-800 m-0 text-sm">Pengaturan Akun & Keamanan</h3>
        </div>
        <div className="p-2">
          {['Ubah Kata Sandi', 'Alamat Pengiriman', 'Notifikasi & Email', 'Metode Pembayaran Tersimpan', 'Riwayat Konsultasi'].map((item, i) => (
            <button key={i} className="w-full text-left px-5 py-3.5 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition-colors flex justify-between items-center bg-transparent border-none cursor-pointer group">
              {item} 
              <span className="text-gray-300 group-hover:text-green-500 transition-colors"><ChevronRight /></span>
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="text-right">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 ml-auto bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 px-6 py-3 rounded-xl font-bold cursor-pointer text-sm transition-colors"
        >
          <LogOutIcon /> Keluar Akun
        </button>
      </div>
    </div>
  );
}
