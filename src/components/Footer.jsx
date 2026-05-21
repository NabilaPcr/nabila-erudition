// components/Footer.jsx - menggunakan tema apotek
export default function Footer() {
  return (
    <footer className="bg-apotek-latar border-t border-apotek-hijau py-8 mt-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-3">
         
        </div>
        <h3 className="font-bold text-slate-700 mb-1">Apotek Keluarga 25</h3>
        <p className="text-slate-400 text-sm mb-3">
          Jl. Kesehatan No. 25, Kota Pelayanan
        </p>
        <div className="flex justify-center gap-4 mb-3">
          <a href="#" className="text-slate-400 hover:text-apotek-merah transition-colors text-xs">
            Tentang
          </a>
          <a href="#" className="text-slate-400 hover:text-apotek-merah transition-colors text-xs">
            Layanan
          </a>
          <a href="#" className="text-slate-400 hover:text-apotek-merah transition-colors text-xs">
            Kontak
          </a>
        </div>
        <p className="text-slate-400 text-xs">
          © 2026 Apotek Keluarga 25. All rights reserved.
        </p>
      </div>
    </footer>
  );
}