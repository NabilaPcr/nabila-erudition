import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.password) {
      alert("Semua field harus diisi!");
      return;
    }
    setSuccess("Akun berhasil dibuat!");
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-700">Buat Akun Baru</h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Daftar sebagai staf Apotek Keluarga 25</p>
      </div>

      {success && <Alert type="success" message={success} />}

      <form className="space-y-4 w-full" onSubmit={handleRegister}>
        <InputField
          label="Full Name"
          type="text"
          name="fullname"
          value={formData.fullname}
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
          placeholder="••••••••••••••••••••"
          required
        />
        <Button type="success" onClick={handleRegister}>
          Daftar Akun
        </Button>
      </form>

      <p className="mt-10 text-center text-[13px] text-slate-400 font-medium">
        Sudah punya akun? <Link to="/login" className="text-apotek-hijau font-black hover:underline ml-1">Masuk Saja</Link>
      </p>
    </div>
  );
}