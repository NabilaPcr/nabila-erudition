import { useState } from "react";

export default function TicketOrder(){
  const [jumlah, setJumlah] = useState("");
  const hargaTiket = 750000;
  const total = jumlah * hargaTiket;

  return (
    <div className="flex flex-col items-center p-2">
      <div className="bg-white border-2 border-[#1a3c34] p-6 rounded-3xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-black text-center mb-4 text-[#1a3c34] uppercase tracking-tighter">
          🛒 Pembelian Tiket
        </h2>

        <div className="mb-4">
          <label className="block text-[#1a3c34] font-bold text-xs uppercase mb-1">
            Jumlah Tiket
          </label>
          <input
            type="number"
            placeholder="0"
            className="w-full p-2 bg-[#f0f9db] border-2 border-[#1a3c34] rounded-xl focus:outline-none font-bold"
            onChange={(e)=> setJumlah(e.target.value)}
          />
        </div>

        <div className="mb-4 bg-[#f0f9db] p-2 rounded-lg border border-dashed border-[#1a3c34]">
          <label className="text-xs font-bold text-[#4a7c44]">
            Harga Tiket: <b className="text-[#2d5a27]">Rp 750.000</b>
          </label>
        </div>

        {!jumlah ? (
          <div className="p-3 bg-[#ff9292] border-2 border-[#1a3c34] rounded-xl text-[#1a3c34] text-center">
            <p className="text-xs font-black uppercase italic">
              Input jumlah tiket!
            </p>
          </div>
        ) : (
          <div className="p-3 bg-[#a4e318] border-2 border-[#1a3c34] rounded-xl text-[#1a3c34] text-center">
            <p className="text-xs font-black uppercase">Total Bayar:</p>
            <p className="text-xl font-black">Rp {total.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}