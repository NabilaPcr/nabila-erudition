import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Upload,
  Download,
  Calendar,
  User,
  Trash2,
  Pill,
  Plus
} from 'lucide-react';

export default function PrescriptionManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Prescription Statistics
  const prescriptionStats = [
    { label: 'Total Resep', value: 234, icon: FileText, color: 'bg-blue-500' },
    { label: 'Pending', value: 45, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Diproses', value: 28, icon: Pill, color: 'bg-purple-500' },
    { label: 'Selesai', value: 161, icon: CheckCircle, color: 'bg-green-500' },
  ];

  // Prescription Data
  const prescriptions = [
    { 
      id: 'RSP-001234', 
      customer: 'Budi Santoso',
      customerId: 1,
      doctor: 'Dr. Sari Wulandari',
      doctorId: 1,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200',
      notes: 'Paracetamol 500mg - 3x sehari setelah makan\nVitamin C 1000mg - 1x sehari\nObat batuk - 3x sehari',
      status: 'pending',
      createdAt: '2024-06-30 10:30',
      updatedAt: null,
      recommendedItems: [
        { name: 'Paracetamol 500mg', qty: 10, price: 15000 },
        { name: 'Vitamin C 1000mg', qty: 10, price: 45000 },
        { name: 'Obat Batuk', qty: 2, price: 35000 },
      ]
    },
    { 
      id: 'RSP-001235', 
      customer: 'Siti Rahayu',
      customerId: 2,
      doctor: 'Dr. Budi Santoso',
      doctorId: 2,
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200',
      notes: 'Antibiotik - 2x sehari\nVitamin D - 1x sehari',
      status: 'processing',
      createdAt: '2024-06-30 09:15',
      updatedAt: '2024-06-30 10:00',
      recommendedItems: [
        { name: 'Antibiotik Amoxicillin', qty: 14, price: 25000 },
        { name: 'Vitamin D3', qty: 30, price: 55000 },
      ]
    },
    { 
      id: 'RSP-001236', 
      customer: 'Ahmad Wijaya',
      customerId: 3,
      doctor: 'Dr. Rina Kusuma',
      doctorId: 3,
      image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200',
      notes: 'Obat tekanan darah - 1x sehari pagi\nSuplemen jantung - 2x sehari',
      status: 'completed',
      createdAt: '2024-06-29 15:30',
      updatedAt: '2024-06-29 16:45',
      recommendedItems: [
        { name: 'Amlodipine 10mg', qty: 30, price: 35000 },
        { name: 'Suplemen Omega 3', qty: 60, price: 85000 },
      ]
    },
    { 
      id: 'RSP-001237', 
      customer: 'Dewi Lestari',
      customerId: 4,
      doctor: 'Dr. Sari Wulandari',
      doctorId: 1,
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=200',
      notes: 'Obat diabetes - 2x sehari\nInsulin - sesuai resep',
      status: 'rejected',
      createdAt: '2024-06-29 11:00',
      updatedAt: '2024-06-29 12:30',
      recommendedItems: []
    },
    { 
      id: 'RSP-001238', 
      customer: 'Rudi Hartono',
      customerId: 5,
      doctor: 'Dr. Budi Santoso',
      doctorId: 2,
      image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=200',
      notes: 'Obat flu - 3x sehari\nVitamin C - 2x sehari',
      status: 'pending',
      createdAt: '2024-06-30 08:45',
      updatedAt: null,
      recommendedItems: [
        { name: 'Obat Flu', qty: 3, price: 30000 },
        { name: 'Vitamin C 1000mg', qty: 10, price: 45000 },
      ]
    },
  ];

  // Filter prescriptions
  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = 
      rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === 'all' ||
      selectedFilter === rx.status;

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
      case 'processing': return <Pill size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return null;
    }
  };

  // View prescription detail
  const viewPrescriptionDetail = (rx) => {
    setSelectedPrescription(rx);
    setShowDetailModal(true);
  };

  // Update prescription status
  const updatePrescriptionStatus = (rxId, newStatus) => {
    alert(`Update status ${rxId} ke ${newStatus}`);
    // In real app, this would call an API
  };

  // Delete prescription
  const deletePrescription = (rxId) => {
    if (confirm('Apakah Anda yakin ingin menghapus resep ini?')) {
      alert(`Resep ${rxId} dihapus`);
      // In real app, this would call an API
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Manajemen Resep</h1>
            <p className="text-gray-500 text-sm">Kelola upload resep dari pelanggan</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-apotek-hijau text-white rounded-lg font-semibold text-sm hover:bg-apotek-hijau-dark transition-colors"
            >
              <Upload size={16} />
              Upload Resep
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
          {prescriptionStats.map((stat, i) => (
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
                placeholder="Cari ID resep, nama pelanggan, atau dokter..."
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
                  <option value="pending">Pending</option>
                  <option value="processing">Diproses</option>
                  <option value="completed">Selesai</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Prescription Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Resep</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pelanggan</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dokter</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Upload</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Update Terakhir</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrescriptions.map((rx) => (
                  <tr key={rx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{rx.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-apotek-hijau rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {rx.customer.charAt(0)}
                        </div>
                        <p className="font-semibold text-gray-800">{rx.customer}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <span className="font-semibold text-gray-800">{rx.doctor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(rx.status)}`}>
                        {getStatusIcon(rx.status)}
                        {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-600 text-sm">{rx.createdAt}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-sm">{rx.updatedAt || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewPrescriptionDetail(rx)}
                          className="p-2 bg-apotek-hijau text-white rounded-lg hover:bg-apotek-hijau-dark transition-colors"
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deletePrescription(rx.id)}
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
          
          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-300 w-16 h-16 mb-4" />
              <p className="text-gray-500">Tidak ada resep ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Prescription Detail Modal */}
      {showDetailModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Detail Resep</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Prescription Image */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="text-apotek-hijau" />
                  Foto Resep
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <img 
                    src={selectedPrescription.image} 
                    alt="Resep" 
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Prescription Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">ID Resep</p>
                  <p className="font-bold text-gray-800">{selectedPrescription.id}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedPrescription.status)}`}>
                    {getStatusIcon(selectedPrescription.status)}
                    {selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1)}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Pelanggan</p>
                  <p className="font-bold text-gray-800">{selectedPrescription.customer}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm mb-1">Dokter</p>
                  <p className="font-bold text-gray-800">{selectedPrescription.doctor}</p>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                  <Pill className="text-apotek-hijau" />
                  Catatan Resep
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <pre className="text-gray-700 whitespace-pre-wrap font-sans">{selectedPrescription.notes}</pre>
                </div>
              </div>

              {/* Recommended Items */}
              {selectedPrescription.recommendedItems.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="text-apotek-hijau" />
                    Rekomendasi Obat
                  </h3>
                  <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                    {selectedPrescription.recommendedItems.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-gray-400 text-sm">Qty: {item.qty} × Rp {item.price.toLocaleString()}</p>
                        </div>
                        <p className="font-bold text-gray-800">Rp {(item.qty * item.price).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedPrescription.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => updatePrescriptionStatus(selectedPrescription.id, 'processing')}
                    className="flex-1 py-3 bg-apotek-hijau text-white rounded-xl font-bold hover:bg-apotek-hijau-dark transition-colors"
                  >
                    <Pill size={20} className="inline mr-2" />
                    Proses Resep
                  </button>
                  <button
                    onClick={() => updatePrescriptionStatus(selectedPrescription.id, 'rejected')}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    <XCircle size={20} className="inline mr-2" />
                    Tolak Resep
                  </button>
                </div>
              )}

              {selectedPrescription.status === 'processing' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => updatePrescriptionStatus(selectedPrescription.id, 'completed')}
                    className="flex-1 py-3 bg-apotek-hijau text-white rounded-xl font-bold hover:bg-apotek-hijau-dark transition-colors"
                  >
                    <CheckCircle size={20} className="inline mr-2" />
                    Selesaikan Resep
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Prescription Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Upload Resep</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dokter</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau">
                    <option>Pilih Dokter</option>
                    <option>Dr. Sari Wulandari</option>
                    <option>Dr. Budi Santoso</option>
                    <option>Dr. Rina Kusuma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Foto Resep</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-apotek-hijau transition-colors cursor-pointer">
                    <Upload className="mx-auto text-gray-400 w-12 h-12 mb-4" />
                    <p className="text-gray-500">Klik atau drag file ke sini</p>
                    <p className="text-gray-400 text-sm mt-2">PNG, JPG hingga 10MB</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan (Opsional)</label>
                  <textarea 
                    rows="4"
                    placeholder="Tambahkan catatan untuk resep ini..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau resize-none"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 border-2 border-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    alert('Resep berhasil diupload!');
                    setShowUploadModal(false);
                  }}
                  className="flex-1 py-3 bg-apotek-hijau text-white rounded-lg font-bold hover:bg-apotek-hijau-dark transition-colors"
                >
                  Upload Resep
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
