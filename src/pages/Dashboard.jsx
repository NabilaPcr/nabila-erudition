import React from 'react';
import PageHeader from '../components/PageHeader';

export default function Dashboard() {
  const salesRep = [
    { name: 'Nicholas Patrick', total: '$ 2,540.58', status: '+Gold', color: 'text-yellow-500' },
    { name: 'Cordell Edwards', total: '$ 1,567.80', status: '+Silver', color: 'text-slate-400' },
    { name: 'Derrick Spencer', total: '$ 1,640.26', status: '+Silver', color: 'text-slate-400' },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Dashboard Overview" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Obat Terjual" value="25.1k" trend="+15%" icon="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" color="hijau" />
        <StatCard title="Total Profit" value="$2,435k" trend="-3.5%" icon="https://cdn-icons-png.flaticon.com/512/2460/2460464.png" color="merah" />
        <StatCard title="Klaim Resep" value="3.5M" trend="+15%" icon="https://cdn-icons-png.flaticon.com/512/2965/2965127.png" color="hijau" />
        <StatCard title="Member Baru" value="43.5k" trend="+10%" icon="https://cdn-icons-png.flaticon.com/512/912/912214.png" color="hijau" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-50">
          <h3 className="font-bold text-gray-800 mb-6 font-poppins">Top Sales Representative</h3>
          <div className="space-y-4">
            {salesRep.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-apotek-latar rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm"></div>
                  <span className="font-bold text-sm">{item.name}</span>
                </div>
                <span className="font-black text-sm">{item.total}</span>
                <span className={`text-xs font-bold ${item.color}`}>{item.status}</span>
                <img src="https://cdn-icons-png.flaticon.com/512/2311/2311524.png" className="w-4 h-4 opacity-20 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-apotek-hijau p-8 rounded-[45px] text-white shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold opacity-70 tracking-widest uppercase">Target Penjualan</p>
            <h2 className="text-6xl font-black mt-2 font-poppins tracking-tighter">82%</h2>
            <p className="text-sm font-medium mt-1">Minggu ini</p>
          </div>
          <div className="mt-10 p-6 bg-white/10 rounded-[30px] border border-white/20 backdrop-blur-sm">
            <p className="text-xs opacity-70 mb-1">Antrian Selesai</p>
            <h4 className="text-2xl font-bold font-barlow italic">1,402 Bills</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-[35px] border border-gray-50 shadow-sm transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color === 'hijau' ? 'bg-green-50' : 'bg-red-50'}`}>
          <img src={icon} className={`w-6 h-6 ${color === 'hijau' ? '' : ''}`} />
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${color === 'hijau' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black text-gray-800 tracking-tight mt-1">{value}</h3>
    </div>
  );
}