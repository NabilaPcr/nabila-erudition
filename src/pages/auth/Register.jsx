import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Akun berhasil dibuat!");
    navigate('/login');
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-700">Buat Akun Baru</h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Daftar sebagai staf Apotek Keluarga 25</p>
      </div>
      
      <form className="space-y-4 w-full" onSubmit={handleRegister}>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-wider">Full Name</label>
          <input 
            type="text" 
            placeholder="Staf Admin" 
            className="w-full px-6 py-4 bg-slate-50 rounded-[20px] border-2 border-transparent outline-none focus:border-apotek-hijau/20 focus:bg-white transition-all text-sm font-medium" 
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            placeholder="email@example.com" 
            className="w-full px-6 py-4 bg-slate-50 rounded-[20px] border-2 border-transparent outline-none focus:border-apotek-hijau/20 focus:bg-white transition-all text-sm font-medium" 
            required
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-wider">Password</label>
          <input 
            type="password" 
            placeholder="Minimal 8 karakter" 
            className="w-full px-6 py-4 bg-slate-50 rounded-[20px] border-2 border-transparent outline-none focus:border-apotek-hijau/20 focus:bg-white transition-all text-sm font-medium" 
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-apotek-hijau text-slate-700 py-4 mt-4 rounded-[20px] font-black shadow-lg shadow-apotek-hijau/30 hover:bg-opacity-80 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest text-xs"
        >
          Daftar Akun
        </button>
      </form>
      
      <p className="mt-10 text-center text-[13px] text-slate-400 font-medium">
        Sudah punya akun? <Link to="/login" className="text-apotek-hijau font-black hover:underline ml-1">Masuk Saja</Link>
      </p>
    </div>
  );
}