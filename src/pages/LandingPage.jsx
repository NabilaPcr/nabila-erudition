// pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Container from '../components/Container';
import Button from '../components/Button';
import Footer from '../components/Footer';


export default function LandingPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Jika sudah login, redirect ke dashboard
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-apotek-latar">
      {/* Header Sederhana */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-apotek-merah rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AK
            </div>
            <span className="font-bold text-gray-800">Apotek Keluarga</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-gray-600 hover:text-apotek-merah transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="text-sm font-medium bg-apotek-merah text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection
        title="Apotek Keluarga 25"
        subtitle="Solusi Kesehatan Terpercaya untuk Keluarga Anda. Dapatkan obat-obatan berkualitas dengan harga terjangkau."
        image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600"
        buttonText="Mulai Belanja"
        onButtonClick={() => navigate('/login')}
      />

      {/* Layanan Kami */}
      <Container>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Layanan Kami</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Konsultasi gratis dengan apoteker berpengalaman
          </p>
          <Button 
            type="primary" 
            onClick={() => navigate('/login')}
            className="mt-8"
          >
            Login untuk Mulai
          </Button>
        </div>
      </Container>

     <Footer/>
    </div>
  );
}