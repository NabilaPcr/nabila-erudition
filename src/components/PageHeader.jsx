import React from 'react';

export default function PageHeader({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-3xl font-black text-slate-800 tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm font-bold text-slate-300 mt-1">{subtitle}</p>}
    </div>
  );
}