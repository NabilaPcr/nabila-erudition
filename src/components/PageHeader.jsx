import React from 'react';

export default function PageHeader({ title }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-gray-800 font-poppins tracking-tight">{title}</h1>
      <div className="h-1 w-12 bg-apotek-merah mt-2 rounded-full"></div>
    </div>
  );
}