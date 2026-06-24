import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Badge from './Badge';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Ambil data user dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  // Menu items untuk semua user
  const allMenuItems = [
    { name: 'Dashboard', icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828673.png', path: '/dashboard' },
    { name: 'Data Obat', icon: 'https://cdn-icons-png.flaticon.com/512/3067/3067260.png', path: '/obat' },
    { name: 'Cek Stok', icon: 'https://cdn-icons-png.flaticon.com/512/3067/3067260.png', path: '/cek-stok' },
    { name: 'Chatbox', icon: 'https://cdn-icons-png.flaticon.com/512/589/589708.png', path: '/chatbox', badge: 3 },
  ];

  // Menu items dengan User (hanya untuk admin)
  const getMenuItems = () => {
    const items = [...allMenuItems];
    if (user?.role === 'admin') {
      items.push({ 
        name: 'User', 
        icon: 'https://cdn-icons-png.flaticon.com/512/589/589708.png', 
        path: '/user' 
      });
    }
    return items;
  };

  const menuItems = getMenuItems();

  // Handle logout - HAPUS data user dari localStorage
  const handleLogout = (e) => {
    e.preventDefault(); // Mencegah navigasi default
    localStorage.removeItem('user'); // Hapus data user
    navigate('/login'); // Redirect ke halaman login
  };

  return (
    <div className={`${isCollapsed ? 'w-24' : 'w-72'} transition-all duration-300 flex flex-col border-r border-gray-100 h-screen sticky top-0 bg-white z-20`}>
      <div className="p-8 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-apotek-merah rounded-lg flex items-center justify-center text-white font-black text-xs">AK</div>
            <span className="text-sm font-black tracking-tight text-slate-800">Apotek Keluarga 25</span>
          </div>
        )}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <img
            src="https://cdn-icons-png.flaticon.com/512/271/271204.png"
            className={`w-4 h-4 opacity-40 ${isCollapsed ? 'rotate-180' : ''}`}
            alt=""
          />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
              pathname === item.path ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <img src={item.icon} className={`w-5 h-5 ${pathname === item.path ? 'invert' : 'opacity-40'}`} alt="" />
            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span className="text-xs font-bold">{item.name}</span>
                {item.badge && <Badge type="danger">{item.badge}</Badge>}
              </div>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-8">
        {/* Ganti Link dengan button untuk logout */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-red-400 transition-colors w-full"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828445.png" className="w-5 h-5 opacity-40" alt="" />
          {!isCollapsed && <span className="text-xs font-bold">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}