import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const ShieldIcon = () => (
  <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

export default function AuthLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* ── Left — Form ─────────────────────────────── */}
      <div className="flex-1 flex flex-col p-8 lg:p-12 max-w-xl mx-auto w-full justify-center">
        {/* Logo */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-lg group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)', boxShadow: '0 4px 15px rgba(34,197,94,0.3)' }}>
              AK
            </div>
            <div className="text-left">
              <div className="font-extrabold text-base text-gray-900 leading-tight">Apotek Keluarga</div>
              <div className="text-[11px] text-gray-400 font-medium">Family Pharmacy</div>
            </div>
          </button>
        </div>

        {/* Form area */}
        <div className="animate-fade-in w-full">
          <Outlet />
        </div>

        {/* Bottom link */}
        <div className="mt-8 text-center text-[12px] text-gray-400">
          <Link to="/" className="text-emerald-600 font-semibold no-underline hover:text-emerald-700 transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* ── Right — Illustration ──────────────────────── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gray-900">
        {/* Photographic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=90" 
            alt="Pharmacy Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, rgba(26,58,42,0.9) 0%, rgba(15,36,25,0.95) 50%, rgba(10,31,16,0.98) 100%)' }} />
        </div>

        {/* Background decorations */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30 z-0"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20 z-0"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 z-0"
          style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center w-full">
          <div className="mb-8 p-6 rounded-3xl" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <ShieldIcon />
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight">
            Apotek Keluarga<br />
            <span style={{ color: '#4ade80' }}>Digital</span>
          </h2>
          <p className="text-sm leading-relaxed mb-10 max-w-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Platform manajemen apotek lengkap — dari stok obat, resep digital, pelanggan, hingga laporan penjualan.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 rounded-2xl px-8 py-5 mb-8 w-full max-w-sm"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              { v: '500+', l: 'Apotek' },
              { v: '50K+', l: 'Transaksi' },
              { v: '10K+', l: 'Member' },
            ].map((s, i) => (
              <div key={s.l} className={`text-center flex-1 ${i < 2 ? 'border-r' : ''}`}
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xl font-extrabold text-white">{s.v}</div>
                <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Role info */}
          <div className="rounded-2xl p-5 text-left w-full max-w-sm"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Alur Login Sistem
            </p>
            <div className="flex flex-col gap-2">
              {[
                { role: 'Admin / Apoteker / Kasir', dest: 'Masuk ke Dashboard CRM' },
                { role: 'Pelanggan (User)', dest: 'Masuk ke Halaman Belanja' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#4ade80' }} />
                  <div>
                    <div className="text-xs font-bold text-white">{item.role}</div>
                    <div className="text-[10px]" style={{ color: '#4ade80' }}>{item.dest}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}