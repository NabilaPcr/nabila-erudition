import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828673.png', path: '/dashboard' },
    { name: 'Cek Stok Pusat', icon: 'https://cdn-icons-png.flaticon.com/512/3067/3067260.png', path: '/cek-stok' },
    { name: 'Pesan Otomatis', icon: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png', path: '/pesan-stok' },
    { name: 'Chatbox', icon: 'https://cdn-icons-png.flaticon.com/512/589/589708.png', path: '/chatbox' },
    { name: 'Riwayat Obat', icon: <img src="https://cdn-icons-png.flaticon.com/512/3503/3503786.png" className="w-5 h-5" />, path: '/riwayat' },
  ];

  return (
    <div className="w-64 flex flex-col text-white shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 bg-apotek-merah rounded-full"></div>
        </div>
        <span className="text-xl font-black font-poppins tracking-tighter uppercase">Apotek.in</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
              pathname === item.path 
              ? 'bg-white text-apotek-merah shadow-xl' 
              : 'hover:bg-white/10 text-white/80'
            }`}
          >
            {typeof item.icon === 'string' ? <img src={item.icon} className={`w-5 h-5 ${pathname === item.path ? '' : 'invert opacity-70'}`} /> : item.icon}
            <span className="text-sm font-bold">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}