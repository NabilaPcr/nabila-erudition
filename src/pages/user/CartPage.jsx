import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrashIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const MinusIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ShoppingBagIcon = () => (
  <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const TagIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

// Demo cart items
const demoCartItems = [
  { id: 1, name: "Paracetamol 500mg", category: "Analgetik", price: 15000, qty: 2, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&q=80" },
  { id: 2, name: "Vitamin C 1000mg", category: "Vitamin", price: 45000, qty: 1, img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&q=80" },
  { id: 3, name: "Hand Sanitizer 500ml", category: "Higiene", price: 20000, qty: 1, img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=200&q=80" },
];

export default function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(demoCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const updateQty = (id, delta) => {
    setItems(prev => prev
      .map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
      .filter(item => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SEHAT10') {
      setPromoApplied(true);
    } else {
      alert('Kode promo tidak valid');
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 0 ? 10000 : 0;
  const total = subtotal - discount + shipping;

  if (checkoutDone) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: '#f0fdf4' }}>
          <svg width="32" height="32" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Pesanan Berhasil!</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-sm">
          Pesanan Anda sedang diproses. Anda akan mendapat notifikasi ketika obat siap dikirim.
        </p>
        <div className="flex gap-3">
          <button onClick={() => navigate('/orders')}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white border-none cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}>
            Lihat Pesanan
          </button>
          <button onClick={() => { setItems(demoCartItems); setCheckoutDone(false); navigate('/shop'); }}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-gray-700 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
            Belanja Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 m-0">Keranjang Belanja</h1>
        <p className="text-sm text-gray-400 m-0 mt-1">{items.length} produk dalam keranjang</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
          <div className="flex justify-center text-gray-200 mb-4"><ShoppingBagIcon /></div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">Keranjang Anda masih kosong</h3>
          <p className="text-sm text-gray-400 mb-6">Silakan tambahkan produk ke keranjang untuk melakukan checkout.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white border-none cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Cart Items ──────────────────────── */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">{item.category}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
                  <p className="text-sm font-extrabold m-0" style={{ color: '#16a34a' }}>
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
                    <MinusIcon />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-gray-900">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
                    <PlusIcon />
                  </button>
                </div>
                <div className="shrink-0 text-right min-w-[80px]">
                  <p className="text-sm font-extrabold text-gray-900 m-0">
                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                  </p>
                  <button onClick={() => removeItem(item.id)}
                    className="mt-1 text-red-400 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ─────────────────── */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-900 mb-5">Ringkasan Pesanan</h3>

              {/* Promo code */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><TagIcon /></span>
                  <input
                    type="text"
                    placeholder="Kode promo"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-all"
                  />
                </div>
                <button
                  onClick={applyPromo}
                  disabled={promoApplied}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)' }}
                >
                  Pakai
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-green-600 font-bold mb-4 -mt-2">Kode SEHAT10 berhasil diterapkan!</p>
              )}

              {/* Summary */}
              <div className="flex flex-col gap-3 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Diskon (10%)</span>
                    <span className="font-semibold">-Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-gray-900">Rp {shipping.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-extrabold text-gray-900 border-t border-gray-100 pt-3 text-base">
                  <span>Total</span>
                  <span style={{ color: '#16a34a' }}>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutDone(true)}
                className="w-full mt-5 py-3.5 rounded-xl font-bold text-sm text-white border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)', boxShadow: '0 4px 15px rgba(34,197,94,0.3)' }}
              >
                Checkout Sekarang
              </button>

              <button onClick={() => navigate('/shop')}
                className="w-full mt-2 py-2.5 rounded-xl font-semibold text-sm text-gray-500 bg-transparent border-none cursor-pointer hover:bg-gray-50 transition-colors">
                Lanjut Belanja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
