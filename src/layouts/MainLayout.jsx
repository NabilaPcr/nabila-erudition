import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const pageTitles = {
  '/dashboard':     { title: 'Dashboard',              subtitle: 'Ringkasan aktivitas apotek hari ini' },
  '/customers':     { title: 'Manajemen Pelanggan',    subtitle: 'CRM & segmentasi pelanggan' },
  '/transactions':  { title: 'Transaksi Penjualan',    subtitle: 'Semua transaksi online & kasir' },
  '/prescriptions': { title: 'Resep Masuk',            subtitle: 'Upload resep dari pelanggan' },
  '/products':      { title: 'Data Obat',              subtitle: 'Kelola katalog obat & produk' },
  '/categories':    { title: 'Kategori Obat',          subtitle: 'Kelola kategori produk' },
  '/inventory':     { title: 'Supplier & Pembelian',   subtitle: 'Inventaris & manajemen pemasok' },
  '/marketing':     { title: 'Pemasaran & Konten',     subtitle: 'Promo, artikel, dokter, testimoni' },
  '/reports':       { title: 'Laporan & Analitik',     subtitle: 'Laporan penjualan & performa' },
  '/staff':         { title: 'Manajemen Staff',        subtitle: 'Akun & akses admin, apoteker, kasir' },
};

const BellIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7"/>
  </svg>
);

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = pageTitles[pathname] || { title: 'Dashboard', subtitle: '' };

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();

  const sidebarOffset = collapsed ? 'lg:pl-[70px]' : 'lg:pl-[220px]';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarOffset}`}>

        {/* Top Header */}
        <header className="sticky top-0 z-30 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-5 gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <MenuIcon />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-gray-900 m-0 leading-tight truncate">
                {page.title}
              </h1>
              <p className="text-[11px] text-gray-400 m-0 hidden sm:block">{page.subtitle}</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Date */}
            <div className="text-[11px] text-gray-500 font-medium bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg hidden md:block whitespace-nowrap">
              {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </div>

            {/* Notification */}
            <button className="relative w-9 h-9 border border-gray-200 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer">
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>

            {/* User avatar */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-white transition-colors"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
                  {(user?.fullname || user?.name || 'A').charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-gray-900 leading-tight max-w-[100px] truncate">
                    {user?.fullname || user?.name || 'Admin'}
                  </div>
                  <div className="text-[10px] text-gray-400 capitalize">{user?.role || 'Admin'}</div>
                </div>
                <span className="hidden sm:block text-gray-400"><ChevronIcon /></span>
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-gray-100 shadow-lg z-20 py-1">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="text-xs font-bold text-gray-900">{user?.fullname || 'Admin'}</div>
                      <div className="text-[11px] text-gray-400">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      Keluar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}