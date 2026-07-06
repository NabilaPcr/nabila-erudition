import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';

// ─── SVG Icons ────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const CartIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7"/>
  </svg>
);
const UploadIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const PillIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10.5 20.5L3.5 13.5a5 5 0 017.07-7.07l7 7a5 5 0 01-7.07 7.07z"/>
    <line x1="8.5" y1="11.5" x2="15.5" y2="4.5"/>
  </svg>
);
const ShieldCheckIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ZapIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg width="14" height="14" fill={filled ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 13 19.79 19.79 0 01.82 4.29 2 2 0 012.8 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.87 10A16 16 0 0014 17.14l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
    } catch {
      localStorage.removeItem('user');
    }
  }, []);

  const features = [
    {
      icon: <ShieldCheckIcon />,
      title: "Produk BPOM Terjamin",
      desc: "Semua produk kami telah mendapat izin BPOM dan terjamin keasliannya.",
    },
    {
      icon: <ClockIcon />,
      title: "Layanan 24 Jam",
      desc: "Apotek buka 24 jam, konsultasi apoteker dan layanan darurat tersedia kapan saja.",
    },
    {
      icon: <ZapIcon />,
      title: "Resep Digital Cepat",
      desc: "Upload resep dokter dan dapatkan obat dalam hitungan menit.",
    },
    {
      icon: <PillIcon />,
      title: "500+ Jenis Obat",
      desc: "Koleksi lengkap obat, vitamin, suplemen, dan alat kesehatan.",
    },
  ];

  const stats = [
    { value: "500+", label: "Produk BPOM" },
    { value: "24 Jam", label: "Layanan" },
    { value: "Cepat", label: "Resep Digital" },
  ];

  const products = [
    { name: "Paracetamol 500mg", price: "Rp 15.000", category: "Analgetik", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80" },
    { name: "Vitamin C 1000mg", price: "Rp 45.000", category: "Vitamin", img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&q=80" },
    { name: "Masker Medis 3ply", price: "Rp 25.000", category: "P3K", img: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&q=80" },
    { name: "Hand Sanitizer", price: "Rp 20.000", category: "Higiene", img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=300&q=80" },
    { name: "Thermometer Digital", price: "Rp 75.000", category: "Alkes", img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&q=80" },
    { name: "Obat Batuk Sirup", price: "Rp 35.000", category: "OTC", img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&q=80" },
    { name: "Suplemen Imun", price: "Rp 120.000", category: "Suplemen", img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&q=80" },
    { name: "Tensimeter Digital", price: "Rp 250.000", category: "Alkes", img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&q=80" },
  ];

  const doctors = [
    { name: "Dr. Sari Wulandari", spesialis: "Apoteker", status: "online", avatar: "https://i.pravatar.cc/150?img=47" },
    { name: "Dr. Budi Santoso", spesialis: "Dokter Umum", status: "online", avatar: "https://i.pravatar.cc/150?img=12" },
    { name: "Dr. Rina Kusuma", spesialis: "Dokter Anak", status: "offline", avatar: "https://i.pravatar.cc/150?img=32" },
  ];

  const testimonials = [
    {
      name: "Dr. Sari Wulandari", role: "Apoteker, Jakarta",
      avatar: "https://i.pravatar.cc/80?img=47",
      text: "Stok obat jadi mudah dipantau. Laporan penjualan yang akurat sangat membantu pengelolaan apotek.",
    },
    {
      name: "Budi Santoso", role: "Pemilik Apotek, Surabaya",
      avatar: "https://i.pravatar.cc/80?img=12",
      text: "Fitur multi-pengguna memudahkan koordinasi antara saya dan staff. Sangat rekomendasikan!",
    },
    {
      name: "Rina Kusuma", role: "Admin Apotek, Bandung",
      avatar: "https://i.pravatar.cc/80?img=32",
      text: "Antarmuka yang bersih dan mudah dipahami. Proses onboarding sangat cepat.",
    },
  ];

  const plans = [
    {
      name: "Bronze", price: "Gratis", period: "",
      color: "border-gray-200",
      badge: null,
      features: ["1 Pengguna", "Manajemen Stok Dasar", "Laporan Bulanan", "Support Email", "1 Poin per Rp 1.000"],
      cta: "Mulai Gratis", ctaStyle: 'outline',
    },
    {
      name: "Silver", price: "Rp 299K", period: "/ bulan",
      color: "border-green-500",
      badge: "Populer",
      features: ["5 Pengguna", "Semua Fitur Bronze", "Laporan Real-time", "Chatbox Pelanggan", "AI Chatbot", "2x Poin Transaksi"],
      cta: "Coba 14 Hari", ctaStyle: 'primary',
    },
    {
      name: "Gold", price: "Rp 599K", period: "/ bulan",
      color: "border-yellow-500",
      badge: "VIP",
      features: ["Pengguna Tak Terbatas", "Semua Fitur Silver", "API Integration", "Dedicated Manager", "3x Poin Transaksi", "Promo Eksklusif"],
      cta: "Hubungi Kami", ctaStyle: 'primary',
    },
  ];

  const faqs = [
    { q: "Apakah data apotek saya aman?", a: "Ya, semua data dienkripsi dengan standar AES-256 dan di-backup otomatis setiap hari ke server yang aman." },
    { q: "Bisakah saya mencoba sebelum berlangganan?", a: "Tentu! Paket Bronze tersedia gratis tanpa batas waktu. Paket Silver juga tersedia coba gratis 14 hari tanpa kartu kredit." },
    { q: "Berapa banyak pengguna yang bisa ditambahkan?", a: "Paket Bronze untuk 1 pengguna, Silver untuk 5 pengguna, dan Gold tidak terbatas." },
    { q: "Apakah tersedia aplikasi mobile?", a: "Saat ini tersedia versi web yang responsif untuk semua perangkat. Aplikasi mobile Android & iOS sedang dalam pengembangan." },
    { q: "Bagaimana cara migrasi data dari sistem lama?", a: "Tim kami siap membantu proses migrasi data. Kami mendukung import dari Excel, CSV, dan beberapa sistem apotek populer." },
  ];

  const navLinks = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Produk', href: '#produk' },
    { label: 'Konsultasi', href: '#dokter' },
    { label: 'Loyalitas', href: '#harga' },
    { label: 'Artikel', href: '#faq' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ══ NAVBAR ═══════════════════════════════════════════ */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border-none bg-transparent cursor-pointer p-0 shrink-0"
          >
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}>
                <span className="text-white font-black text-xs">AK</span>
              </div>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-gray-900 text-sm leading-tight">APOTEK KELUARGA</div>
            </div>
          </button>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-1 ml-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-semibold text-gray-600 hover:text-green-700 transition-colors no-underline rounded-lg hover:bg-green-50"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-52">
            <span className="text-gray-400 shrink-0"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Cari obat..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-gray-700 w-full font-medium"
            />
          </div>

          {/* Cart */}
          <button
            onClick={() => user ? navigate('/cart') : navigate('/login')}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
          >
            <CartIcon />
          </button>

          {/* CTA Buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate((['admin','apoteker','kasir'].includes(user.role)) ? '/dashboard' : '/shop')}
                className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-green-700 transition-colors border-none bg-transparent cursor-pointer px-2"
              >
                {(['admin','apoteker','kasir'].includes(user.role)) ? 'Dashboard' : 'Toko'}
              </button>
              <div
                onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}
                title="Klik untuk Logout"
              >
                {(user?.fullname || user?.name || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-semibold text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
              >
                Masuk / Daftar
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ══ HERO SECTION ═════════════════════════════════════ */}
      <section id="hero" className="relative min-h-[520px] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4a2a 40%, #1e5c32 100%)' }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16 flex flex-col md:flex-row items-center gap-12">
          {/* Left — Text */}
          <div className="md:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold"
              style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Sehat Bersama Keluarga
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Apotek Keluarga<br />
              <span style={{ color: '#fbbf24' }}>Terpercaya</span>
            </h1>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Dapatkan obat resep asli, konsultasi apoteker berlisensi, dan layanan kesehatan lengkap untuk seluruh keluarga Anda.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => navigate('/register')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <UploadIcon /> Unggah Resep Dokter
              </button>
              <button
                onClick={() => navigate(user ? '/shop' : '/login')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                style={{ background: 'rgba(34,197,94,0.9)', color: 'white' }}
              >
                <PillIcon /> Belanja Obat Bebas
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6">
              {stats.map((s, i) => (
                <div key={i} className={`text-center ${i < stats.length - 1 ? 'pr-6 border-r border-white/15' : ''}`}>
                  <div className="text-xl font-extrabold text-white">{s.value}</div>
                  <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom link */}
            <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Belum punya akun?{' '}
              <button onClick={() => navigate('/register')}
                className="border-none bg-transparent cursor-pointer font-bold text-green-400 hover:text-green-300 transition-colors text-xs">
                Daftar sekarang gratis
              </button>
            </p>
          </div>

          {/* Right — Image */}
          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-30"
                style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }} />
              <img
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=560&q=90"
                alt="Apoteker Profesional"
                className="relative rounded-2xl shadow-2xl w-full max-w-sm object-cover"
                style={{ border: '2px solid rgba(255,255,255,0.1)' }}
              />
              {/* Floating card */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl p-3 flex items-center gap-3"
                style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                <div>
                  <div className="text-white text-xs font-bold">Apotek Buka 24 Jam</div>
                  <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Siap Melayani Keluarga Anda</div>
                </div>
                <div className="ml-auto flex -space-x-1.5">
                  {['47','12','32','50'].map(n => (
                    <img key={n} src={`https://i.pravatar.cc/24?img=${n}`} alt="" className="w-6 h-6 rounded-full border-2 border-gray-900" />
                  ))}
                </div>
              </div>

              {/* Trust badge */}
              <div className="absolute -top-3 -right-3 rounded-xl px-3 py-2 text-center"
                style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div className="text-[9px] text-gray-400 font-bold uppercase">Terpercaya</div>
                <div className="text-[11px] font-extrabold text-gray-800">Sejak 1995</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FITUR UNGGULAN ═══════════════════════════════════ */}
      <section id="fitur" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 text-sm font-bold uppercase tracking-wide">Kenapa Kami?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Layanan Lengkap untuk Keluarga</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">Semua yang Anda butuhkan untuk kesehatan keluarga dalam satu platform.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group bg-gray-50">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-green-600 group-hover:text-white transition-colors"
                  style={{ background: '#f0fdf4' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.color = '#16a34a'; }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATISTIK ════════════════════════════════════════ */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1a3a2a, #0f2419)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "500+", label: "Apotek Terdaftar" },
              { value: "50K+", label: "Transaksi / Bulan" },
              { value: "10K+", label: "Member Aktif" },
              { value: "24/7", label: "Layanan Chatbot" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-extrabold mb-1">{s.value}</div>
                <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUK POPULER ═══════════════════════════════════ */}
      <section id="produk" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 text-sm font-bold uppercase tracking-wide">Katalog</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">Produk Kesehatan Terlaris</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto">Obat dan suplemen kesehatan paling dicari keluarga Indonesia.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden h-36">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-full text-[9px] font-bold text-gray-600 shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-green-600 font-bold text-sm">{product.price}</p>
                    <button
                      onClick={() => navigate(user ? '/shop' : '/login')}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white border-none cursor-pointer transition-all hover:scale-110"
                      style={{ background: '#16a34a' }}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate(user ? '/shop' : '/login')}
              className="px-8 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Lihat Semua Produk
            </button>
          </div>
        </div>
      </section>

      {/* ══ DOKTER KONSULTASI ════════════════════════════════ */}
      <section id="dokter" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 text-sm font-bold uppercase tracking-wide">Konsultasi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">Dokter Kami Siap Membantu</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto">Konsultasi kesehatan dengan tenaga medis profesional kapan saja.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {doctors.map((dokter, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="relative mb-4 inline-block">
                  <img src={dokter.avatar} alt={dokter.name} className="w-20 h-20 rounded-full object-cover mx-auto" />
                  <span className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-white ${dokter.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{dokter.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{dokter.spesialis}</p>
                <button
                  onClick={() => navigate(user ? '/shop' : '/login')}
                  className="w-full py-2.5 rounded-xl font-bold text-sm transition-all text-white cursor-pointer border-none"
                  style={{ background: dokter.status === 'online' ? 'linear-gradient(135deg, #22c55e, #15803d)' : '#9ca3af' }}
                >
                  {dokter.status === 'online' ? 'Chat Sekarang' : 'Jadwalkan Konsultasi'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL ══════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 text-sm font-bold uppercase tracking-wide">Testimoni</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">Dipercaya Ribuan Keluarga</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, s) => <StarIcon key={s} filled />)}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MEMBERSHIP / PRICING ═════════════════════════════ */}
      <section id="harga" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 text-sm font-bold uppercase tracking-wide">Membership</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">Program Loyalty Keluarga</h2>
            <p className="text-gray-400 mt-3">Kumpulkan poin dan naikkan tier untuk mendapatkan promo eksklusif.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`relative border-2 ${plan.color} rounded-2xl p-7 flex flex-col ${plan.badge ? 'shadow-lg' : ''} hover:shadow-lg transition-shadow`}>
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
                    {plan.badge}
                  </span>
                )}
                <h3 className="font-extrabold text-gray-800 text-lg mb-1">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-600 shrink-0"><CheckIcon /></span> {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    plan.ctaStyle === 'primary'
                      ? 'text-white border-none'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 bg-transparent'
                  }`}
                  style={plan.ctaStyle === 'primary' ? { background: 'linear-gradient(135deg, #22c55e, #15803d)' } : {}}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-green-600 text-sm font-bold uppercase tracking-wide">FAQ</span>
            <h2 className="text-3xl font-extrabold text-gray-800 mt-2">Pertanyaan Umum</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className={`text-green-600 text-xl font-bold transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ═══════════════════════════════════════ */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1a3a2a, #22c55e 200%)' }}>
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-3">Mulai Kesehatan Keluarga Anda Hari Ini</h2>
          <p className="mb-8 max-w-md mx-auto text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Bergabung dengan 10.000+ member yang sudah merasakan kemudahan layanan kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-all text-sm cursor-pointer border-none"
              style={{ color: '#15803d' }}
            >
              Daftar Member Gratis
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all text-sm cursor-pointer bg-transparent"
            >
              Sudah punya akun? Masuk
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer className="pt-16 pb-8" style={{ background: '#0f1a12' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-xs"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>AK</div>
                <span className="font-extrabold text-white">Apotek Keluarga</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Apotek keluarga terpercaya dengan layanan lengkap untuk kesehatan Anda.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Produk</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {["Manajemen Stok", "Data Pelanggan", "Laporan", "Chatbox"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Perusahaan</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {["Tentang Kami", "Blog", "Karir", "Press"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Kontak</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <li className="flex items-center gap-2"><MailIcon /> support@apotekkeluarga.id</li>
                <li className="flex items-center gap-2"><PhoneIcon /> +62 812-3456-7890</li>
                <li className="flex items-center gap-2"><MapPinIcon /> Jl. Kesehatan No.25, Jakarta</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
            style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}>
            <p>© 2026 Apotek Keluarga. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Syarat</a>
              <a href="#" className="hover:text-white transition-colors">Cookie</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}