import { useState } from "react";
import InputComp from "./components/InputComp";

export default function UserForm() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [tanggal, setTanggal] = useState("");

  const valid = nama && email && tanggal;

  return (
    <div className="flex flex-col items-center p-2">
      <div className="bg-white border-2 border-[#1a3c34] p-6 rounded-3xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-black text-center mb-4 text-[#1a3c34] uppercase tracking-tighter italic">
          👤 Data Pembeli
        </h2>

        <div className="space-y-3">
            {/* Pastikan InputComp kamu menggunakan Tailwind untuk styling inputnya */}
            <InputComp
            label="Nama"
            type="text"
            placeholder="Ketik Nama..."
            value={nama}
            onChange={(e)=>setNama(e.target.value)}
            />

            <InputComp
            label="Email"
            type="email"
            placeholder="Ketik Email..."
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <InputComp
            label="Tanggal Lahir"
            type="date"
            value={tanggal}
            onChange={(e)=>setTanggal(e.target.value)}
            />
        </div>

        {valid ? (
          <button className="w-full bg-[#38b6ff] text-white border-2 border-[#1a3c34] p-3 rounded-2xl mt-4 font-black uppercase hover:bg-[#1a3c34] transition-all shadow-[4px_4px_0px_0px_#1a3c34]">
            Simpan Data
          </button>
        ) : (
          <p className="text-red-500 text-[10px] font-bold mt-3 text-center uppercase tracking-widest">
            Semua data harus diisi!
          </p>
        )}

      </div>
      
      <p className="mt-6 text-[10px] font-black text-[#2d5a27] opacity-50 uppercase italic">
        The Firstfruit Juice Pack © 2024
      </p>
    </div>
  );
}