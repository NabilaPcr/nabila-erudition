import React, { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function CRMDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Dashboard Statistics
  const stats = [
    { 
      label: 'Total Obat', 
      value: 1248, 
      change: 12, 
      trend: 'up',
      icon: Package,
      color: 'bg-blue-500'
    },
    { 
      label: 'Stok Menipis', 
      value: 23, 
      change: -5, 
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    { 
      label: 'Penjualan Hari Ini', 
      value: 'Rp 8.5M', 
      change: 18, 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    { 
      label: 'Penjualan Bulan Ini', 
      value: 'Rp 245M', 
      change: 24, 
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    { 
      label: 'Transaksi Hari Ini', 
      value: 156, 
      change: 8, 
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-orange-500'
    },
    { 
      label: 'Total Pelanggan', 
      value: 3420, 
      change: 15, 
      trend: 'up',
      icon: Users,
      color: 'bg-cyan-500'
    },
  ];

  // Sales Chart Data (simulated)
  const salesData = [
    { day: 'Sen', sales: 12.5 },
    { day: 'Sel', sales: 15.2 },
    { day: 'Rab', sales: 18.7 },
    { day: 'Kam', sales: 14.3 },
    { day: 'Jum', sales: 22.1 },
    { day: 'Sab', sales: 28.5 },
    { day: 'Min', sales: 19.8 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  // Low Stock Alerts
  const lowStockItems = [
    { id: 1, name: 'Paracetamol 500mg', stock: 15, minStock: 50, category: 'Obat Bebas' },
    { id: 2, name: 'Vitamin C 1000mg', stock: 8, minStock: 30, category: 'Suplemen' },
    { id: 3, name: 'Masker Medis 3ply', stock: 25, minStock: 100, category: 'Alat Kesehatan' },
    { id: 4, name: 'Hand Sanitizer', stock: 12, minStock: 40, category: 'Alat Kesehatan' },
    { id: 5, name: 'Obat Batuk', stock: 5, minStock: 25, category: 'Obat Bebas' },
  ];

  // Recent Transactions
  const recentTransactions = [
    { 
      id: 'TRX-001234', 
      customer: 'Budi Santoso', 
      items: 3, 
      total: 150000, 
      status: 'completed',
      time: '10:30'
    },
    { 
      id: 'TRX-001235', 
      customer: 'Siti Rahayu', 
      items: 5, 
      total: 275000, 
      status: 'pending',
      time: '10:15'
    },
    { 
      id: 'TRX-001236', 
      customer: 'Ahmad Wijaya', 
      items: 2, 
      total: 85000, 
      status: 'completed',
      time: '09:45'
    },
    { 
      id: 'TRX-001237', 
      customer: 'Dewi Lestari', 
      items: 4, 
      total: 320000, 
      status: 'processing',
      time: '09:30'
    },
    { 
      id: 'TRX-001238', 
      customer: 'Rudi Hartono', 
      items: 1, 
      total: 45000, 
      status: 'completed',
      time: '09:15'
    },
  ];

  // Notifications
  const notifications = [
    { id: 1, type: 'order', message: 'Pesanan baru dari Siti Rahayu', time: '10:15', unread: true },
    { id: 2, type: 'prescription', message: 'Resep baru dari Dr. Budi', time: '09:50', unread: true },
    { id: 3, type: 'stock', message: 'Stok Paracetamol menipis', time: '09:00', unread: true },
    { id: 4, type: 'order', message: 'Pesanan TRX-001236 selesai', time: '09:45', unread: false },
    { id: 5, type: 'system', message: 'Backup database selesai', time: '08:00', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Dashboard CRM</h1>
            <p className="text-gray-500 text-sm">Monitoring operasional apotek real-time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="text-gray-500 w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-apotek-hijau rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Admin</p>
                <p className="text-gray-400 text-xs">Apotek Keluarga</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, i) => (
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
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
              <p className="text-2xl font-extrabold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts and Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
                <BarChart3 className="text-apotek-hijau" />
                Grafik Penjualan
              </h2>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-apotek-hijau"
              >
                <option value="7d">7 Hari Terakhir</option>
                <option value="30d">30 Hari Terakhir</option>
                <option value="90d">90 Hari Terakhir</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end gap-4">
              {salesData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-apotek-hijau rounded-t-lg transition-all hover:bg-apotek-hijau-dark cursor-pointer relative group"
                    style={{ height: `${(data.sales / maxSales) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Rp {data.sales}M
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" />
              Alert Stok Menipis
            </h2>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600 text-sm">{item.stock} / {item.minStock}</p>
                    <p className="text-gray-400 text-xs">Stok / Min</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm transition-colors">
              Lihat Semua Alert
            </button>
          </div>
        </div>

        {/* Recent Transactions and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingCart className="text-apotek-hijau" />
              Transaksi Terbaru
            </h2>
            <div className="space-y-3">
              {recentTransactions.map((trx) => (
                <div key={trx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-apotek-hijau transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      trx.status === 'completed' ? 'bg-green-100' :
                      trx.status === 'pending' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {trx.status === 'completed' ? (
                        <CheckCircle size={18} className="text-green-600" />
                      ) : trx.status === 'pending' ? (
                        <Clock size={18} className="text-yellow-600" />
                      ) : (
                        <Package size={18} className="text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{trx.customer}</p>
                      <p className="text-gray-400 text-xs">{trx.id} • {trx.items} item</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-sm">Rp {trx.total.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">{trx.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border-2 border-apotek-hijau text-apotek-hijau rounded-lg font-semibold text-sm hover:bg-apotek-hijau hover:text-white transition-colors">
              Lihat Semua Transaksi
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="text-apotek-hijau" />
              Notifikasi
            </h2>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    notif.unread ? 'bg-apotek-hijau/10 border-apotek-hijau' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.type === 'order' ? 'bg-blue-100' :
                    notif.type === 'prescription' ? 'bg-purple-100' :
                    notif.type === 'stock' ? 'bg-red-100' :
                    'bg-gray-200'
                  }`}>
                    {notif.type === 'order' ? (
                      <ShoppingCart size={16} className="text-blue-600" />
                    ) : notif.type === 'prescription' ? (
                      <Package size={16} className="text-purple-600" />
                    ) : notif.type === 'stock' ? (
                      <AlertTriangle size={16} className="text-red-600" />
                    ) : (
                      <Bell size={16} className="text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${notif.unread ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notif.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{notif.time}</p>
                  </div>
                  {notif.unread && (
                    <div className="w-2 h-2 bg-apotek-hijau rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
              Lihat Semua Notifikasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
