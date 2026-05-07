import React from 'react';
import PageHeader from '../components/PageHeader';

export default function Dashboard() {
  const stats = [
    { label: 'TOTAL SALES', value: 'Rp 30M', trend: '+2.25%', color: 'text-green-500', icon: 'https://cdn-icons-png.flaticon.com/512/2854/2854660.png' },
    { label: 'TOTAL CUSTOMERS', value: '1,000', trend: '', color: '', icon: 'https://cdn-icons-png.flaticon.com/512/681/681494.png' },
    { label: 'CLOSED DEALS', value: '150', trend: '-5.56%', color: 'text-red-400', icon: 'https://cdn-icons-png.flaticon.com/512/1067/1067561.png' },
    { label: 'CONVERSION RATE', value: '15%', trend: '+3.00%', color: 'text-green-500', icon: 'https://cdn-icons-png.flaticon.com/512/9322/9322045.png' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Home > Dashboard" />

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card-modern !p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex-center">
              <img src={stat.icon} className="w-6 h-6 opacity-40" alt="" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-800">{stat.value}</span>
                {stat.trend && <span className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-green-500' : 'text-red-400'}`}>{stat.trend}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section: Graph & Segmentation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-modern">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800">Sales History</h3>
            <select className="text-xs bg-slate-50 border-none rounded-lg p-2 outline-none font-bold text-slate-500">
              <option>Last 2 weeks</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[30, 45, 35, 25, 40, 50, 70, 95, 60, 45, 35, 40, 30].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  style={{ height: `${h}%` }} 
                  className={`w-full max-w-[12px] rounded-full transition-all duration-500 ${h > 80 ? 'bg-apotek-hijau' : 'bg-slate-100'}`}
                ></div>
                <span className="text-[10px] text-slate-300 font-bold uppercase">{['Sat','Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-modern">
          <h3 className="font-bold text-slate-800 mb-6">Customer Segmentation</h3>
          <div className="relative flex-center py-4">
             {/* Simulasi Pie Chart dengan CSS */}
             <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 flex-center relative">
                <div className="absolute inset-0 rounded-full border-[12px] border-indigo-500 border-t-transparent border-r-transparent -rotate-45"></div>
                <span className="text-2xl font-black text-slate-800">60%</span>
             </div>
          </div>
          <div className="mt-6 space-y-3">
            <LegendItem color="bg-indigo-500" label="Closed" value="60%" />
            <LegendItem color="bg-slate-300" label="Prospect" value="30%" />
            <LegendItem color="bg-indigo-100" label="Lead" value="10%" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Table */}
      <div className="card-modern !p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Top 5 Products</h3>
          <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Volume</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-slate-400 font-bold">0{item}</td>
                <td className="px-6 py-4 font-bold text-slate-700">Paracetamol 500mg</td>
                <td className="px-6 py-4 text-slate-500">Rp 15.000</td>
                <td className="px-6 py-4 font-bold text-slate-700">120 Box</td>
                <td className="px-6 py-4 text-slate-500">2.4M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LegendItem({ color, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-sm ${color}`}></div>
        <span className="text-xs font-bold text-slate-500">{label}</span>
      </div>
      <span className="text-xs font-black text-slate-700">{value}</span>
    </div>
  );
}