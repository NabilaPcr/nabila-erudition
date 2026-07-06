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
  Upload,
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon,
  DollarSign,
  Box,
  Tag
} from 'lucide-react';

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  // Product Statistics
  const productStats = [
    { label: 'Total Produk', value: 1248, icon: Package, color: 'bg-blue-500' },
    { label: 'Stok Menipis', value: 23, icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'Stok Habis', value: 8, icon: Box, color: 'bg-orange-500' },
    { label: 'Kategori', value: 12, icon: Tag, color: 'bg-purple-500' },
  ];

  // Categories
  const categories = [
    { id: 1, name: 'Obat Bebas', count: 450 },
    { id: 2, name: 'Obat Resep', count: 320 },
    { id: 3, name: 'Suplemen', count: 180 },
    { id: 4, name: 'Alat Kesehatan', count: 150 },
    { id: 5, name: 'Perawatan Pribadi', count: 98 },
    { id: 6, name: 'Bayi & Anak', count: 50 },
  ];

  // Product Data
  const products = [
    { 
      id: 1, 
      code: 'OB001',
      name: 'Paracetamol 500mg', 
      category: 'Obat Bebas',
      price: 15000,
      stock: 15,
      minStock: 50,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200',
      description: 'Paracetamol 500mg untuk meredakan demam dan nyeri. Box isi 10 tablet.',
      manufacturer: 'PT Pharma Indonesia',
      expiryDate: '2025-12-31',
      status: 'active'
    },
    { 
      id: 2, 
      code: 'SUP002',
      name: 'Vitamin C 1000mg', 
      category: 'Suplemen',
      price: 45000,
      stock: 8,
      minStock: 30,
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200',
      description: 'Vitamin C 1000mg untuk menjaga daya tahan tubuh. Botol isi 30 kapsul.',
      manufacturer: 'PT NutriLife',
      expiryDate: '2026-06-30',
      status: 'active'
    },
    { 
      id: 3, 
      code: 'ALK003',
      name: 'Masker Medis 3ply', 
      category: 'Alat Kesehatan',
      price: 25000,
      stock: 25,
      minStock: 100,
      image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200',
      description: 'Masker medis 3ply untuk perlindungan maksimal. Box isi 50 pcs.',
      manufacturer: 'PT MedTech',
      expiryDate: '2027-01-01',
      status: 'active'
    },
    { 
      id: 4, 
      code: 'ALK004',
      name: 'Hand Sanitizer', 
      category: 'Alat Kesehatan',
      price: 20000,
      stock: 12,
      minStock: 40,
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=200',
      description: 'Hand sanitizer antiseptik 70% alkohol. Botol 500ml.',
      manufacturer: 'PT CleanCare',
      expiryDate: '2026-12-31',
      status: 'active'
    },
    { 
      id: 5, 
      code: 'OB005',
      name: 'Obat Batuk', 
      category: 'Obat Bebas',
      price: 35000,
      stock: 5,
      minStock: 25,
      image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=200',
      description: 'Sirup obat batuk untuk meredakan batuk kering dan berdahak. Botol 120ml.',
      manufacturer: 'PT Pharma Indonesia',
      expiryDate: '2025-08-15',
      status: 'active'
    },
    { 
      id: 6, 
      code: 'SUP006',
      name: 'Suplemen Imun', 
      category: 'Suplemen',
      price: 120000,
      stock: 45,
      minStock: 20,
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200',
      description: 'Suplemen penambah daya tahan tubuh dengan echinacea. Botol 60 kapsul.',
      manufacturer: 'PT NutriLife',
      expiryDate: '2026-03-31',
      status: 'active'
    },
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get stock status
  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: 'Habis', color: 'bg-red-100 text-red-700' };
    if (stock < minStock) return { label: 'Menipis', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Aman', color: 'bg-green-100 text-green-700' };
  };

  // View product detail
  const viewProductDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  // Delete product
  const deleteProduct = (productId) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      alert(`Produk ${productId} dihapus`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Manajemen Produk</h1>
            <p className="text-gray-500 text-sm">Kelola katalog obat dan produk kesehatan</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-apotek-hijau text-white rounded-lg font-semibold text-sm hover:bg-apotek-hijau-dark transition-colors"
            >
              <Plus size={16} />
              Tambah Produk
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
              <Upload size={16} />
              Import
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
          {productStats.map((stat, i) => (
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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'products' 
                  ? 'text-apotek-hijau border-b-2 border-apotek-hijau bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Package size={16} className="inline mr-2" />
              Produk
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'categories' 
                  ? 'text-apotek-hijau border-b-2 border-apotek-hijau bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Tag size={16} className="inline mr-2" />
              Kategori
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="p-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari nama atau kode produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau appearance-none cursor-pointer"
                  >
                    <option value="all">Semua Kategori</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock, product.minStock);
                  return (
                    <div key={product.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-40 object-cover"
                        />
                        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${stockStatus.color}`}>
                          {stockStatus.label}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{product.code}</p>
                            <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                          </div>
                        </div>
                        <p className="text-gray-500 text-xs mb-3">{product.category}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Box size={14} className="text-gray-400" />
                            <span className="text-sm font-semibold text-gray-800">{product.stock}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign size={14} className="text-apotek-hijau" />
                            <span className="text-sm font-bold text-apotek-hijau">Rp {product.price.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => viewProductDetail(product)}
                            className="flex-1 py-2 bg-apotek-hijau text-white rounded-lg text-sm font-semibold hover:bg-apotek-hijau-dark transition-colors"
                          >
                            <Eye size={14} className="inline mr-1" />
                            Detail
                          </button>
                          <button className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="mx-auto text-gray-300 w-16 h-16 mb-4" />
                  <p className="text-gray-500">Tidak ada produk ditemukan</p>
                </div>
              )}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-apotek-hijau rounded-lg flex items-center justify-center">
                        <Tag size={24} className="text-white" />
                      </div>
                      <span className="text-2xl font-extrabold text-gray-800">{category.count}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">Produk dalam kategori ini</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-apotek-hijau text-white rounded-lg text-sm font-semibold hover:bg-apotek-hijau-dark transition-colors">
                        <Edit size={14} className="inline mr-1" />
                        Edit
                      </button>
                      <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-apotek-hijau transition-colors">
                  <Plus size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 font-semibold">Tambah Kategori</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Detail Produk</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full rounded-xl"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Kode Produk</p>
                    <p className="font-bold text-gray-800">{selectedProduct.code}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Nama Produk</p>
                    <p className="font-bold text-gray-800">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Kategori</p>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-apotek-hijau text-white">
                      <Tag size={12} />
                      {selectedProduct.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Harga</p>
                    <p className="font-bold text-2xl text-apotek-hijau">Rp {selectedProduct.price.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Stok</p>
                      <p className="font-bold text-gray-800">{selectedProduct.stock}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Stok Minimum</p>
                      <p className="font-bold text-gray-800">{selectedProduct.minStock}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Status Stok</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStockStatus(selectedProduct.stock, selectedProduct.minStock).color}`}>
                      {getStockStatus(selectedProduct.stock, selectedProduct.minStock).label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Deskripsi</p>
                  <p className="text-gray-700">{selectedProduct.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Manufacturer</p>
                    <p className="font-semibold text-gray-800">{selectedProduct.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Tanggal Kadaluarsa</p>
                    <p className="font-semibold text-gray-800">{selectedProduct.expiryDate}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-3 bg-apotek-hijau text-white rounded-xl font-bold hover:bg-apotek-hijau-dark transition-colors">
                  <Edit size={20} className="inline mr-2" />
                  Edit Produk
                </button>
                <button 
                  onClick={() => deleteProduct(selectedProduct.id)}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={20} className="inline mr-2" />
                  Hapus Produk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Product Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-gray-800">Tambah Produk</h2>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kode Produk</label>
                    <input type="text" placeholder="OB001" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau">
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Produk</label>
                  <input type="text" placeholder="Nama produk" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Harga</label>
                    <input type="number" placeholder="15000" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stok</label>
                    <input type="number" placeholder="100" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stok Minimum</label>
                    <input type="number" placeholder="20" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                  <textarea rows="3" placeholder="Deskripsi produk" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-apotek-hijau resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gambar Produk</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-apotek-hijau transition-colors cursor-pointer">
                    <ImageIcon className="mx-auto text-gray-400 w-12 h-12 mb-4" />
                    <p className="text-gray-500">Klik atau drag gambar ke sini</p>
                    <p className="text-gray-400 text-sm mt-2">PNG, JPG hingga 5MB</p>
                  </div>
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
                    alert('Produk berhasil ditambahkan!');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 py-3 bg-apotek-hijau text-white rounded-lg font-bold hover:bg-apotek-hijau-dark transition-colors"
                >
                  Simpan Produk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
