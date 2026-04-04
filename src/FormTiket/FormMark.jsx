export default function FormMark() {
  return (
    <div className="bg-[#f0f9db] min-h-screen pb-10 font-sans text-[#1a3c34]">
      <NavbarConcert />

      <div className="flex flex-col items-center mt-4 gap-2 px-4">
        <HeaderConcert />

        {/* Section Info - Dibuat menyamping jika di desktop, tumpuk di HP */}
        <div className="w-full max-w-lg grid grid-cols-1 gap-3 mt-2">
          <TicketCard />
          <div className="grid grid-cols-2 gap-2">
            <PromoBanner />
            <TicketHighlight />
          </div>
        </div>

        <div className="my-2">
          <TicketButton />
        </div>

        {/* Form Section - Tanpa margin berlebih agar rapat */}
        <div className="w-full max-w-lg space-y-2">
          <TicketOrder />
          <UserForm />
        </div>
      </div>
    </div>
  );
}

function HeaderConcert() {
  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-black text-[#2d5a27] tracking-tighter uppercase italic leading-none">
        Mark Lee <span className="text-[#56b34d]">—</span> The Firstfruit
      </h1>
      <p className="text-[#4a7c44] font-bold text-sm mt-1 uppercase tracking-widest">
        "Solo Debut Journey"
      </p>
    </div>
  );
}

export function NavbarConcert() {
  return (
    <nav className="flex justify-between items-center bg-[#1a3c34] p-4 px-6 text-white sticky top-0 z-50">
      <h1 className="text-lg font-black italic tracking-tighter">
        MARKKK <span className="text-[#a4e318]">|</span> FRUIT
      </h1>
      <ul className="flex space-x-4 font-bold text-[10px] uppercase">
        <li><a href="#" className="text-[#a4e318]">Tickets</a></li>
        <li><a href="#" className="hover:text-[#a4e318]">Schedule</a></li>
      </ul>
    </nav>
  );
}

function TicketCard() {
  return (
    <div className="bg-white border-2 border-[#1a3c34] p-4 rounded-2xl shadow-[4px_4px_0px_0px_#2d5a27]">
      <h2 className="text-md font-black uppercase text-[#2d5a27]">🍏 Info Konser</h2>
      <p className="mt-1 text-xs font-medium text-gray-700 leading-tight">
        Rayakan debut solo Mark Lee! Tiket terbatas, segera amankan slotmu.
      </p>
    </div>
  );
}

function TicketButton() {
  return (
    <button className="bg-[#a4e318] text-[#1a3c34] border-2 border-[#1a3c34] px-8 py-2 rounded-full font-black text-sm hover:bg-[#38b6ff] transition-all shadow-lg uppercase">
      Pesan Sekarang
    </button>
  );
}

function PromoBanner() {
  return (
    <div className="bg-[#38b6ff] text-white p-3 rounded-xl border-2 border-[#1a3c34] shadow-[3px_3px_0px_0px_#1a3c34]">
      <h3 className="text-[10px] font-black uppercase italic leading-none">Promo</h3>
      <p className="text-[9px] font-bold">Early Bird Disc 10%!</p>
    </div>
  );
}

function TicketHighlight() {
  return (
    <div className="bg-[#8cc63f] text-[#1a3c34] p-3 rounded-xl border-2 border-[#1a3c34] shadow-[3px_3px_0px_0px_#1a3c34]">
      <h3 className="text-[10px] font-black uppercase italic leading-none">Special</h3>
      <p className="text-[9px] font-bold">Juice Box Edition.</p>
    </div>
  );
}

// --- SUB-KOMPONEN TICKET ORDER (Disatukan agar tidak error) ---
import { useState } from "react";

function TicketOrder() {
  const [jumlah, setJumlah] = useState("");
  const total = jumlah * 750000;

  return (
    <div className="bg-white border-2 border-[#1a3c34] p-4 rounded-2xl shadow-md w-full">
      <h2 className="text-sm font-black text-[#1a3c34] uppercase mb-3 italic">🛒 Pembelian</h2>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-[10px] font-black uppercase block mb-1">Jumlah</label>
          <input
            type="number"
            className="w-full p-2 bg-[#f0f9db] border-2 border-[#1a3c34] rounded-lg text-sm font-bold focus:outline-none"
            placeholder="0"
            onChange={(e) => setJumlah(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] font-black uppercase block mb-1">Total</label>
          <div className="p-2 bg-[#a4e318] border-2 border-[#1a3c34] rounded-lg text-[11px] font-black">
            Rp {total.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-KOMPONEN USER FORM (Disatukan agar tidak error) ---
function UserForm() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const valid = nama && email;

  return (
    <div className="bg-white border-2 border-[#1a3c34] p-4 rounded-2xl shadow-md w-full">
      <h2 className="text-sm font-black text-[#1a3c34] uppercase mb-3 italic">👤 Data Pembeli</h2>
      <div className="space-y-2">
        <input
          className="w-full p-2 text-xs border-b-2 border-[#1a3c34] focus:outline-none bg-[#f0f9db] rounded"
          placeholder="Nama Lengkap..."
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          className="w-full p-2 text-xs border-b-2 border-[#1a3c34] focus:outline-none bg-[#f0f9db] rounded"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button 
        disabled={!valid}
        className={`w-full mt-3 p-2 rounded-xl font-black text-xs uppercase border-2 border-[#1a3c34] transition-all ${
          valid ? 'bg-[#38b6ff] text-white shadow-[3px_3px_0px_0px_#1a3c34]' : 'bg-gray-200 text-gray-400 border-gray-300'
        }`}
      >
        Simpan Data
      </button>
    </div>
  );
}