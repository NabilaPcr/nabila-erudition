import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Tag,
  FileText,
  User as UserIcon,
  Star,
  Calendar,
  Percent,
  ToggleLeft,
  ToggleRight,
  Image as ImageIcon
} from 'lucide-react';

export default function MarketingManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('promos');

  // Marketing Statistics
  const marketingStats = [
    { label: 'Total Promo', value: 8, icon: Tag, color: 'bg-blue-500' },
    { label: 'Promo Aktif', value: 5, icon: ToggleRight, color: 'bg-green-500' },
    { label: 'Artikel', value: 24, icon: FileText, color: 'bg-purple-500' },
    { label: 'Dokter', value: 12, icon: UserIcon, color: 'bg-orange-500' },
  ];

  // Promo Data
  const promos = [
    { 
      id: 1, 
      code: 'DISKON10', 
      name: 'Diskon 10% Semua Produk',
      type: 'percentage',
      value: 10,
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      targetMember: 'all',
      usageLimit: 1000,
      usageCount: 450,
      status: 'active'
    },
    { 
      id: 2, 
      code: 'HEMAT50', 
      name: 'Diskon Rp 50.000',
      type: 'nominal',
      value: 50000,
      startDate: '2024-06-15',
      endDate: '2024-07-15',
      targetMember: 'member',
      usageLimit: 500,
      usageCount: 320,
      status: 'active'
    },
    { 
      id: 3, 
      code: 'VIP20', 
      name: 'Diskon 20% VIP Member',
      type: 'percentage',
      value: 20,
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      targetMember: 'vip',
      usageLimit: null,
      usageCount: 85,
      status: 'active'
    },
    { 
      id: 4, 
      code: 'WELCOME', 
      name: 'Diskon Selamat Datang',
      type: 'percentage',
      value: 15,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      targetMember: 'regular',
      usageLimit: 1,
      usageCount: 2340,
      status: 'active'
    },
    { 
      id: 5, 
      code: 'FLASHSALE', 
      name: 'Flash Sale 50%',
      type: 'percentage',
      value: 50,
      startDate: '2024-06-25',
      endDate: '2024-06-27',
      targetMember: 'all',
      usageLimit: 200,
      usageCount: 200,
      status: 'inactive'
    },
  ];

  // Article Data
  const articles = [
    { 
      id: 1, 
      title: '5 Tips Menjaga Daya Tahan Tubuh',
      category: 'Kesehatan Umum',
      author: 'Dr. Sari Wulandari',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
      excerpt: 'Pelajari cara sederhana untuk meningkatkan sistem kekebalan tubuh Anda dengan perubahan gaya hidup yang sehat.',
      publishedDate: '2024-06-28',
      status: 'published',
      views: 1250
    },
    { 
      id: 2, 
      title: 'Panduan Lengkap Vitamin untuk Anak',
      category: 'Kesehatan Anak',
      author: 'Dr. Rina Kusuma',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400',
      excerpt: 'Vitamin apa yang dibutuhkan anak untuk tumbuh sehat? Simak panduan lengkapnya di sini.',
      publishedDate: '2024-06-25',
      status: 'published',
      views: 890
    },
    { 
      id: 3, 
      title: 'Manfaat Suplemen Omega-3',
      category: 'Suplemen',
      author: 'Dr. Budi Santoso',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      excerpt: 'Omega-3 memiliki banyak manfaat untuk kesehatan jantung dan otak. Ketahui lebih lanjut di artikel ini.',
      publishedDate: '2024-06-20',
      status: 'published',
      views: 2340
    },
  ];

  // Doctor Data
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Sari Wulandari',
      specialization: 'Apoteker',
      email: 'sari@apotekkeluarga.id',
      phone: '081234567890',
      avatar: 'https://i.pravatar.cc/150?img=47',
      status: 'online',
      consultationCount: 450,
      rating: 4.8
    },
    { 
      id: 2, 
      name: 'Dr. Budi Santoso',
      specialization: 'Dokter Umum',
      email: 'budi@apotekkeluarga.id',
      phone: '081234567891',
      avatar: 'https://i.pravatar.cc/150?img=12',
      status: 'online',
      consultationCount: 620,
      rating: 4.9
    },
    { 
      id: 3, 
      name: 'Dr. Rina Kusuma',
      specialization: 'Dokter Anak',
      email: 'rina@apotekkeluarga.id',
      phone: '081234567892',
      avatar: 'https://i.pravatar.cc/150?img=32',
      status: 'offline',
      consultationCount: 380,
      rating: 4.7
    },
  ];

  // Testimonial Data
  const testimonials = [
    { 
      id: 1, 
      customer: 'Budi Santoso',
      role: 'Member Silver',
      avatar: 'https://i.pravatar.cc/80?img=12',
      text: 'Pelayanan sangat baik, obat selalu tersedia dan pengiriman cepat. Sangat recommended!',
      rating: 5,
      date: '2024-06-28',
      status: 'visible'
    },
    { 
      id: 2, 
      customer: 'Siti Rahayu',
      role: 'Member Gold',
      avatar: 'https://i.pravatar.cc/80?img=47',
      text: 'Program loyalty sangat menguntungkan. Sudah beberapa kali klaim reward dengan mudah.',
      rating: 5,
      date: '2024-06-25',
      status: 'visible'
    },
    { 
      id: 3, 
      customer: 'Ahmad Wijaya',
      role: 'Member Bronze',
      avatar: 'https://i.pravatar.cc/80?img=32',
      text: 'Chatbot sangat membantu saat saya butuh info obat di tengah malam. Terima kasih!',
      rating: 4,
      date: '2024-06-20',
      status: 'hidden'
    },
  ];

  // Filter data based on active tab
  const getFilteredData = () => {
    switch(activeTab) {
      case 'promos':
        return promos.filter(promo => {
          const matchesSearch = 
            promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            promo.code.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = 
            selectedFilter === 'all' ||
            selectedFilter === promo.status;
          return matchesSearch && matchesFilter;
        });
      case 'articles':
        return articles.filter(article => {
          const matchesSearch = 
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = 
            selectedFilter === 'all' ||
            selectedFilter === article.status;
          return matchesSearch && matchesFilter;
        });
      case 'doctors':
        return doctors.filter(doctor => {
          const matchesSearch = 
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = 
            selectedFilter === 'all' ||
            selectedFilter === doctor.status;
          return matchesSearch && matchesFilter;
        });
      case 'testimonials':
        return testimonials.filter(testimonial => {
          const matchesSearch = 
            testimonial.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            testimonial.text.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = 
            selectedFilter === 'all' ||
            selectedFilter === testimonial.status;
          return matchesSearch && matchesFilter;
        });
      default:
        return [];
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
      case 'published':
      case 'online':
      case 'visible':
        return 'bg-green-100 text-green-700';
      case 'inactive':
      case 'offline':
      case 'hidden':
        return 'bg-red-100 text-red-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Toggle promo status
  const togglePromoStatus = (promoId) => {
    alert(`Toggle status promo ${promoId}`);
  };

  // Delete item
  const deleteItem = (itemId) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      alert(`Item ${itemId} dihapus`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Manajemen Pemasaran</h1>
            <p className="text-gray-500 text-sm">Kelola promo, artikel, dokter, dan testimoni</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-apotek-hijau text-white rounded-lg font-semibold text-sm hover:bg-apotek-hijau-dark transition-colors"
            >
              <Plus size={16} />
              Tambah {activeTab === 'promos' ? 'Promo' : activeTab === 'articles' ? 'Artikel' : activeTab === 'doctors' ? 'Dokter' : 'Testimoni'}
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
          {marketingStats.map((stat, i) => (
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
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('promos')}
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'promos' 
                  ? 'text-apotek-hijau border-b-2 border-apotek-hijau bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Tag size={16} className="inline mr-2" />
              Promo
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'articles' 
                  ? 'text-apotek-hijau border-b-2 border-apotek-hijau bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText size={16} className="inline mr-2" />
              Artikel
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'doctors' 
                  ? 'text-apotek-hijau border-b-2 border-apotek-hijau bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <UserIcon size={16} className="inline mr-2" />
              Dokter
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-sm transition-colors ${
                activeTab === 'testimonials' 
                  ? 'text-apotek-hijau border-b-2 border-apotek-hijau bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Star size={16} className="inline mr-2" />
              Testimoni
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Cari ${activeTab === 'promos' ? 'nama atau kode promo' : activeTab === 'articles' ? 'judul atau penulis' : activeTab === 'doctors' ? 'nama atau spesialisasi' : 'pelanggan'}...`}
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
                  {activeTab === 'promos' && (
                    <>
                      <option value="active">Aktif</option>
                      <option value="inactive">Tidak Aktif</option>
                    </>
                  )}
                  {activeTab === 'articles' && (
                    <>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </>
                  )}
                  {activeTab === 'doctors' && (
                    <>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </>
                  )}
                  {activeTab === 'testimonials' && (
                    <>
                      <option value="visible">Visible</option>
                      <option value="hidden">Hidden</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Promos Tab */}
            {activeTab === 'promos' && (
              <div className="space-y-4">
                {getFilteredData().map((promo) => (
                  <div key={promo.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-apotek-hijau rounded-lg flex items-center justify-center">
                            <Percent size={24} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{promo.name}</h3>
                            <p className="text-gray-400 text-sm">{promo.code}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-gray-500 text-xs">Tipe</p>
                            <p className="font-semibold text-gray-800 text-sm">{promo.type === 'percentage' ? `${promo.value}%` : `Rp ${promo.value.toLocaleString()}`}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Target</p>
                            <p className="font-semibold text-gray-800 text-sm">{promo.targetMember === 'all' ? 'Semua' : promo.targetMember}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Periode</p>
                            <p className="font-semibold text-gray-800 text-sm">{promo.startDate} - {promo.endDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Penggunaan</p>
                            <p className="font-semibold text-gray-800 text-sm">{promo.usageCount} / {promo.usageLimit || '∞'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(promo.status)}`}>
                          {promo.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                        <button
                          onClick={() => togglePromoStatus(promo.id)}
                          className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                          title="Toggle Status"
                        >
                          {promo.status === 'active' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Articles Tab */}
            {activeTab === 'articles' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilteredData().map((article) => (
                  <div key={article.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-apotek-hijau text-white mb-2">
                        {article.category}
                      </span>
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span>{article.author}</span>
                        <span>{article.publishedDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(article.status)}`}>
                          {article.status}
                        </span>
                        <div className="flex gap-2">
                          <button className="p-2 bg-apotek-hijau text-white rounded-lg hover:bg-apotek-hijau-dark transition-colors">
                            <Eye size={14} />
                          </button>
                          <button className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => deleteItem(article.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Doctors Tab */}
            {activeTab === 'doctors' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilteredData().map((doctor) => (
                  <div key={doctor.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
                        <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${doctor.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                        <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText size={14} />
                        <span>{doctor.consultationCount} konsultasi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(doctor.status)}`}>
                          {doctor.status === 'online' ? 'Online' : 'Offline'}
                        </span>
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
                        onClick={() => deleteItem(doctor.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                {getFilteredData().map((testimonial) => (
                  <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <img src={testimonial.avatar} alt={testimonial.customer} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800">{testimonial.customer}</h3>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(testimonial.status)}`}>
                              {testimonial.status === 'visible' ? 'Tampil' : 'Sembunyi'}
                            </span>
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">"{testimonial.text}"</p>
                        <p className="text-gray-400 text-xs">{testimonial.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-apotek-hijau text-white rounded-lg hover:bg-apotek-hijau-dark transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => deleteItem(testimonial.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {getFilteredData().length === 0 && (
              <div className="text-center py-12">
                <Megaphone className="mx-auto text-gray-300 w-16 h-16 mb-4" />
                <p className="text-gray-500">Tidak ada data ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
