import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    // Paksa pindah ke dashboard
    navigate('/dashboard');
  };

  return (
    <div className="animate-fade-in flex flex-col items-center">
      {/* ... bagian logo dan teks ... */}
      
      <form className="space-y-4 w-full" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-apotek-merah/10" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-apotek-merah/10" 
        />
        <button 
          type="submit"
          className="w-full bg-apotek-merah text-white py-4 rounded-2xl font-black shadow-xl hover:bg-red-600 transition-all active:scale-95"
        >
          MASUK
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-400 font-medium">
        Belum punya akun? <Link to="/register" className="text-apotek-merah font-bold">Daftar Sekarang</Link>
      </p>
    </div>
  );
}