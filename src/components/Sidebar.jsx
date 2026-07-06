import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// SVG Icons — no emoji
const icons = {
  dashboard: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  customers: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  transactions: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
    </svg>
  ),
  prescriptions: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
  ),
  products: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    </svg>
  ),
  categories: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h8m-8 6h16"/>
    </svg>
  ),
  inventory: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </svg>
  ),
  marketing: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  reports: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  staff: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/>
      <path d="M16 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  logout: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
    </svg>
  ),
  chevronLeft: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ),
  chevronRight: (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  ),
};

const menuConfig = [
  {
    section: null,
    items: [
      { path: '/dashboard',    label: 'Dashboard',        iconKey: 'dashboard',     roles: ['admin','apoteker','kasir'] },
    ]
  },
  {
    section: 'TRANSAKSI & LAYANAN',
    items: [
      { path: '/transactions',  label: 'Transaksi Penjualan', iconKey: 'transactions',  roles: ['admin','apoteker','kasir'], badge: 'transactions' },
      { path: '/prescriptions', label: 'Resep Masuk',          iconKey: 'prescriptions', roles: ['admin','apoteker'],        badge: 'prescriptions' },
      { path: '/customers',     label: 'Kelola Pelanggan',     iconKey: 'customers',     roles: ['admin'],                   badge: 'customers' },
    ]
  },
  {
    section: 'PRODUK & KATALOG',
    items: [
      { path: '/products',   label: 'Data Obat',    iconKey: 'products',    roles: ['admin','apoteker'] },
      { path: '/categories', label: 'Kategori Obat',iconKey: 'categories',  roles: ['admin','apoteker'] },
    ]
  },
  {
    section: 'PEMASARAN & KONTEN',
    items: [
      { path: '/marketing', label: 'Kelola Promo',   iconKey: 'marketing', roles: ['admin'] },
    ]
  },
  {
    section: 'INVENTARIS',
    items: [
      { path: '/inventory', label: 'Supplier',         iconKey: 'inventory', roles: ['admin','apoteker'] },
    ]
  },
  {
    section: 'ANALITIK',
    items: [
      { path: '/reports', label: 'Laporan',    iconKey: 'reports', roles: ['admin','apoteker'] },
      { path: '/staff',   label: 'Staff',      iconKey: 'staff',   roles: ['admin'] },
    ]
  },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const d = localStorage.getItem('user');
      if (d) setUser(JSON.parse(d));
    } catch { /* skip */ }
  }, []);

  const badges = { transactions: 3, prescriptions: 5, customers: 0 };
  const role = user?.role || 'kasir';
  const roleLabel = { admin: 'Administrator', apoteker: 'Apoteker', kasir: 'Kasir' }[role] || role;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const sidebarWidth = collapsed ? 'w-[70px]' : 'w-[220px]';

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarWidth}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto overflow-x-hidden
        `}
        style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2419 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* ── Logo / Brand ─────────────────────────────── */}
        <div className={`flex items-center h-16 shrink-0 border-b ${collapsed ? 'justify-center px-2' : 'justify-between px-4'}`}
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className={`flex items-center gap-2.5 overflow-hidden ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
              AK
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="font-extrabold text-sm text-white whitespace-nowrap leading-tight">Apotek Keluarga</div>
                <div className="text-[10px] whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.4)' }}>Sehat Bersama Keluarga</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg transition-colors border-none bg-transparent cursor-pointer shrink-0"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {icons.chevronLeft}
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="absolute right-1 top-5 p-1 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {icons.chevronRight}
            </button>
          )}
        </div>

        {/* ── Navigation ────────────────────────────────── */}
        <nav className={`flex-1 ${collapsed ? 'px-2 py-3' : 'px-3 py-2'}`}>
          {menuConfig.map((group, gi) => {
            const visibleItems = group.items.filter(item => item.roles.includes(role));
            if (!visibleItems.length) return null;
            return (
              <div key={gi} className="mb-1">
                {/* Section label */}
                {!collapsed && group.section && (
                  <div className="text-[9px] font-bold uppercase tracking-[0.12em] px-3 pt-5 pb-1.5"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {group.section}
                  </div>
                )}
                {collapsed && group.section && (
                  <div className="border-t my-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                )}

                {/* Items */}
                {visibleItems.map(item => {
                  const isActive = pathname === item.path;
                  const badgeCount = item.badge ? badges[item.badge] : 0;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={collapsed ? item.label : undefined}
                      onClick={() => setMobileOpen?.(false)}
                      className={`
                        flex items-center gap-2.5 rounded-lg mb-0.5 font-semibold text-[13px] no-underline
                        transition-all duration-200 relative group
                        ${collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'}
                        ${isActive
                          ? 'text-white shadow-lg'
                          : 'hover:bg-white/5'
                        }
                      `}
                      style={isActive ? { background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' } : { color: 'rgba(255,255,255,0.55)' }}
                    >
                      {/* Left accent bar */}
                      {isActive && !collapsed && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                          style={{ background: '#4ade80' }} />
                      )}
                      <span className="shrink-0" style={isActive ? { color: '#4ade80' } : {}}>
                        {icons[item.iconKey]}
                      </span>
                      {!collapsed && (
                        <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[13px]">
                          {item.label}
                        </span>
                      )}
                      {/* Badge */}
                      {!collapsed && badgeCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-extrabold rounded-full px-1.5 py-0.5 leading-none shrink-0">
                          {badgeCount}
                        </span>
                      )}
                      {collapsed && badgeCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                      {/* Tooltip on collapsed */}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                          {item.label}
                          {badgeCount > 0 && <span className="ml-2 bg-red-500 rounded-full px-1.5">{badgeCount}</span>}
                          <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* ── User info + Logout ────────────────────────── */}
        <div className="shrink-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {!collapsed && (
            <div className="px-3 py-3 flex items-center gap-2.5">
              <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white font-extrabold text-sm"
                style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
                {(user?.fullname || user?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
                  {user?.fullname || user?.name || 'Admin'}
                </div>
                <div className="text-[10px] capitalize" style={{ color: '#4ade80' }}>{roleLabel}</div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg border-none bg-transparent cursor-pointer transition-colors hover:bg-red-500/10"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                title="Keluar"
              >
                {icons.logout}
              </button>
            </div>
          )}
          {collapsed && (
            <button
              onClick={handleLogout}
              className="w-full flex justify-center p-3 border-none cursor-pointer transition-colors hover:bg-red-500/10"
              style={{ color: 'rgba(255,255,255,0.4)', background: 'transparent' }}
              title="Keluar"
            >
              {icons.logout}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}