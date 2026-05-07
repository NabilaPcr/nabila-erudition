import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-apotek-merah">
      {/* Sidebar tetap di kiri */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col pt-4 overflow-hidden">
        {/* Konten Putih yang Melengkung */}
        <div className="flex-1 bg-apotek-latar rounded-tl-[50px] shadow-2xl overflow-y-auto">
          <Header />
          <div className="p-10">
            <Outlet /> 
          </div>
        </div>
      </div>
    </div>
  );
}