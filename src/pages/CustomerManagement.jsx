import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  ShoppingCart,
  Star,
  Crown,
  Shield,
  TrendingUp,
  ChevronDown,
  Download,
  UserPlus
} from 'lucide-react';

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Customer Statistics
  const customerStats = [
    { label: 'Total Pelanggan', value: 3420, icon: Users, color: 'bg-blue-500' },
    { label: 'Member Aktif', value: 2850, icon: Shield, color: 'bg-green-500' },
    { label: 'VIP Member', value: 156, icon: Crown, color: 'bg-yellow-500' },
    { label: 'Regular', value: 414, icon: UserPlus, color: 'bg-gray-500' },
  ];

  // Customer Data
  const customers = [
    { 
      id: 1, 
      name: 'Budi Santoso', 
      email: 'budi@email.com', 
      phone: '081234567890', 
      ktp: '3201123456780001',
      gender: 'Laki-laki',
      joinDate: '2024-01-15',
      totalSpent: 2500000,
      transactionCount: 15,
      tier: 'Silver',
      segment: 'Sering Belanja',
      status: 'active',
      lastPurchase: '2024-06-28'
    },
    { 
      id: 2, 
      name: 'Siti Rahayu', 
      email: 'siti@email.com', 
      phone: '081234567891', 
      ktp: '3201123456780002',
      gender: 'Perempuan',
      joinDate: '2024-02-20',
      totalSpent: 5200000,
      transactionCount: 32,
      tier: 'Gold',
      segment: 'Sangat Sering',
      status: 'active',
      lastPurchase: '2024-06-30'
    },
    { 
      id: 3, 
      name: 'Ahmad Wijaya', 
      email: 'ahmad@email.com', 
      phone: '081234567892', 
      ktp: '3201123456780003',
      gender: 'Laki-laki',
      joinDate: '2024-03-10',
      totalSpent: 450000,
      transactionCount: 3,
      tier: 'Bronze',
      segment: 'Jarang Belanja',
      status: 'active',
      lastPurchase: '2024-06-15'
    },
    { 
      id: 4, 
      name: 'Dewi Lestari', 
      email: 'dewi@email.com', 
      phone: '081234567893', 
      ktp: '3201123456780004',
      gender: 'Perempuan',
      joinDate: '2024-04-05',
      totalSpent: 8900000,
      transactionCount: 45,
      tier: 'Platinum',
      segment: 'Sangat Sering',
      status: 'active',
      lastPurchase: '2024-06-30'
    },
    { 
      id: 5, 
      name: 'Rudi Hartono', 
      email: 'rudi@email.com', 
      phone: '081234567894', 
      ktp: '3201123456780005',
      gender: 'Laki-laki',
      joinDate: '2024-05-12',
      totalSpent: 1200000,
      transactionCount: 8,
      tier: 'Bronze',
      segment: 'Jarang Belanja',
      status: 'inactive',
      lastPurchase: '2024-05-20'
    },
  ];

  // Filter customers based on search and filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.ktp.includes(searchTerm);
    
    const matchesFilter = 
      selectedFilter === 'all' ||
      (selectedFilter === 'active' && customer.status === 'active') ||
      (selectedFilter === 'inactive' && customer.status === 'inactive') ||
      (selectedFilter === 'vip' && customer.tier === 'Platinum') ||
      (selectedFilter === 'member' && ['Silver', 'Gold', 'Platinum'].includes(customer.tier));

    return matchesSearch && matchesFilter;
  });

  // Get tier badge color
  const getTierColor = (tier) => {
    switch(tier) {
      case 'Platinum': return 'bg-purple-500';
      case 'Gold': return 'bg-yellow-500';
      case 'Silver': return 'bg-gray-400';
      default: return 'bg-amber-600';
    }
  };

  // Get segment color
  const getSegmentColor = (segment) => {
    switch(segment) {
      case 'Sangat Sering': return 'bg-green-500';
      case 'Sering Belanja': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  // View customer detail
  const viewCustomerDetail = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  // Refresh all customer statuses
  const refreshAllStatuses = () => {
    alert('Memperbarui status semua pelanggan...');
    // In real app, this would call an API to recalculate tiers and segments
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Manajemen Pelanggan</h1>
            <p className="text-gray-500 text-sm">Kelola data pelanggan dan segmentasi</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshAllStatuses}
              className="flex items-center gap-2 px-4 py-2 bg-apotek-hijau text-white rounded-lg font-semibold text-sm hover:bg-apotek-hijau-dark transition-colors"
            >
              <RefreshCw size={16} />
              Refresh Status Massal
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
              <Download size={16} />
              Export Data
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {customerStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-extrabold text-gray-800">{stat.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama, email, no HP, atau KTP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau appearance-none cursor-pointer"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                  <option value="vip">VIP Member</option>
                  <option value="member">Member</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kontak</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tier</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Segment</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Belanja</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaksi</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-apotek-hijau rounded-full flex items-center justify-center text-white font-bold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{customer.name}</p>
                          <p className="text-gray-400 text-xs">{customer.ktp}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${getTierColor(customer.tier)}`}>
                        <Crown size={12} />
                        {customer.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${getSegmentColor(customer.segment)}`}>
                        <TrendingUp size={12} />
                        {customer.segment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">Rp {customer.totalSpent.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ShoppingCart size={16} className="text-gray-400" />
                        <span className="font-semibold text-gray-800">{customer.transactionCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {customer.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => viewCustomerDetail(customer)}
                        className="flex items-center gap-2 px-3 py-2 bg-apotek-hijau text-white rounded-lg text-sm font-semibold hover:bg-apotek-hijau-dark transition-colors"
                      >
                        <Eye size={16} />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto text-gray-300 w-16 h-16 mb-4" />
              <p className="text-gray-500">Tidak ada pelanggan ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Detail Pelanggan</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Profile Section */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 bg-apotek-hijau rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">{selectedCustomer.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      {selectedCustomer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      {selectedCustomer.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {selectedCustomer.gender}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      Bergabung: {selectedCustomer.joinDate}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white ${getTierColor(selectedCustomer.tier)}`}>
                    <Crown size={16} />
                    {selectedCustomer.tier}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white ${getSegmentColor(selectedCustomer.segment)}`}>
                    <TrendingUp size={16} />
                    {selectedCustomer.segment}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Total Belanja</p>
                  <p className="text-2xl font-extrabold text-gray-800">Rp {selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Jumlah Transaksi</p>
                  <p className="text-2xl font-extrabold text-gray-800">{selectedCustomer.transactionCount}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Rata-rata</p>
                  <p className="text-2xl font-extrabold text-gray-800">Rp {(selectedCustomer.totalSpent / selectedCustomer.transactionCount).toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm mb-1">Terakhir Belanja</p>
                  <p className="text-2xl font-extrabold text-gray-800">{selectedCustomer.lastPurchase}</p>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingCart className="text-apotek-hijau" />
                  10 Transaksi Terakhir
                </h3>
                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <ShoppingCart size={20} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">TRX-00{1234 + i}</p>
                          <p className="text-gray-400 text-xs">2024-06-{30 - i}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">Rp {(Math.random() * 500000 + 50000).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                        <span className="text-green-600 text-xs font-semibold">Selesai</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
