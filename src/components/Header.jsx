import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-6">
      <div className="relative group">
        <input 
          type="text" 
          placeholder="Cari obat..." 
          className="bg-white py-2.5 pl-12 pr-6 rounded-2xl text-sm w-80 shadow-sm outline-none focus:ring-2 focus:ring-apotek-merah/20 transition-all"
        />
        <img src="https://cdn-icons-png.flaticon.com/512/622/622669.png" className="absolute left-4 top-3 w-4 h-4 opacity-30" />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative p-2.5 bg-white rounded-xl shadow-sm cursor-pointer">
          <img src="https://cdn-icons-png.flaticon.com/512/3602/3602145.png" className="w-5 h-5 opacity-50" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-apotek-merah rounded-full border-2 border-white"></span>
        </div>
        
        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
          <div className="text-right">
            <p className="text-sm font-black text-gray-800 leading-tight">Danielle Campbell</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Admin Apotek</p>
          </div>
          <img src="https://ui-avatars.com/api/?name=Danielle+Campbell&background=ef4444&color=fff" className="w-10 h-10 rounded-2xl shadow-md border-2 border-white" />
        </div>
      </div>
    </header>
  );
}