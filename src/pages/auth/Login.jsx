import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/dashboard');
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-700">Selamat Datang</h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Silahkan masuk ke dashboard admin</p>
      </div>
      
      <form className="space-y-4 w-full" onSubmit={handleLogin}>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            placeholder="nama@apotek.com" 
            className="w-full px-6 py-4 bg-slate-50 rounded-[20px] border-2 border-transparent outline-none focus:border-apotek-merah/20 focus:bg-white transition-all text-sm font-medium" 
            required
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-wider">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full px-6 py-4 bg-slate-50 rounded-[20px] border-2 border-transparent outline-none focus:border-apotek-merah/20 focus:bg-white transition-all text-sm font-medium" 
            required
          />
        </div>

        <div className="flex justify-end pt-1">
          <button type="button" className="text-xs font-bold text-slate-400 hover:text-apotek-merah transition-colors">Lupa Password?</button>
        </div>

        <button 
          type="submit"
          className="w-full bg-apotek-merah text-white py-4 mt-4 rounded-[20px] font-black shadow-lg shadow-apotek-merah/30 hover:bg-red-400 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest text-xs"
        >
          Masuk 
        </button>
      </form>
      
      <p className="mt-10 text-center text-[13px] text-slate-400 font-medium">
        Belum punya akun? <Link to="/register" className="text-apotek-merah font-black hover:underline ml-1">Daftar Sekarang</Link>
      </p>
    </div>
  );
}