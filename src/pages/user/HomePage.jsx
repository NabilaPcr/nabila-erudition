import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.4s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '24px', padding: '2.5rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px rgba(16,185,129,0.3)', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 0.5rem', color: 'white' }}>Halo, {user?.fullname || user?.name || 'Pelanggan'}! 👋</h1>
          <p style={{ fontSize: '15px', opacity: 0.9, margin: 0, maxWidth: '400px' }}>Selamat datang di Apotek Keluarga. Ada yang bisa kami bantu hari ini?</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button onClick={() => navigate('/shop')} style={{ background: 'white', color: '#10b981', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Belanja Obat</button>
            <button onClick={() => navigate('/my-prescription')} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Upload Resep</button>
          </div>
        </div>
        <div style={{ fontSize: '80px', opacity: 0.8 }}>🏥</div>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '1rem' }}>Rekomendasi Produk</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '1rem', border: '1px solid #f3f4f6' }}>
            <div style={{ background: '#f9fafb', height: '140px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '1rem' }}>💊</div>
            <h3 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 0.25rem' }}>Vitamin C 1000mg</h3>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 0.75rem' }}>Suplemen Kesehatan</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#10b981' }}>Rp 45.000</span>
              <button style={{ background: '#ecfdf5', color: '#10b981', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
