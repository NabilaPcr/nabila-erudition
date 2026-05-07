import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

export default function Chatbox() {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState("");

  const chatList = [
    { id: 1, name: "Dr. Tirta", lastMsg: "Obat ini tersedia?", time: "10:30", unread: 2, online: true },
    { id: 2, name: "Ibu Rahma", lastMsg: "Terima kasih infonya", time: "09:15", unread: 0, online: false },
    { id: 3, name: "Apotek Kimia Jaya", lastMsg: "Stok Amoxicillin ready?", time: "Kemarin", unread: 0, online: true },
  ];

  return (
    <div className="animate-fade-in h-[calc(100vh-180px)] flex flex-col">
      <PageHeader title="Chatbox Konsultasi" />

      <div className="flex flex-1 bg-white rounded-[35px] shadow-sm border border-gray-50 overflow-hidden mt-6">
        
        <div className="w-80 border-r border-gray-50 flex flex-col">
          <div className="p-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari pesan..." 
                className="w-full bg-gray-50 py-3 pl-10 pr-4 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apotek-merah/10"
              />
              <img src="https://cdn-icons-png.flaticon.com/512/622/622669.png" className="absolute left-3 top-3 w-4 h-4 opacity-30" alt="" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chatList.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex items-center gap-4 p-4 cursor-pointer transition-all ${activeChat === chat.id ? 'bg-red-50 border-r-4 border-apotek-merah' : 'hover:bg-gray-50'}`}
              >
                <div className="relative">
                  <img src={`https://ui-avatars.com/api/?name=${chat.name}&background=random`} className="w-12 h-12 rounded-2xl" alt="" />
                  {chat.online && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{chat.name}</h4>
                    <span className="text-[10px] text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-apotek-merah text-white text-[10px] flex items-center justify-center rounded-lg font-black">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-slate-50/30">
          <div className="p-6 bg-white border-b border-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={`https://ui-avatars.com/api/?name=Dr+Tirta&background=random`} className="w-10 h-10 rounded-xl" alt="" />
              <div>
                <h4 className="text-sm font-black text-gray-800 italic">Dr. Tirta</h4>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</span>
              </div>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/2311/2311524.png" className="w-5 h-5 opacity-20 cursor-pointer" alt="" />
          </div>

          {/* Isi Pesan */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6">
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 border border-gray-100">
                Halo, apakah stok obat Insulin masih ada untuk pasien saya?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-apotek-merah text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-red-100 text-sm">
                Siang Dokter, sebentar saya cek stok pusat dulu ya.
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-gray-50">
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
              <button className="p-2 hover:bg-white rounded-xl transition-all">
                <img src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png" className="w-5 h-5 opacity-30" alt="attach" />
              </button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan anda..." 
                className="flex-1 bg-transparent border-none outline-none text-sm p-2"
              />
              <button className="bg-apotek-merah p-3 rounded-xl shadow-lg shadow-red-100 hover:scale-105 transition-transform active:scale-95">
                <img src="https://cdn-icons-png.flaticon.com/512/6532/6532019.png" className="w-5 h-5 invert" alt="send" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}