import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';  // ← perhatikan huruf kecil
import Button from '../../components/Button';          // ← perhatikan huruf kecil
import Alert from '../../components/Alert';            // ← perhatikan huruf kecil
import { userAPI } from '../../services/userAPI';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/guest');
        }
      } catch (error) {
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

      const user = await userAPI.loginUser(formData.email, formData.password);

      if (!user) {
        setError('Email atau password salah!');
        setLoading(false);
        return;
      }

      if (user.status === 'inactive') {
        setError('Akun Anda dinonaktifkan. Hubungi administrator.');
        setLoading(false);
        return;
      }

      // Simpan data user
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        status: user.status
      }));

      console.log('✅ User logged in:', user);
      
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/guest');
      }
      
    } catch (error) {
      console.error('❌ Login error:', error);
      setError('Terjadi kesalahan. Silahkan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-700">Selamat Datang</h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Silahkan masuk ke dashboard admin</p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <form className="space-y-4 w-full" onSubmit={handleLogin}>
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="nama@apotek.com"
          required
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••••••••••••••••••••••••"
          required
        />
        <div className="flex justify-end pt-1">
          <button 
            type="button" 
            className="text-xs font-bold text-slate-400 hover:text-apotek-merah transition-colors"
          >
            Lupa Password?
          </button>
        </div>
        <Button type="danger" onClick={handleLogin} disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </Button>
      </form>

      <p className="mt-10 text-center text-[13px] text-slate-400 font-medium">
        Belum punya akun? <Link to="/register" className="text-apotek-merah font-black hover:underline ml-1">Daftar Sekarang</Link>
      </p>
    </div>
  );
}