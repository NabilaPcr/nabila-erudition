import React, { useState, useRef, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Avatar from '../components/Avatar';
import Loading from '../components/Loading';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function Chatbox() {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "dr_tirta",
      text: "Halo, apakah stok obat Insulin masih ada untuk pasien saya?",
      time: "10:30"
    },
    {
      id: 2,
      sender: "me",
      text: "Siang Dokter, sebentar saya cek stok pusat dulu ya.",
      time: "10:32"
    }
  ]);

  // ============ IMPLEMENTASI useRef ============
  // untuk referensi container chat (auto-scroll)
  const chatContainerRef = useRef(null);
  
  // untuk referensi input field (auto-focus)
  const inputRef = useRef(null);
  
  // untuk menyimpan nilai pesan tanpa re-render (opsional)
  const messageCountRef = useRef(0);
  // ============================================

  const chatList = [
    { id: 1, name: "Dr. Tirta", lastMsg: "Obat ini tersedia?", time: "10:30", unread: 2, online: true },
    { id: 2, name: "Ibu Rahma", lastMsg: "Terima kasih infonya", time: "09:15", unread: 0, online: false },
    { id: 3, name: "Apotek Kimia Jaya", lastMsg: "Stok Amoxicillin ready?", time: "Kemarin", unread: 0, online: true },
  ];

  // ============ useEffect untuk auto-scroll ============
  // Setiap kali messages berubah, scroll ke bawah otomatis
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Dependency: messages

  // ============ useEffect untuk auto-focus ============
  // Fokus ke input field saat komponen mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Dependency kosong: hanya dijalankan sekali

  // ============ useEffect untuk tracking jumlah pesan ============
  // Menggunakan useRef untuk tracking tanpa re-render
  useEffect(() => {
    messageCountRef.current = messages.length;
    console.log(`Total pesan: ${messageCountRef.current}`); // Bisa dihapus, hanya untuk demo
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Tambahkan pesan baru
    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    setLoading(true);
    
    // Simulasi balasan dari dokter
    setTimeout(() => {
      const replyMessage = {
        id: messages.length + 2,
        sender: "dr_tirta",
        text: "Baik, saya tunggu informasinya. Terima kasih.",
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMessage]);
      setLoading(false);
      
      // Setelah pesan balasan masuk, fokus kembali ke input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1500);
  };

  // Fungsi untuk handle keypress (Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Fungsi untuk mendapatkan avatar berdasarkan sender
  const getSenderInfo = (sender) => {
    if (sender === "me") {
      return { name: "Saya", isMe: true };
    }
    return { name: "Dr. Tirta", isMe: false };
  };

  if (loading) return <Loading text="Mengirim pesan..." />;

  return (
    <div className="animate-fade-in h-[calc(100vh-180px)] flex flex-col">
      <PageHeader title="Chatbox Konsultasi" />

      <div className="flex flex-1 bg-white rounded-[35px] shadow-sm border border-gray-50 overflow-hidden mt-6">
        {/* Sidebar Chat List */}
        <div className="w-80 border-r border-gray-50 flex flex-col">
          <div className="p-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pesan..."
                className="w-full bg-gray-50 py-3 pl-10 pr-4 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apotek-merah/10"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                className="absolute left-3 top-3 w-4 h-4 opacity-30"
                alt="search"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex items-center gap-4 p-4 cursor-pointer transition-all ${
                  activeChat === chat.id ? 'bg-red-50 border-r-4 border-apotek-merah' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <Avatar name={chat.name} size="w-12 h-12" />
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
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

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-50/30">
          <div className="p-6 bg-white border-b border-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Avatar name="Dr. Tirta" size="w-10 h-10" />
              <div>
                <h4 className="text-sm font-black text-gray-800 italic">Dr. Tirta</h4>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</span>
              </div>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2311/2311524.png"
              className="w-5 h-5 opacity-20 cursor-pointer"
              alt="more"
            />
          </div>

          {/* ============ Container Pesan dengan useRef ============ */}
          <div 
            ref={chatContainerRef} // <-- useRef diterapkan di sini
            className="flex-1 p-8 overflow-y-auto space-y-6"
            style={{ maxHeight: 'calc(100vh - 350px)' }}
          >
            {messages.map((msg) => {
              const senderInfo = getSenderInfo(msg.sender);
              const isMe = senderInfo.isMe;
              
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[70%] ${
                    isMe 
                      ? 'bg-apotek-merah text-white rounded-2xl rounded-tr-none shadow-lg shadow-red-100' 
                      : 'bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 border border-gray-100'
                  } p-4 text-sm`}>
                    <p>{msg.text}</p>
                    <span className={`text-[10px] mt-1 block ${
                      isMe ? 'text-red-100' : 'text-gray-400'
                    }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ============ Input Pesan dengan useRef ============ */}
          <div className="p-6 bg-white border-t border-gray-50">
            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl">
              <Button className="p-2 hover:bg-white rounded-xl transition-all">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png"
                  className="w-5 h-5 opacity-30"
                  alt="attach"
                />
              </Button>
              <input
                ref={inputRef} // <-- useRef diterapkan di sini
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tulis pesan anda..."
                className="flex-1 bg-transparent border-none outline-none text-sm p-2"
              />
              <Button
                onClick={sendMessage}
                className="bg-apotek-merah p-3 rounded-xl shadow-lg shadow-red-100 hover:scale-105 transition-transform active:scale-95"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6532/6532019.png"
                  className="w-5 h-5 invert"
                  alt="send"
                />
              </Button>
            </div>
            <div className="mt-2 text-center text-[10px] text-gray-400">
              Tekan Enter untuk mengirim
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}