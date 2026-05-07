import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-apotek-latar flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
        <div className="flex justify-center mb-8">
           <div className="w-12 h-12 bg-apotek-merah rounded-2xl shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
           </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}