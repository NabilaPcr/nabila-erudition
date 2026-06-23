import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/userAPI';

// Import default (tanpa kurung kurawal)
import Button from '../components/Button';
import InputField from '../components/InputField';
import Badge from '../components/Badge';
import Card from '../components/Card';

// Import named exports (pakai kurung kurawal) dari components/ui
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

export default function Guest() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [obatList, setObatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  
  // State baru untuk Slide Gambar (Hero Carousel)
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Pelayanan Kesehatan Keluarga Terbaik",
      desc: "Menyediakan obat-obatan asli, berkualitas, dan terpercaya untuk seluruh anggota keluarga Anda.",
    },
    {
      title: "Konsultasi Apoteker Ramah",
      desc: "Dapatkan panduan dosis dan penggunaan obat yang tepat langsung dari tim profesional kami.",
    },
    {
      title: "Stok Lengkap & Selalu Tersedia",
      desc: "Mulai dari suplemen harian hingga obat resep, kami siap memenuhi kebutuhan medis Anda.",
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Ambil data user dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.role === 'admin') {
        navigate('/dashboard');
        return;
      }
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  // Fetch data obat
  useEffect(() => {
    fetchObat();
  }, []);

  const fetchObat = async () => {
    try {
      setLoading(true);
      const dummyObat = [
        { id: 1, kode: 'OBT-001', nama: 'Paracetamol', kategori: 'Obat Bebas', stok: 50, harga: 10000 },
        { id: 2, kode: 'OBT-002', nama: 'Amoxicillin', kategori: 'Obat Keras', stok: 30, harga: 25000 },
        { id: 3, kode: 'OBT-003', nama: 'Vitamin C', kategori: 'Suplemen', stok: 100, harga: 15000 },
        { id: 4, kode: 'OBT-004', nama: 'Antangin', kategori: 'Herbal', stok: 75, harga: 8000 },
      ];
      setObatList(dummyObat);
    } catch (error) {
      console.error('Error fetching obat:', error);
    } finally {
      loading && setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const filteredObat = obatList.filter((item) => {
    return searchTerm === "" || 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kode.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatHarga = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(harga);
  };

  const getStatusStok = (stok) => {
    if (stok === 0) return { variant: "danger", text: "Habis" };
    if (stok < 20) return { variant: "warning", text: "Menipis" };
    return { variant: "success", text: "Tersedia" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      
      {/* Header / Navbar dengan Layout Navigasi Tambahan */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Kiri: Logo dan Link Navigasi Menu */}
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-black text-xs">
                  AK
                </div>
                <span className="ml-3 text-sm font-black text-slate-800 hidden md:block">
                  Apotek Keluarga 25
                </span>
              </div>
              
              {/* Navigasi Khusus Halaman Guest */}
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
                <a href="#katalog" className="hover:text-red-500 transition-colors">Katalog Produk</a>
                <a href="#about" className="hover:text-red-500 transition-colors">About Us</a>
                <a href="#developer" className="hover:text-red-500 transition-colors">Developer Team</a>
              </div>
            </div>
            
            {/* Kanan: Info User, Profil, dan Logout */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden lg:block">
                Halo, <span className="font-medium">{user?.name || 'Guest'}</span>
              </span>
              
              <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                <DialogTrigger asChild>
                  <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">
                      {user?.name?.charAt(0) || 'G'}
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Profil Saya</DialogTitle>
                    <DialogDescription>Informasi akun Anda</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right font-medium">Nama</label>
                      <span className="col-span-3">{user?.name}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right font-medium">Email</label>
                      <span className="col-span-3">{user?.email}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right font-medium">Role</label>
                      <span className="col-span-3">
                        <Badge type="secondary">{user?.role}</Badge>
                      </span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="outline" onClick={() => setShowProfileDialog(false)}>
                      Tutup
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button 
                type="outline" 
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Section 1: Hero / Slide Gambar Banner */}
        <section id="home" className="bg-white border-b border-gray-200 py-16 px-4">
          <div className="max-w-7xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-16 relative overflow-hidden shadow-inner min-h-[300px] flex flex-col justify-center">
            {/* Slide Item */}
            <div className="max-w-xl transition-all duration-500 ease-in-out">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-50 px-3 py-1 rounded-full">
                Apotek Keluarga Info
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 mt-4 leading-tight">
                {slides[currentSlide].title}
              </h2>
              <p className="text-gray-500 mt-4 text-sm md:text-base">
                {slides[currentSlide].desc}
              </p>
              <div className="mt-8">
                <a href="#katalog">
                  <Button className="bg-red-500 hover:bg-red-600 text-white font-medium">
                    Lihat Katalog Obat
                  </Button>
                </a>
              </div>
            </div>

            {/* Slider Dots Indicator */}
            <div className="absolute bottom-6 right-8 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? "w-6 bg-red-500" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Katalog Obat-obatan / Produk (Ubah Tampilan Jadi Card Grid) */}
        <section id="katalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Katalog Produk Kesehatan</h2>
              <p className="text-gray-500 mt-1 text-sm">Temukan obat asli dan kebutuhan suplemen Anda di sini</p>
            </div>
            
            {/* Input Search */}
            <div className="w-full md:w-80">
              <InputField
                type="text"
                placeholder="Cari obat atau kode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Grid Layout untuk Katalog Produk */}
          {filteredObat.length === 0 ? (
            <div className="text-center bg-white border border-gray-200 rounded-xl py-12 text-gray-500">
              {searchTerm ? "Produk obat tidak ditemukan" : "Belum ada data obat"}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredObat.map((item) => {
                const status = getStatusStok(item.stok);
                return (
                  <Card key={item.id} className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      {/* Bagian Atas Card */}
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className="text-xs font-mono text-gray-400">{item.kode}</span>
                        <Badge type={status.variant}>{status.text}</Badge>
                      </div>
                      
                      {/* Dummy Placeholder Visual untuk Box Obat (Sesuai Batasan Warna) */}
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-400 font-bold text-sm">
                        {item.nama} Visual
                      </div>

                      <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{item.nama}</h3>
                      <p className="text-xs text-gray-500 mb-4">{item.kategori}</p>
                    </div>

                    {/* Bagian Bawah Card */}
                    <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Harga</span>
                        <span className="font-bold text-gray-900">{formatHarga(item.harga)}</span>
                      </div>
                      <span className="text-xs text-gray-500">Stok: <b className="text-gray-700">{item.stok}</b></span>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Section 3: About Us */}
        <section id="about" className="bg-white border-t border-b border-gray-200 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Apotek Keluarga 25</h2>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              Kami berkomitmen tinggi untuk memberikan solusi kesehatan terpadu bagi keluarga Anda. Melalui penyediaan obat yang komprehensif, pelayanan resep yang cepat, serta konsultasi kefarmasian yang akurat, kami memastikan Anda mendapatkan hak pelayanan kesehatan terbaik dengan aman dan nyaman.
            </p>
          </div>
        </section>

        {/* Section 4: Developer Team */}
        <section id="developer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Developer Team</h2>
            <p className="text-gray-500 text-sm mt-1">Sistem ini dikembangkan dan dirawat dengan penuh dedikasi oleh</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Dev 1 */}
            <Card className="p-4 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-gray-600">FE</div>
              <h4 className="font-bold text-sm text-gray-900">Frontend Engineer</h4>
              <p className="text-xs text-gray-500 mt-1">User Interface & UX Developer</p>
            </Card>
            {/* Dev 2 */}
            <Card className="p-4 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-gray-600">BE</div>
              <h4 className="font-bold text-sm text-gray-900">Backend Specialist</h4>
              <p className="text-xs text-gray-500 mt-1">API & Database Integrator</p>
            </Card>
            {/* Dev 3 */}
            <Card className="p-4 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-gray-600">QA</div>
              <h4 className="font-bold text-sm text-gray-900">Quality Assurance</h4>
              <p className="text-xs text-gray-500 mt-1">System Analyst & Tester</p>
            </Card>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Apotek Keluarga 25. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <a href="#about" className="hover:underline">Kebijakan Privasi</a>
            <a href="#about" className="hover:underline">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>

    </div>
  );
}