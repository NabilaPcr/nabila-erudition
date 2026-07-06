import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  MoreVertical,
  Download,
  Calendar,
  DollarSign,
  Package,
  User,
  Trash2
} from 'lucide-react';

export default function TransactionManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Transaction Statistics
  const transactionStats = [
    { label: 'Total Transaksi', value: 1245, icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Hari Ini', value: 156, icon: Calendar, color: 'bg-green-500' },
    { label: 'Total Penjualan', value: 'Rp 245M', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Pending', value: 23, icon: Clock, color: 'bg-yellow-500' },
  ];

  // Transaction Data
  const transactions = [
    { 
      id: 'TRX-001234', 
      customer: 'Budi Santoso',
      customerId: 1,
      items: [
        { name: 'Paracetamol 500mg', qty: 2, price: 15000 },
        { name: 'Vitamin C 1000mg', qty: 1, price: 45000 },
        { name: 'Masker Medis 3ply', qty: 1, price: 25000 },
      ],
      total: 100000,
      status: 'completed',
      paymentMethod: 'QRIS',
      paymentStatus: 'paid',
      approver: 'Admin',
      createdAt: '2024-06-30 10:30',
      type: 'online'
    },
    { 
      id: 'TRX-001235', 
      customer: 'Siti Rahayu',
      customerId: 2,
      items: [
        { name: 'Hand Sanitizer', qty: 2, price: 20000 },
        { name: 'Thermometer Digital', qty: 1, price: 75000 },
        { name: 'Obat Batuk', qty: 1, price: 35000 },
        { name: 'Suplemen Imun', qty: 1, price: 120000 },
      ],
      total: 275000,
      status: 'pending',
      paymentMethod: 'Transfer',
      paymentStatus: 'pending',
      approver: null,
      createdAt: '2024-06-30 10:15',
      type: 'online'
    },
    { 
      id: 'TRX-001236', 
      customer: 'Ahmad Wijaya',
      customerId: 3,
      items: [
        { name: 'Paracetamol 500mg', qty: 1, price: 15000 },
        { name: 'Vitamin C 1000mg', qty: 1, price: 45000 },
        { name: 'Masker Medis 3ply', qty: 1, price: 25000 },
      ],
      total: 85000,
      status: 'completed',
      paymentMethod: 'Cash',
      paymentStatus: 'paid',
      approver: 'Kasir',
      createdAt: '2024-06-30 09:45',
      type: 'cashier'
    },
    { 
      id: 'TRX-001237', 
      customer: 'Dewi Lestari',
      customerId: 4,
      items: [
        { name: 'Tensimeter Digital', qty: 1, price: 250000 },
        { name: 'Suplemen Imun', qty: 2, price: 120000 },
        { name: 'Vitamin C 1000mg', qty: 1, price: 45000 },
      ],
      total: 535000,
      status: 'processing',
      paymentMethod: 'QRIS',
      paymentStatus: 'paid',
      approver: null,
      createdAt: '2024-06-30 09:30',
      type: 'online'
    },
    { 
      id: 'TRX-001238', 
      customer: 'Rudi Hartono',
      customerId: 5,
      items: [
        { name: 'Hand Sanitizer', qty: 1, price: 20000 },
        { name: 'Masker Medis 3ply', qty: 1, price: 25000 },
      ],
      total: 45000,
      status: 'completed',
      paymentMethod: 'Cash',
      paymentStatus: 'paid',
      approver: 'Kasir',
      createdAt: '2024-06-30 09:15',
      type: 'cashier'
    },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter(trx => {
    const matchesSearch = 
      trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === 'all' ||
      selectedFilter === trx.status ||
      (selectedFilter === 'online' && trx.type === 'online') ||
      (selectedFilter === 'cashier' && trx.type === 'cashier');

    return matchesSearch && matchesFilter;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'processing': return <Package size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return null;
    }
  };

  // View transaction detail
  const viewTransactionDetail = (trx) => {
    setSelectedTransaction(trx);
    setShowDetailModal(true);
  };

  // Update transaction status
  const updateTransactionStatus = (trxId, newStatus) => {
    alert(`Update status ${trxId} ke ${newStatus}`);
    // In real app, this would call an API
  };

  // Delete transaction
  const deleteTransaction = (trxId) => {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      alert(`Transaksi ${trxId} dihapus`);
      // In real app, this would call an API
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Manajemen Transaksi</h1>
            <p className="text-gray-500 text-sm">Kelola semua transaksi penjualan</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-apotek-hijau text-white rounded-lg font-semibold text-sm hover:bg-apotek-hijau-dark transition-colors"
            >
              <Plus size={16} />
              Buat Transaksi Manual
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
          {transactionStats.map((stat, i) => (
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

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari ID transaksi atau nama pelanggan..."
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
                  <option value="completed">Selesai</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Diproses</option>
                  <option value="rejected">Ditolak</option>
                  <option value="online">Online</option>
                  <option value="cashier">Kasir</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Transaksi</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pembayaran</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipe</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Waktu</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{trx.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-apotek-hijau rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {trx.customer.charAt(0)}
                        </div>
                        <p className="font-semibold text-gray-800">{trx.customer}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-gray-400" />
                        <span className="font-semibold text-gray-800">{trx.items.length} item</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">Rp {trx.total.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(trx.status)}`}>
                        {getStatusIcon(trx.status)}
                        {trx.status.charAt(0).toUpperCase() + trx.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{trx.paymentMethod}</p>
                        <span className={`text-xs font-semibold ${
                          trx.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {trx.paymentStatus.charAt(0).toUpperCase() + trx.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        trx.type === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {trx.type === 'online' ? 'Online' : 'Kasir'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm">{trx.createdAt}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewTransactionDetail(trx)}
                          className="p-2 bg-apotek-hijau text-white rounded-lg hover:bg-apotek-hijau-dark transition-colors"
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(trx.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto text-gray-300 w-16 h-16 mb-4" />
              <p className="text-gray-500">Tidak ada transaksi ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Detail Transaksi</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Transaction Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">ID Transaksi</p>
                  <p className="font-bold text-gray-800">{selectedTransaction.id}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedTransaction.status)}`}>
                    {getStatusIcon(selectedTransaction.status)}
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Pelanggan</p>
                  <p className="font-bold text-gray-800">{selectedTransaction.customer}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Waktu</p>
                  <p className="font-bold text-gray-800">{selectedTransaction.createdAt}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <Package className="text-apotek-hijau" />
                  Item Pembelian
                </h3>
                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  {selectedTransaction.items.map((item, i) => (
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
                    <p className="font-bold text-xl">Rp {selectedTransaction.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <DollarSign className="text-apotek-hijau" />
                  Informasi Pembayaran
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-500 text-sm mb-1">Metode Pembayaran</p>
                    <p className="font-bold text-gray-800">{selectedTransaction.paymentMethod}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-500 text-sm mb-1">Status Pembayaran</p>
                    <span className={`font-bold ${
                      selectedTransaction.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {selectedTransaction.paymentStatus.charAt(0).toUpperCase() + selectedTransaction.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedTransaction.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => updateTransactionStatus(selectedTransaction.id, 'completed')}
                    className="flex-1 py-3 bg-apotek-hijau text-white rounded-xl font-bold hover:bg-apotek-hijau-dark transition-colors"
                  >
                    <CheckCircle size={20} className="inline mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => updateTransactionStatus(selectedTransaction.id, 'rejected')}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    <XCircle size={20} className="inline mr-2" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Transaction Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Buat Transaksi Manual</h2>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pelanggan</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau">
                    <option>Pilih Pelanggan</option>
                    <option>Budi Santoso</option>
                    <option>Siti Rahayu</option>
                    <option>Ahmad Wijaya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Metode Pembayaran</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau">
                    <option>Cash</option>
                    <option>QRIS</option>
                    <option>Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tambah Item</label>
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-apotek-hijau hover:text-apotek-hijau transition-colors">
                    + Tambah Item
                  </button>
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
                    alert('Transaksi dibuat!');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 py-3 bg-apotek-hijau text-white rounded-lg font-bold hover:bg-apotek-hijau-dark transition-colors"
                >
                  Simpan Transaksi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
