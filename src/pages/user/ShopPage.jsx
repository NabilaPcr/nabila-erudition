import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const SortIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 6h18M7 12h10M11 18h4"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7"/>
  </svg>
);

const products = [
  { id: 1, name: "Paracetamol 500mg", category: "Analgetik", price: 15000, stock: 120, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80" },
  { id: 2, name: "Vitamin C 1000mg", category: "Vitamin", price: 45000, stock: 85, img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&q=80" },
  { id: 3, name: "Masker Medis 3ply", category: "P3K", price: 25000, stock: 200, img: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&q=80" },
  { id: 4, name: "Hand Sanitizer 500ml", category: "Higiene", price: 20000, stock: 60, img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=300&q=80" },
  { id: 5, name: "Thermometer Digital", category: "Alkes", price: 75000, stock: 30, img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&q=80" },
  { id: 6, name: "Obat Batuk Sirup 100ml", category: "OTC", price: 35000, stock: 95, img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&q=80" },
  { id: 7, name: "Suplemen Imun Tablet", category: "Suplemen", price: 120000, stock: 55, img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&q=80" },
  { id: 8, name: "Tensimeter Digital", category: "Alkes", price: 250000, stock: 15, img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&q=80" },
  { id: 9, name: "Amoxicillin 500mg", category: "Antibiotik", price: 8000, stock: 40, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80" },
  { id: 10, name: "ORS Oralit Serbuk", category: "OTC", price: 5000, stock: 150, img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&q=80" },
  { id: 11, name: "Antasida Doen Tablet", category: "OTC", price: 12000, stock: 70, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80" },
  { id: 12, name: "Betadine Antiseptik", category: "P3K", price: 18000, stock: 90, img: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&q=80" },
];

const categories = ['Semua', 'Analgetik', 'Vitamin', 'Antibiotik', 'OTC', 'P3K', 'Suplemen', 'Alkes', 'Higiene'];

export default function ShopPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [cart, setCart] = useState({});
  const [notification, setNotification] = useState('');

  const filtered = products
    .filter(p => selectedCategory === 'Semua' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const addToCart = (product) => {
    setCart(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    setNotification(`${product.name} ditambahkan ke keranjang`);
    setTimeout(() => setNotification(''), 2500);
  };

  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="animate-fade-in">
      {/* Notification toast */}
      {notification && (
        <div className="fixed top-20 right-5 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in">
          {notification}
        </div>
      )}

      {/* ── Header ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 m-0">Toko Obat Online</h1>
          <p className="text-sm text-gray-400 m-0 mt-1">Temukan obat dan produk kesehatan berkualitas</p>
        </div>
        <div className="flex items-center gap-3">
          {totalCartItems > 0 && (
            <button
              onClick={() => navigate('/cart')}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white border-none cursor-pointer transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/>
              </svg>
              Keranjang
              <span className="bg-white text-green-700 text-[10px] font-extrabold rounded-full px-1.5 py-0.5 leading-none">
                {totalCartItems}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ── Search & Sort ────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Cari nama obat..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:border-green-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
          <SortIcon />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border-none bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer"
          >
            <option value="default">Sortir: Default</option>
            <option value="price_asc">Harga Terendah</option>
            <option value="price_desc">Harga Tertinggi</option>
            <option value="name">Nama A-Z</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* ── Sidebar Kategori ─────────────────── */}
        <div className="hidden lg:block w-52 shrink-0">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Kategori</h3>
            <div className="flex flex-col gap-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all border-none cursor-pointer ${
                    selectedCategory === cat
                      ? 'text-green-700 bg-green-50 font-bold'
                      : 'text-gray-600 hover:bg-gray-50 bg-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Filter Harga</h3>
              <input type="range" className="w-full accent-green-600" />
              <div className="flex justify-between text-xs font-semibold text-gray-400 mt-1">
                <span>Rp 0</span>
                <span>Rp 500K+</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid Produk ──────────────────────── */}
        <div className="flex-1">
          {/* Mobile category scroll */}
          <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-white border-transparent'
                    : 'text-gray-600 border-gray-200 bg-white'
                }`}
                style={selectedCategory === cat ? { background: '#16a34a', borderColor: '#16a34a' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 font-medium mb-4">{filtered.length} produk ditemukan</p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(product => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                <div className="relative overflow-hidden h-36 bg-gray-50">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-white text-[9px] font-bold text-gray-600 px-2 py-0.5 rounded-full shadow-sm">
                    {product.category}
                  </span>
                  {product.stock < 20 && (
                    <span className="absolute top-2 right-2 bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Terbatas
                    </span>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight line-clamp-2">{product.name}</h3>
                  <p className="text-[10px] text-gray-400 font-medium mb-3 flex-1">Stok: {product.stock}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold" style={{ color: '#16a34a' }}>
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white border-none cursor-pointer transition-all hover:scale-110 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="flex justify-center mb-3 text-gray-300">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-700 mb-1">Produk tidak ditemukan</h3>
              <p className="text-sm text-gray-400">Coba kata kunci atau kategori lain</p>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button className="bg-white border border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-700 font-semibold px-8 py-2.5 rounded-xl transition-all cursor-pointer text-sm">
                Muat Lebih Banyak
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
