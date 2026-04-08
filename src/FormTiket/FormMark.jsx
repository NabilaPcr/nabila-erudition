import TicketOrder from "./TicketOrder"; // Asumsi nama file
import UserForm from "./UserForm";     // Asumsi nama file

export default function FormMark() {
  const handleScroll = () => {
    const element = document.getElementById("pembelian-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#f0f9db]  pb-10 font-sans text-[#1a3c34]">
      <NavbarConcert />

      <div className="flex flex-col items-center mt-4 gap-2 px-4">
        <HeaderConcert />

        <div className="w-full max-w-lg grid grid-cols-1 gap-3 mt-2">
          <TicketCard />
          <div className="grid grid-cols-2 gap-2">
            <PromoBanner />
            <TicketHighlight />
          </div>
        </div>

      </div>
    </div>
  );
}

// --- SUB-KOMPONEN INTERNAL ---

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

function TicketButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-[#a4e318] text-[#1a3c34] border-2 border-[#1a3c34] px-8 py-2 rounded-full font-black text-sm hover:bg-[#38b6ff] transition-all shadow-lg uppercase"
    >
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