import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Halo! Saya asisten virtual Apotek Keluarga. Ada yang bisa saya bantu? Anda bisa bertanya tentang obat, harga, stok, atau promo.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (replace with actual Gemini API call)
    setTimeout(() => {
      let botResponse = '';
      
      // Simple keyword-based responses (replace with actual AI)
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes('obat') || lowerInput.includes('medicine')) {
        botResponse = 'Kami memiliki berbagai jenis obat seperti paracetamol, vitamin, obat batuk, dan lainnya. Untuk melihat katalog lengkap, silakan kunjungi halaman Produk.';
      } else if (lowerInput.includes('harga') || lowerInput.includes('price')) {
        botResponse = 'Harga obat bervariasi mulai dari Rp 15.000 untuk paracetamol hingga ratusan ribu untuk alat kesehatan. Member kami mendapatkan diskon khusus!';
      } else if (lowerInput.includes('stok') || lowerInput.includes('stock')) {
        botResponse = 'Stok obat kami diperbarui secara real-time. Obat yang stoknya menipis akan ditandai di katalog. Ada obat tertentu yang Anda cari?';
      } else if (lowerInput.includes('promo') || lowerInput.includes('diskon')) {
        botResponse = 'Kami memiliki promo menarik untuk member! Bronze: 1 poin per Rp 1.000, Silver: 2x poin, Gold: 3x poin + promo eksklusif. Daftar sekarang untuk mulai kumpulkan poin!';
      } else if (lowerInput.includes('dokter') || lowerInput.includes('konsultasi')) {
        botResponse = 'Kami memiliki dokter dan apoteker yang siap membantu konsultasi. Cek bagian Dokter di landing page untuk melihat dokter yang sedang online.';
      } else if (lowerInput.includes('resep') || lowerInput.includes('prescription')) {
        botResponse = 'Anda bisa upload foto resep dokter di halaman kami. Tim apoteker kami akan memproses resep Anda dan menyiapkan obat yang dibutuhkan.';
      } else if (lowerInput.includes('pengiriman') || lowerInput.includes('delivery')) {
        botResponse = 'Kami melayani pengiriman ke seluruh Indonesia. Estimasi pengiriman 1-3 hari kerja tergantung lokasi. Gratis ongkir untuk pembelian di atas Rp 100.000!';
      } else if (lowerInput.includes('halo') || lowerInput.includes('hi') || lowerInput.includes('hai')) {
        botResponse = 'Halo! Selamat datang di Apotek Keluarga. Ada yang bisa saya bantu hari ini?';
      } else {
        botResponse = 'Terima kasih atas pertanyaan Anda. Untuk informasi lebih detail, silakan hubungi customer service kami di support@apotekkeluarga.id atau WhatsApp +62 812-3456-7890.';
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-apotek-hijau hover:bg-apotek-hijau-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50 hover:scale-110"
          title="Chat dengan Asisten Virtual"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-apotek-hijau text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Asisten Virtual</h3>
                <p className="text-xs text-green-100">Online 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <div className="w-8 h-8 bg-apotek-hijau rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-apotek-hijau text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 bg-apotek-hijau rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan Anda..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-apotek-hijau transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-apotek-hijau hover:bg-apotek-hijau-dark text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by AI • Info obat, harga, stok, dan promo
            </p>
          </div>
        </div>
      )}
    </>
  );
}
