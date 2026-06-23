import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { userAPI } from '../../services/userAPI';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '',              // ← ganti fullname → name
    email: '', 
    password: '',
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Cek jika sudah login
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

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Semua field harus diisi!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak sama!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter!');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const emailExists = await userAPI.checkEmailExists(formData.email);
      
      if (emailExists) {
        setError('Email sudah terdaftar! Silahkan gunakan email lain.');
        setLoading(false);
        return;
      }

      const newUser = {
        fullname: formData.name,  // ← API akan map ke 'name'
        email: formData.email,
        password: formData.password,
        role: 'user'              // ← ganti 'staff' → 'user'
      };

      await userAPI.createUser(newUser);
      
      console.log('✅ User registered successfully');
      setSuccess('Akun berhasil dibuat! Silahkan login.');
      setLoading(false);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('❌ Register error:', error);
      setError('Gagal mendaftar. Silahkan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-700">Buat Akun Baru</h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Daftar sebagai staf Apotek Keluarga 25</p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <form className="space-y-4 w-full" onSubmit={handleRegister}>
        <InputField
          label="Full Name"
          type="text"
          name="name"           // ← ganti fullname → name
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          required
        />
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
          placeholder="Minimal 6 karakter"
          required
        />
        <InputField
          label="Konfirmasi Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Ulangi password"
          required
        />
        <Button type="success" onClick={handleRegister} disabled={loading}>
          {loading ? 'Memproses...' : 'Daftar Akun'}
        </Button>
      </form>

      <p className="mt-10 text-center text-[13px] text-slate-400 font-medium">
        Sudah punya akun? <Link to="/login" className="text-apotek-hijau font-black hover:underline ml-1">Masuk Saja</Link>
      </p>
    </div>
  );
}