import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import Button from './Button';
import Modal from './Modal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-10 py-6 relative">
      <div className="relative group">
        <input
          type="text"
          placeholder="Cari obat..."
          className="bg-white py-2.5 pl-12 pr-6 rounded-2xl text-sm w-80 shadow-sm outline-none focus:ring-2 focus:ring-apotek-merah/20 transition-all"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          className="absolute left-4 top-3 w-4 h-4 opacity-30"
          alt="search"
        />
      </div>
      <div className="flex items-center gap-6">
        {/* Notifikasi */}
        <div className="relative p-2.5 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-gray-50">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3602/3602145.png"
            className="w-5 h-5 opacity-50"
            alt="notif"
          />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-apotek-merah rounded-full border-2 border-white"></span>
        </div>
        <div className="relative">
          <div
            className="flex items-center gap-3 border pl-6 border-gray-200 cursor-pointer group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="text-right group-hover:opacity-70 transition-opacity">
              <p className="text-sm font-black text-gray-800 leading-tight">Nabila Azzahra</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Admin Apotek</p>
            </div>
            <Avatar name="Nabila Azzahra" size="w-10 h-10" />
          </div>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-50 py-2 z-20 animate-fade-in">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-apotek-merah transition-colors"
                  onClick={() => {
                    alert("Melihat Profil...");
                    setIsOpen(false);
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                    className="w-4 h-4 opacity-50"
                    alt=""
                  />
                  View Profil
                </button>
                <hr className="my-1 border-gray-50" />
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-apotek-merah hover:bg-red-50 transition-colors"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828445.png"
                    className="w-4 h-4 opacity-70"
                    alt=""
                  />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal Logout */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Konfirmasi Logout"
        onConfirm={handleLogout}
      >
        <p>Apakah Anda yakin ingin keluar dari aplikasi?</p>
        <p className="text-sm text-gray-500 mt-2">Anda perlu login kembali untuk mengakses dashboard.</p>
      </Modal>
    </header>
  );
}