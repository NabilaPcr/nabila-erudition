import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const HomeIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const ShopIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const CartIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/>
  </svg>
);
const OrdersIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <path d="M9 12h6M9 16h4"/>
  </svg>
);
const PrescriptionIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);
const ProfileIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
);
const XIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function UserLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();

  const navItems = [
    { path: '/shop',            label: 'Toko',     icon: <ShopIcon /> },
    { path: '/cart',            label: 'Keranjang', icon: <CartIcon /> },
    { path: '/orders',          label: 'Pesanan',  icon: <OrdersIcon /> },
    { path: '/my-prescription', label: 'Resep',    icon: <PrescriptionIcon /> },
    { path: '/profile',         label: 'Profil',   icon: <ProfileIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* ── Top Nav ─────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow-sm group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
              AK
            </div>
            <div>
              <div className="font-extrabold text-sm text-gray-900 leading-tight">Apotek Keluarga</div>
              <div className="text-[10px] text-gray-400 font-medium">Family Pharmacy</div>
            </div>
          </Link>

          {/* Nav links desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all no-underline ${
                    isActive
                      ? 'text-green-700 bg-green-50'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={isActive ? 'text-green-600' : 'text-gray-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[13px] font-bold text-gray-900 leading-tight">
                {user?.fullname || user?.name || 'Pengguna'}
              </div>
              <div className="text-[11px] font-bold" style={{ color: '#22c55e' }}>Member</div>
            </div>
            <div className="relative group">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
                {(user?.fullname || user?.name || 'U').charAt(0).toUpperCase()}
              </div>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-100 shadow-lg hidden group-hover:block py-1 z-50">
                <Link to="/profile" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 no-underline">
                  Profil Saya
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 border-none bg-transparent cursor-pointer flex items-center gap-2"
                >
                  <LogoutIcon /> Keluar
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 border-none cursor-pointer bg-transparent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
            {navItems.map(item => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all no-underline mb-1 ${
                    isActive ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className={isActive ? 'text-green-600' : 'text-gray-400'}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 border-none bg-transparent cursor-pointer mt-2 border-t border-gray-100 pt-3"
            >
              <LogoutIcon /> Keluar
            </button>
          </div>
        )}
      </nav>

      {/* ── Content ──────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>AK</div>
            <span className="font-bold text-gray-800 text-sm">Apotek Keluarga</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 Apotek Keluarga. Kesehatan Keluarga Adalah Prioritas Kami.</p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors no-underline">Syarat & Ketentuan</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors no-underline">Privasi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
