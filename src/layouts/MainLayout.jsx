import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-brand-red overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col pt-4 overflow-hidden">
        {/* Konten Utama */}
        <div className="flex-1 bg-brand-white rounded-tl-[50px] shadow-2xl overflow-y-auto">
          <Header />
          <main className="p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}