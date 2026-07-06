import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  Package, 
  DollarSign,
  ShoppingCart,
  Users,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [startDate, setStartDate] = useState('2024-06-01');
  const [endDate, setEndDate] = useState('2024-06-30');

  // Report Statistics
  const reportStats = [
    { label: 'Total Penjualan', value: 'Rp 245.5M', change: 24.5, trend: 'up', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Jumlah Transaksi', value: 1245, change: 18.2, trend: 'up', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Produk Terjual', value: 3450, change: 12.8, trend: 'up', icon: Package, color: 'bg-purple-500' },
    { label: 'Pelanggan Aktif', value: 342, change: 8.5, trend: 'up', icon: Users, color: 'bg-orange-500' },
  ];

  // Top Selling Products
  const topProducts = [
    { name: 'Paracetamol 500mg', sold: 450, revenue: 6750000, change: 15 },
    { name: 'Vitamin C 1000mg', sold: 320, revenue: 14400000, change: 22 },
    { name: 'Masker Medis 3ply', sold: 280, revenue: 7000000, change: -5 },
    { name: 'Hand Sanitizer', sold: 250, revenue: 5000000, change: 18 },
    { name: 'Suplemen Imun', sold: 180, revenue: 21600000, change: 35 },
  ];

  // Sales by Category
  const salesByCategory = [
    { category: 'Obat Bebas', sales: 85000000, percentage: 35 },
    { category: 'Suplemen', sales: 72000000, percentage: 29 },
    { category: 'Alat Kesehatan', sales: 55000000, percentage: 22 },
    { category: 'Perawatan Pribadi', sales: 33500000, percentage: 14 },
  ];

  // Transaction History
  const transactions = [
    { id: 'TRX-001234', date: '2024-06-30', customer: 'Budi Santoso', items: 3, total: 150000 },
    { id: 'TRX-001235', date: '2024-06-30', customer: 'Siti Rahayu', items: 5, total: 275000 },
    { id: 'TRX-001236', date: '2024-06-29', customer: 'Ahmad Wijaya', items: 2, total: 85000 },
    { id: 'TRX-001237', date: '2024-06-29', customer: 'Dewi Lestari', items: 4, total: 320000 },
    { id: 'TRX-001238', date: '2024-06-28', customer: 'Rudi Hartono', items: 1, total: 45000 },
  ];

  // Daily Sales Chart Data
  const dailySales = [
    { day: '1', sales: 8.5 },
    { day: '5', sales: 12.3 },
    { day: '10', sales: 9.8 },
    { day: '15', sales: 15.2 },
    { day: '20', sales: 11.7 },
    { day: '25', sales: 18.5 },
    { day: '30', sales: 14.2 },
  ];

  const maxDailySales = Math.max(...dailySales.map(d => d.sales));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Laporan & Analitik</h1>
            <p className="text-gray-500 text-sm">Analisis penjualan dan performa bisnis</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-apotek-hijau text-white rounded-lg font-semibold text-sm hover:bg-apotek-hijau-dark transition-colors">
            <Download size={16} />
            Export Laporan
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Date Filter */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Periode</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau"
              >
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="quarter">Kuartal Ini</option>
                <option value="year">Tahun Ini</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Mulai</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Akhir</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau"
              />
            </div>
            <button className="px-6 py-3 bg-apotek-hijau text-white rounded-lg font-semibold hover:bg-apotek-hijau-dark transition-colors">
              <Filter size={16} className="inline mr-2" />
              Terapkan Filter
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {reportStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {stat.change}%
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-extrabold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Sales Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="text-apotek-hijau" />
              Grafik Penjualan Harian
            </h2>
            <div className="h-64 flex items-end gap-4">
              {dailySales.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-apotek-hijau rounded-t-lg transition-all hover:bg-apotek-hijau-dark cursor-pointer relative group"
                    style={{ height: `${(data.sales / maxDailySales) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Rp {data.sales}M
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Tgl {data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-apotek-hijau" />
              Penjualan per Kategori
            </h2>
            <div className="space-y-4">
              {salesByCategory.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">{item.category}</span>
                    <span className="text-gray-500 text-sm">Rp {item.sales.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-apotek-hijau rounded-full h-3 transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{item.percentage}% dari total</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Selling Products */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="text-apotek-hijau" />
              5 Produk Terlaris
            </h2>
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-apotek-hijau rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-gray-400 text-xs">{product.sold} terjual</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">Rp {product.revenue.toLocaleString()}</p>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${
                      product.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.change >= 0 ? (
                        <ArrowUpRight size={12} />
                      ) : (
                        <ArrowDownRight size={12} />
                      )}
                      {Math.abs(product.change)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingCart className="text-apotek-hijau" />
              Transaksi Periode Ini
            </h2>
            <div className="space-y-3">
              {transactions.map((trx) => (
                <div key={trx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-apotek-hijau rounded-full flex items-center justify-center text-white font-bold text-sm">
                      <ShoppingCart size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{trx.customer}</p>
                      <p className="text-gray-400 text-xs">{trx.id} • {trx.items} item</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">Rp {trx.total.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">{trx.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
              <BarChart3 className="text-apotek-hijau" />
              Ringkasan Laporan
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Metrik</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Periode Ini</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Periode Lalu</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Perubahan</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">Total Penjualan</td>
                  <td className="px-6 py-4">Rp 245.5M</td>
                  <td className="px-6 py-4">Rp 197.2M</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">+24.5%</td>
                  <td className="px-6 py-4"><ArrowUpRight size={16} className="text-green-600" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">Jumlah Transaksi</td>
                  <td className="px-6 py-4">1,245</td>
                  <td className="px-6 py-4">1,054</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">+18.2%</td>
                  <td className="px-6 py-4"><ArrowUpRight size={16} className="text-green-600" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">Rata-rata Transaksi</td>
                  <td className="px-6 py-4">Rp 197,188</td>
                  <td className="px-6 py-4">Rp 187,289</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">+5.3%</td>
                  <td className="px-6 py-4"><ArrowUpRight size={16} className="text-green-600" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">Pelanggan Baru</td>
                  <td className="px-6 py-4">85</td>
                  <td className="px-6 py-4">72</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">+18.1%</td>
                  <td className="px-6 py-4"><ArrowUpRight size={16} className="text-green-600" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">Produk Terjual</td>
                  <td className="px-6 py-4">3,450</td>
                  <td className="px-6 py-4">3,056</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">+12.8%</td>
                  <td className="px-6 py-4"><ArrowUpRight size={16} className="text-green-600" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
