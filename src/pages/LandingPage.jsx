import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

// ─── Icon helpers ─────────────────────────────────────────
const Icon = ({ src, alt, size = "w-8 h-8" }) => (
  <img src={src} alt={alt} className={`${size} object-contain`} />
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        navigate(user.role === 'admin' ? '/dashboard' : '/guest');
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  // ── Data ──────────────────────────────────────────────────
  const features = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3176/3176366.png",
      title: "Manajemen Stok",
      desc: "Pantau stok obat secara real-time, notifikasi otomatis saat stok menipis.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      title: "Data Pelanggan",
      desc: "Simpan riwayat pembelian dan resep setiap pelanggan dalam satu tempat.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
      title: "Laporan Penjualan",
      desc: "Analitik penjualan harian, mingguan, dan bulanan dengan grafik interaktif.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      title: "Multi Pengguna",
      desc: "Kelola akses admin dan staff dengan role management yang fleksibel.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2037/2037543.png",
      title: "Konsultasi Chat",
      desc: "Fitur chatbox untuk konsultasi langsung antara apoteker dan pelanggan.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3456/3456426.png",
      title: "Keamanan Data",
      desc: "Enkripsi data dan backup otomatis untuk keamanan informasi apotek Anda.",
    }
  ];

  const stats = [
    { value: "500+", label: "Apotek Terdaftar" },
    { value: "50K+", label: "Transaksi / Bulan" },
    { value: "99.9%", label: "Uptime Server" },
    { value: "24/7", label: "Dukungan Tim" },
  ];

  const testimonials = [
    {
      name: "Dr. Sari Wulandari",
      role: "Apoteker, Jakarta",
      avatar: "https://i.pravatar.cc/80?img=47",
      text: "Stok obat jadi mudah dipantau. Laporan penjualan yang akurat sangat membantu pengelolaan apotek saya.",
    },
    {
      name: "Budi Santoso",
      role: "Pemilik Apotek, Surabaya",
      avatar: "https://i.pravatar.cc/80?img=12",
      text: "Fitur multi-pengguna memudahkan koordinasi antara saya dan staff. Sangat rekomendasikan!",
    },
    {
      name: "Rina Kusuma",
      role: "Admin Apotek, Bandung",
      avatar: "https://i.pravatar.cc/80?img=32",
      text: "Antarmuka yang bersih dan mudah dipahami. Proses onboarding sangat cepat, kurang dari sejam sudah bisa digunakan.",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "Gratis",
      period: "",
      color: "border-gray-200",
      badge: "",
      features: ["1 Pengguna", "Manajemen Stok Dasar", "Laporan Bulanan", "Support Email"],
      cta: "Mulai Gratis",
      ctaType: "outline",
    },
    {
      name: "Pro",
      price: "Rp 299K",
      period: "/ bulan",
      color: "border-apotek-merah",
      badge: "Populer",
      features: ["5 Pengguna", "Semua Fitur Starter", "Laporan Real-time", "Chatbox Pelanggan", "Support Prioritas"],
      cta: "Coba 14 Hari",
      ctaType: "danger",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      color: "border-apotek-hijau",
      badge: "",
      features: ["Pengguna Tak Terbatas", "Semua Fitur Pro", "API Integration", "Dedicated Manager", "SLA 99.9%"],
      cta: "Hubungi Kami",
      ctaType: "primary",
    },
  ];

  const faqs = [
    {
      q: "Apakah data apotek saya aman?",
      a: "Ya, semua data dienkripsi dengan standar AES-256 dan di-backup otomatis setiap hari ke server yang aman.",
    },
    {
      q: "Bisakah saya mencoba sebelum berlangganan?",
      a: "Tentu! Paket Starter tersedia gratis tanpa batas waktu. Paket Pro juga tersedia coba gratis 14 hari tanpa kartu kredit.",
    },
    {
      q: "Berapa banyak pengguna yang bisa saya tambahkan?",
      a: "Paket Starter untuk 1 pengguna, Paket Pro untuk 5 pengguna, dan Paket Enterprise tidak terbatas.",
    },
    {
      q: "Apakah tersedia aplikasi mobile?",
      a: "Saat ini tersedia versi web yang responsif untuk semua perangkat. Aplikasi mobile Android & iOS sedang dalam pengembangan.",
    },
    {
      q: "Bagaimana cara migrasi data dari sistem lama?",
      a: "Tim kami siap membantu proses migrasi data. Kami mendukung import dari Excel, CSV, dan beberapa sistem apotek populer.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ════════════════════════════════════════════════════
      ██  PRD 1 — DASAR
      ██  Navbar + Hero Section + CTA utama
      ════════════════════════════════════════════════════ */}
      
      {/* ── Navbar ─────────────────────────────────────── */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-apotek-merah rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow">
              AK
            </div>
            <div>
              <span className="font-extrabold text-gray-800 text-base leading-none block">Apotek Keluarga</span>
              <span className="text-[10px] text-gray-400 font-medium">CRM System</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
            <a href="#fitur" className="hover:text-apotek-merah transition-colors">Fitur</a>
            <a href="#statistik" className="hover:text-apotek-merah transition-colors">Statistik</a>
            <a href="#harga" className="hover:text-apotek-merah transition-colors">Harga</a>
            <a href="#faq" className="hover:text-apotek-merah transition-colors">FAQ</a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-gray-600 hover:text-apotek-merah transition-colors px-3 py-2"
            >
              Masuk
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-sm font-semibold bg-apotek-merah text-white px-5 py-2.5 rounded-xl hover:bg-red-500 transition-all shadow-sm"
            >
              Daftar Gratis
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────── */}
      <section className="bg-gradient-to-br from-red-50 via-white to-green-50 pt-20 pb-24">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Teks */}
          <div className="md:w-1/2 text-center md:text-left">
            <span className="inline-block bg-red-100 text-apotek-merah text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              CRM Apotek #1 di Indonesia
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Kelola Apotek Lebih{" "}
              <span className="text-apotek-merah">Cerdas</span> &amp;{" "}
              <span className="text-apotek-hijau">Efisien</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Sistem CRM apotek terpadu — manajemen stok, data pelanggan, laporan penjualan, dan konsultasi dalam satu platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={() => navigate('/register')}
                className="bg-apotek-merah hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
              >
                Mulai Gratis Sekarang
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border-2 border-gray-200 hover:border-apotek-merah text-gray-700 font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
              >
                Login ke Dashboard →
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">✓ Gratis selamanya &nbsp;·&nbsp; ✓ Tanpa kartu kredit &nbsp;·&nbsp; ✓ Setup &lt; 5 menit</p>
          </div>

          {/* Gambar */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-200 to-green-200 rounded-3xl blur-2xl opacity-40"></div>
              <img
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=560"
                alt="Apotek CRM Dashboard"
                className="relative rounded-2xl shadow-2xl w-full max-w-sm object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ── END PRD 1 ───────────────────────────────────── */}


      {/* ════════════════════════════════════════════════════
      ██  PRD 2 — MENENGAH
      ██  Fitur Unggulan + Statistik + Testimonial
      ════════════════════════════════════════════════════ */}

      {/* ── Fitur Unggulan ──────────────────────────────── */}
      <section id="fitur" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-apotek-merah text-sm font-bold uppercase tracking-wide">Kenapa Kami?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">Fitur Unggulan CRM Apotek</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto">Semua yang Anda butuhkan untuk mengelola apotek secara profesional ada di sini.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-apotek-merah hover:shadow-md transition-all group bg-gray-50">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                  <Icon src={f.icon} alt={f.title} size="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statistik ───────────────────────────────────── */}
      <section id="statistik" className="py-16 bg-apotek-merah">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-extrabold mb-1">{s.value}</div>
                <div className="text-red-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-apotek-hijau text-sm font-bold uppercase tracking-wide">Testimoni</span>
            <h2 className="text-3xl font-extrabold text-gray-800 mt-2">Dipercaya Ribuan Apotek</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-yellow-400 text-sm">★</span>
                  ))}
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
      {/* ── END PRD 2 ───────────────────────────────────── */}


      {/* ════════════════════════════════════════════════════
      ██  PRD 3 — KOMPLIT
      ██  Pricing / Paket + FAQ + Footer Lengkap
      ════════════════════════════════════════════════════ */}

      {/* ── Pricing ─────────────────────────────────────── */}
      <section id="harga" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-apotek-merah text-sm font-bold uppercase tracking-wide">Harga</span>
            <h2 className="text-3xl font-extrabold text-gray-800 mt-2">Pilih Paket yang Tepat</h2>
            <p className="text-gray-400 mt-3">Mulai gratis, upgrade kapan saja sesuai kebutuhan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative border-2 ${plan.color} rounded-2xl p-7 flex flex-col hover:shadow-lg transition-shadow ${plan.badge ? 'shadow-md' : ''}`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-apotek-merah text-white text-xs font-bold px-4 py-1 rounded-full">
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
                      <span className="text-apotek-hijau font-bold">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    plan.ctaType === 'danger' ? 'bg-apotek-merah text-white hover:bg-red-500' :
                    plan.ctaType === 'primary' ? 'bg-apotek-hijau text-white hover:bg-green-600' :
                    'border-2 border-gray-300 text-gray-700 hover:border-apotek-merah hover:text-apotek-merah'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-apotek-merah text-sm font-bold uppercase tracking-wide">FAQ</span>
            <h2 className="text-3xl font-extrabold text-gray-800 mt-2">Pertanyaan Umum</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span className={`text-apotek-merah text-xl font-bold transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
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

      {/* ── CTA Banner ──────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-apotek-merah to-red-400">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-3">Siap Mengoptimalkan Apotek Anda?</h2>
          <p className="text-red-100 mb-8 max-w-md mx-auto">Bergabung dengan 500+ apotek yang sudah mempercayakan pengelolaan mereka kepada kami.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-apotek-merah font-bold px-8 py-3.5 rounded-xl hover:bg-red-50 transition-all shadow-md text-sm"
            >
              Daftar Sekarang — Gratis
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all text-sm"
            >
              Sudah punya akun? Masuk →
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer Lengkap ──────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-apotek-merah rounded-xl flex items-center justify-center text-white font-extrabold text-sm">AK</div>
                <span className="font-extrabold text-white">Apotek Keluarga</span>
              </div>
              <p className="text-sm leading-relaxed">CRM terpadu untuk apotek modern. Efisien, aman, dan mudah digunakan.</p>
            </div>
            {/* Produk */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Produk</h4>
              <ul className="space-y-2 text-sm">
                {["Manajemen Stok", "Data Pelanggan", "Laporan", "Chatbox"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Perusahaan */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Perusahaan</h4>
              <ul className="space-y-2 text-sm">
                {["Tentang Kami", "Blog", "Karir", "Press"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Kontak */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Kontak</h4>
              <ul className="space-y-2 text-sm">
                <li>📧 support@apotekkeluarga.id</li>
                <li>📞 +62 812-3456-7890</li>
                <li>🏠 Jl. Kesehatan No.25, Jakarta</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <p>© 2026 Apotek Keluarga. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Syarat</a>
              <a href="#" className="hover:text-white transition-colors">Cookie</a>
            </div>
          </div>
        </div>
      </footer>
      {/* ── END PRD 3 ───────────────────────────────────── */}
    </div>
  );
}