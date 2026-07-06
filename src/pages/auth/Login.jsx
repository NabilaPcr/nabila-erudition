import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/userAPI';

const ADMIN_ROLES = ['admin', 'apoteker', 'kasir'];

// SVG Icons
const MailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

const EyeIcon = ({ show }) => show ? (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
) : (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (ADMIN_ROLES.includes(user.role)) {
          navigate('/dashboard');
        } else {
          navigate('/shop');
        }
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi!');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Hardcode bypass untuk demo admin
      if (formData.email === 'admin@apotek.com' && formData.password === 'admin123') {
        const demoAdmin = {
          id: 'demo-admin-1',
          fullname: 'Admin Demo',
          email: 'admin@apotek.com',
          role: 'admin',
          status: 'active'
        };
        localStorage.setItem('user', JSON.stringify(demoAdmin));
        navigate('/dashboard');
        return;
      }

      // Demo user bypass
      if (formData.email === 'user@apotek.com' && formData.password === 'user123') {
        const demoUser = {
          id: 'demo-user-1',
          fullname: 'User Demo',
          email: 'user@apotek.com',
          role: 'user',
          status: 'active'
        };
        localStorage.setItem('user', JSON.stringify(demoUser));
        navigate('/shop');
        return;
      }

      const user = await userAPI.loginUser(formData.email, formData.password);

      if (!user) {
        setError('Email atau password salah. Periksa kembali kredensial Anda.');
        setLoading(false);
        return;
      }

      if (user.status === 'inactive') {
        setError('Akun Anda dinonaktifkan. Hubungi administrator.');
        setLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        fullname: user.fullname || user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }));

      if (ADMIN_ROLES.includes(user.role)) {
        navigate('/dashboard');
      } else {
        navigate('/shop');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan koneksi. Silahkan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 m-0 mb-1">
          Selamat Datang Kembali
        </h1>
        <p className="text-sm text-gray-400 m-0 font-medium">
          Masuk ke akun Apotek Keluarga Anda
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <span className="text-red-500 shrink-0 mt-0.5"><AlertIcon /></span>
          <p className="text-red-700 text-sm font-medium m-0 flex-1">{error}</p>
          <button
            onClick={() => setError('')}
            className="ml-auto text-red-300 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer text-lg shrink-0leading-none"
          >
            ×
          </button>
        </div>
      )}

      {/* Form */}
      <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <MailIcon />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@apotek.com"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Password
            </label>
            <button
              type="button"
              className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-600 transition-colors bg-transparent border-none cursor-pointer"
            >
              Lupa Password?
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <LockIcon />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
              className="w-full pl-10 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer"
            >
              <EyeIcon show={showPassword} />
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3.5 text-white font-bold rounded-xl transition-all duration-200 border-none cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 text-sm shadow-lg"
          style={{ background: loading ? '#6b7280' : 'linear-gradient(135deg, #22c55e, #15803d)', boxShadow: '0 4px 15px rgba(34,197,94,0.3)' }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Memproses...
            </span>
          ) : (
            'Masuk ke Akun'
          )}
        </button>
      </form>

      {/* Info Akun Demo */}
      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
        <p className="text-[11px] font-bold text-emerald-700 mb-3 uppercase tracking-wide">
          Akun Demo
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded-lg p-2.5 border border-emerald-100">
            <div className="text-[9px] text-emerald-600 font-bold uppercase mb-1">Admin</div>
            <div className="text-gray-700 font-semibold">admin@apotek.com</div>
            <div className="text-gray-400 mt-0.5">admin123</div>
          </div>
          <div className="bg-white rounded-lg p-2.5 border border-emerald-100">
            <div className="text-[9px] text-blue-600 font-bold uppercase mb-1">User</div>
            <div className="text-gray-700 font-semibold">user@apotek.com</div>
            <div className="text-gray-400 mt-0.5">user123</div>
          </div>
        </div>
      </div>

      {/* Register link */}
      <p className="mt-5 text-center text-[13px] text-gray-400 font-medium">
        Belum punya akun?{' '}
        <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 no-underline transition-colors">
          Daftar Gratis
        </Link>
      </p>
    </div>
  );
}