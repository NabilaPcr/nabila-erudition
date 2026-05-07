import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-black text-center text-gray-800 font-poppins mb-2">Daftar Akun</h2>
      <p className="text-center text-gray-400 text-sm mb-8 font-medium">Buat akun untuk cabang apotek baru</p>
      
      <form className="space-y-5">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
          <input type="text" placeholder="Masukkan nama..." className="w-full mt-1 p-4 bg-apotek-latar rounded-2xl border-none focus:ring-2 focus:ring-apotek-merah/20 outline-none transition-all" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
          <input type="email" placeholder="email@apotek.in" className="w-full mt-1 p-4 bg-apotek-latar rounded-2xl border-none focus:ring-2 focus:ring-apotek-merah/20 outline-none transition-all" />
        </div>
        <button className="w-full bg-apotek-merah text-white py-4 rounded-2xl font-black shadow-xl transition-all active:scale-95">
          DAFTAR SEKARANG
        </button>
      </form>
      
      <div className="mt-8 text-center text-sm font-medium">
        <p className="text-gray-400">Sudah punya akun? <Link to="/login" className="text-apotek-merah font-bold">Masuk</Link></p>
      </div>
    </div>
  );
}