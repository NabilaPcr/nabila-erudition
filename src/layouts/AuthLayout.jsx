import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16">
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-[#009696] rounded-md"></div>
             <span className="font-bold text-slate-800">Apotek Keluarga</span>
          </div>
          <p className="text-sm text-slate-400">
            Don't have account? <Link to="/register" className="text-slate-800 font-bold hover:underline">Register</Link>
          </p>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 p-4">
        <div className="w-full h-full rounded-[32px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover" 
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
}