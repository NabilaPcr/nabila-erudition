import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Truck,
  Building2,
  Calendar,
  DollarSign,
  Box,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('suppliers');

  // Inventory Statistics
  const inventoryStats = [
    { label: 'Total Supplier', value: 15, icon: Building2, color: 'bg-blue-500' },
    { label: 'Pembelian Bulan Ini', value: 23, icon: Truck, color: 'bg-green-500' },
    { label: 'Total Pembelian', value: 'Rp 45M', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Pending Order', value: 5, icon: Clock, color: 'bg-yellow-500' },
  ];

  // Supplier Data
  const suppliers = [
    { 
      id: 1, 
      name: 'PT Pharma Indonesia', 
      contact: 'Budi Santoso',
      email: 'budi@pharma.co.id',
      phone: '081234567890',
      address: 'Jl. Industri No. 123, Jakarta',
      products: 45,
      totalPurchase: 15000000,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'PT NutriLife', 
      contact: 'Siti Rahayu',
      email: 'siti@nutrilife.co.id',
      phone: '081234567891',
      address: 'Jl. Kesehatan No. 45, Bandung',
      products: 32,
      totalPurchase: 8500000,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'PT MedTech', 
      contact: 'Ahmad Wijaya',
      email: 'ahmad@medtech.co.id',
      phone: '081234567892',
      address: 'Jl. Teknologi No. 78, Surabaya',
      products: 28,
      totalPurchase: 12000000,
      status: 'active'
    },
    { 
      id: 4, 
      name: 'PT CleanCare', 
      contact: 'Dewi Lestari',
      email: 'dewi@cleancare.co.id',
      phone: '081234567893',
      address: 'Jl. Kebersihan No. 12, Semarang',
      products: 18,
      totalPurchase: 5500000,
      status: 'inactive'
    },
  ];

  // Purchase History Data
  const purchases = [
    { 
      id: 'PUR-001234', 
      supplier: 'PT Pharma Indonesia',
      supplierId: 1,
      items: [
        { name: 'Paracetamol 500mg', qty: 100, price: 12000 },
        { name: 'Obat Batuk', qty: 50, price: 30000 },
      ],
      total: 2700000,
      status: 'completed',
      purchaseDate: '2024-06-30',
      receivedDate: '2024-07-01',
      notes: 'Pembelian rutin bulanan'
    },
    { 
      id: 'PUR-001235', 
      supplier: 'PT NutriLife',
      supplierId: 2,
      items: [
        { name: 'Vitamin C 1000mg', qty: 50, price: 40000 },
        { name: 'Suplemen Imun', qty: 30, price: 100000 },
      ],
      total: 5000000,
      status: 'pending',
      purchaseDate: '2024-06-30',
      receivedDate: null,
      notes: 'Stok vitamin menipis'
    },
    { 
      id: 'PUR-001236', 
      supplier: 'PT MedTech',
      supplierId: 3,
      items: [
        { name: 'Masker Medis 3ply', qty: 200, price: 20000 },
        { name: 'Hand Sanitizer', qty: 100, price: 15000 },
      ],
      total: 5500000,
      status: 'completed',
      purchaseDate: '2024-06-28',
      receivedDate: '2024-06-29',
      notes: 'Restock alat kesehatan'
    },
    { 
      id: 'PUR-001237', 
      supplier: 'PT Pharma Indonesia',
      supplierId: 1,
      items: [
        { name: 'Antibiotik Amoxicillin', qty: 100, price: 22000 },
      ],
      total: 2200000,
      status: 'processing',
      purchaseDate: '2024-06-27',
      receivedDate: null,
      notes: 'Order khusus'
    },
    { 
      id: 'PUR-001238', 
      supplier: 'PT CleanCare',
      supplierId: 4,
      items: [
        { name: 'Thermometer Digital', qty: 20, price: 65000 },
      ],
      total: 1300000,
      status: 'completed',
      purchaseDate: '2024-06-25',
      receivedDate: '2024-06-26',
      notes: 'Penggantian stok'
    },
  ];

  // Filter data
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === 'all' ||
      selectedFilter === supplier.status;

    return matchesSearch && matchesFilter;
  });

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = 
      purchase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === 'all' ||
      selectedFilter === purchase.status;

    return matchesSearch && matchesFilter;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // View purchase detail
  const viewPurchaseDetail = (purchase) => {
    setSelectedPurchase(purchase);
    setShowDetailModal(true);
  };

  // Delete supplier
  const deleteSupplier = (supplierId) => {
    if (confirm('Apakah Anda yakin ingin menghapus supplier ini?')) {
      alert(`Supplier ${supplierId} dihapus`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Manajemen Inventaris</h1>
            <p className="text-gray-500 text-sm">Kelola supplier dan pembelian stok</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-apotek-hijau text-white rounded-lg font-semibold text-sm hover:bg-apotek-hijau-dark transition-colors"
            >
              <Plus size={16} />
              Buat Pembelian
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {inventoryStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-extrabold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'suppliers' 
                  ? 'text-apotek-hijau border-b-2 border-apotek-hijau bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building2 size={16} className="inline mr-2" />
              Supplier
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'purchases' 
                  ? 'text-apotek-hijau border-b-2 border-apotek-hijau bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Truck size={16} className="inline mr-2" />
              Riwayat Pembelian
            </button>
          </div>

          {/* Suppliers Tab */}
          {activeTab === 'suppliers' && (
            <div className="p-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari nama supplier atau kontak..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau"
                  />
                </div>
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
                  </select>
                </div>
              </div>

              {/* Supplier Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSuppliers.map((supplier) => (
                  <div key={supplier.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-apotek-hijau rounded-lg flex items-center justify-center">
                        <Building2 size={24} className="text-white" />
                      </div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(supplier.status)}`}>
                        {supplier.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{supplier.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{supplier.contact}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package size={14} />
                        <span>{supplier.products} produk</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign size={14} />
                        <span>Rp {supplier.totalPurchase.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-apotek-hijau text-white rounded-lg text-sm font-semibold hover:bg-apotek-hijau-dark transition-colors">
                        <Eye size={14} className="inline mr-1" />
                        Detail
                      </button>
                      <button className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => deleteSupplier(supplier.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-apotek-hijau transition-colors">
                  <Plus size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 font-semibold">Tambah Supplier</p>
                </div>
              </div>

              {filteredSuppliers.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="mx-auto text-gray-300 w-16 h-16 mb-4" />
                  <p className="text-gray-500">Tidak ada supplier ditemukan</p>
                </div>
              )}
            </div>
          )}

          {/* Purchases Tab */}
          {activeTab === 'purchases' && (
            <div className="p-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari ID pembelian atau supplier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau appearance-none cursor-pointer"
                  >
                    <option value="all">Semua Status</option>
                    <option value="completed">Selesai</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Diproses</option>
                  </select>
                </div>
              </div>

              {/* Purchase Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Pembelian</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Supplier</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredPurchases.map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-800">{purchase.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 size={16} className="text-gray-400" />
                            <span className="font-semibold text-gray-800">{purchase.supplier}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Box size={16} className="text-gray-400" />
                            <span className="font-semibold text-gray-800">{purchase.items.length} item</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-800">Rp {purchase.total.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(purchase.status)}`}>
                            {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-gray-600 text-sm">{purchase.purchaseDate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => viewPurchaseDetail(purchase)}
                            className="p-2 bg-apotek-hijau text-white rounded-lg hover:bg-apotek-hijau-dark transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPurchases.length === 0 && (
                <div className="text-center py-12">
                  <Truck className="mx-auto text-gray-300 w-16 h-16 mb-4" />
                  <p className="text-gray-500">Tidak ada pembelian ditemukan</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Purchase Detail Modal */}
      {showDetailModal && selectedPurchase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Detail Pembelian</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Purchase Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">ID Pembelian</p>
                  <p className="font-bold text-gray-800">{selectedPurchase.id}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedPurchase.status)}`}>
                    {selectedPurchase.status.charAt(0).toUpperCase() + selectedPurchase.status.slice(1)}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Supplier</p>
                  <p className="font-bold text-gray-800">{selectedPurchase.supplier}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Tanggal Pembelian</p>
                  <p className="font-bold text-gray-800">{selectedPurchase.purchaseDate}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <Package className="text-apotek-hijau" />
                  Item Pembelian
                </h3>
                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  {selectedPurchase.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.qty} × Rp {item.price.toLocaleString()}</p>
                      </div>
                      <p className="font-bold text-gray-800">Rp {(item.qty * item.price).toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-4 bg-apotek-hijau text-white">
                    <p className="font-bold">Total</p>
                    <p className="font-bold text-xl">Rp {selectedPurchase.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <Package className="text-apotek-hijau" />
                  Catatan
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-700">{selectedPurchase.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Purchase Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Buat Pembelian Baru</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Supplier</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau">
                    {suppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Pembelian</label>
                  <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tambah Item</label>
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-apotek-hijau hover:text-apotek-hijau transition-colors">
                    + Tambah Item
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan</label>
                  <textarea rows="3" placeholder="Tambahkan catatan..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau resize-none" />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 border-2 border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    alert('Pembelian berhasil dibuat!');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 py-3 bg-apotek-hijau text-white rounded-lg font-bold hover:bg-apotek-hijau-dark transition-colors"
                >
                  Simpan Pembelian
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
