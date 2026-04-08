import { useState } from "react";
import InputComp from "./components/InputComp";

export default function UserForm() {
  const [formData, setFormData] = useState({
    nama: "", email: "", telepon: "", kategori: "", metode: ""
  });
  const [errors, setErrors] = useState({});
  const [hasil, setHasil] = useState(null);

  const validate = (name, value) => {
    let msg = "";
    if (name === "nama") {
      if (!value) msg = "Nama wajib diisi";
      else if (value.length < 3) msg = "Minimal 3 karakter";
      else if (/\d/.test(value)) msg = "Nama tidak boleh angka";
    }
    if (name === "email") {
      if (!value) msg = "Email wajib diisi";
      else if (!value.includes("@")) msg = "Harus ada simbol @";
      else if (!value.endsWith(".com")) msg = "Harus domain .com";
    }
    if (name === "telepon") {
      if (!value) msg = "Nomor wajib diisi";
      else if (isNaN(value)) msg = "Harus berupa angka";
      else if (value.length < 10) msg = "Minimal 10 digit";
    }
    return msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isFormValid = 
    formData.nama && formData.email && formData.telepon && 
    formData.kategori && formData.metode &&
    !errors.nama && !errors.email && !errors.telepon;

  const handlePayment = () => {
    alert("Berhasil!");
    setHasil(formData);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto space-y-4">
      <div className="bg-white border-2 border-[#1a3c34] p-5 rounded-3xl shadow-md w-full">
        <h2 className="text-sm font-black uppercase mb-4 italic text-[#1a3c34]">
          👤 Data Pembeli
        </h2>

        <div className="space-y-1">
          <InputComp label="Nama Lengkap" name="nama" type="text" placeholder="Ketik nama..." value={formData.nama} onChange={handleChange} error={errors.nama} />
          <InputComp label="Email" name="email" type="email" placeholder="Ketik email..." value={formData.email} onChange={handleChange} error={errors.email} />
          <InputComp label="Nomor Telepon" name="telepon" type="text" placeholder="08..." value={formData.telepon} onChange={handleChange} error={errors.telepon} />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="block text-[9px] font-black uppercase mb-1">Kategori</label>
            <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full p-2 border-2 border-[#1a3c34] rounded-xl bg-[#f0f9db] font-bold text-[11px] focus:outline-none">
              <option value="">-- Pilih --</option>
              <option value="VIP">VIP</option>
              <option value="Festival">Festival</option>
            </select>
          </div>
          <div>
            <label className="block text-[9px] font-black uppercase mb-1">Pembayaran</label>
            <select name="metode" value={formData.metode} onChange={handleChange} className="w-full p-2 border-2 border-[#1a3c34] rounded-xl bg-[#f0f9db] font-bold text-[11px] focus:outline-none">
              <option value="">-- Pilih --</option>
              <option value="QRIS">QRIS</option>
              <option value="Transfer">Transfer</option>
            </select>
          </div>
        </div>

        {/* CONDITIONAL RENDERING TOMBOL */}
        {isFormValid ? (
          <button onClick={handlePayment} className="w-full mt-5 bg-[#38b6ff] text-white p-3 rounded-2xl font-black uppercase border-2 border-[#1a3c34] shadow-[3px_3px_0px_0px_#1a3c34] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all">
            Bayar Sekarang
          </button>
        ) : (
          <div className="mt-5 p-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl text-center 
                                    text-[9px] font-bold text-gray-400 uppercase">
            Lengkapi data untuk membuka pembayaran
          </div>
        )}
      </div>

      {/* HASIL INPUTAN (Conditional Rendering) */}
      {hasil && (
        <div className="bg-[#a4e318] border-2 border-[#1a3c34] p-4 rounded-2xl shadow-lg w-full transform transition-all animate-in fade-in zoom-in duration-300">
          <h3 className="font-black uppercase text-[10px] mb-2 italic">✅ Tiket Terkonfirmasi:</h3>
          <div className="text-[11px] font-bold grid grid-cols-2 gap-1">
            <p>Nama: <span className="font-normal">{hasil.nama}</span></p>
            <p>Email: <span className="font-normal">{hasil.email}</span></p>
            <p>Kategori: <span className="font-normal">{hasil.kategori}</span></p>
            <p>Metode: <span className="font-normal">{hasil.metode}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}