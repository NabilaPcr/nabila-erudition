import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import obatData from "../data/obat.json";
import PageHeader from "../components/PageHeader";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Card from "../components/Card";
import TextArea from "../components/TextArea"; 
import Modal from "../components/Modal";
import ProductCard from "../components/ProductCard";

export default function DetailObat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [obat, setObat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeskripsi, setEditedDeskripsi] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rekomendasi, setRekomendasi] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const foundObat = obatData.obat.find((item) => item.id === parseInt(id));
      if (foundObat) {
        setObat(foundObat);
        setEditedDeskripsi(foundObat.deskripsi || "");
        
        const rekom = obatData.obat
          .filter((item) => item.kategori === foundObat.kategori && item.id !== foundObat.id)
          .slice(0, 3);
        setRekomendasi(rekom);
        
        setError(null);
      } else {
        setError("Obat tidak ditemukan");
      }
      setLoading(false);
    }, 300);
  }, [id]);

  const getStatusStok = (stok) => {
    if (stok === 0) return { type: "danger", text: "Habis", bg: "bg-red-100", textColor: "text-red-700" };
    if (stok < 20) return { type: "warning", text: "Menipis", bg: "bg-yellow-100", textColor: "text-yellow-700" };
    return { type: "success", text: "Tersedia", bg: "bg-green-100", textColor: "text-green-700" };
  };

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isExpired = (tanggal) => {
    if (!tanggal) return false;
    return new Date(tanggal) < new Date();
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleConfirmEdit = () => {
    setShowEditModal(false);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDeskripsi(obat.deskripsi || "");
  };

  const handleSaveDeskripsi = () => {
    setObat({ ...obat, deskripsi: editedDeskripsi });
    setIsEditing(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  if (loading) {
    return <Loading text="Memuat detail obat..." />;
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Detail Obat" />
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-6 text-center">
          <div className="text-red-500 text-lg font-bold mb-4">{error}</div>
          <Link to="/obat">
            <Button type="primary">Kembali ke Daftar Obat</Button>
          </Link>
        </div>
      </div>
    );
  }

  const status = getStatusStok(obat.stok);
  const expired = isExpired(obat.kadaluwarsa);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Detail Obat" subtitle={`Obat > ${obat.nama}`} />

      {/* Notifikasi Sukses */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span>Deskripsi berhasil diperbarui!</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Image Section - Card Kiri */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 sticky top-24">
            <img
              src={obat.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"}
              alt={obat.nama}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {obat.kategori}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.bg} ${status.textColor}`}>
                  {status.text}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-800 mb-2">{obat.nama}</h1>
              <p className="text-sm text-gray-400 mb-4">{obat.merk}</p>
              <div className="text-2xl font-bold text-emerald-600 mb-4">
                {formatHarga(obat.harga)}
              </div>
              <button 
                onClick={() => navigate(-1)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>

        {/* Detail Information - Card Kanan */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6 pb-3 border-b border-gray-100">
              Informasi Obat
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Kiri */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Kode Obat
                  </label>
                  <p className="text-base font-bold text-gray-800 mt-1">{obat.kode}</p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Kategori
                  </label>
                  <p className="text-base text-gray-600 mt-1">{obat.kategori}</p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Merk / Brand
                  </label>
                  <p className="text-base text-gray-600 mt-1">{obat.merk}</p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Supplier
                  </label>
                  <p className="text-base text-gray-600 mt-1">{obat.supplier || "-"}</p>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Stok Tersedia
                  </label>
                  <p className="text-base font-bold text-gray-800 mt-1">
                    {obat.stok} <span className="text-gray-400 font-normal text-sm">{obat.satuan}</span>
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Tanggal Kadaluwarsa
                  </label>
                  <p className={`text-base font-semibold mt-1 ${expired ? 'text-red-500' : 'text-gray-700'}`}>
                    {formatTanggal(obat.kadaluwarsa)}
                    {expired && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Expired</span>}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Status Stok
                  </label>
                  <div className="mt-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.bg} ${status.textColor}`}>
                      {status.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Deskripsi dengan TextArea */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Deskripsi Obat
                </label>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="text-xs text-emerald-500 hover:text-emerald-600 font-medium"
                  >
                    ✏️ Edit Deskripsi
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <TextArea
                    value={editedDeskripsi}
                    onChange={(e) => setEditedDeskripsi(e.target.value)}
                    placeholder="Masukkan deskripsi obat..."
                    rows={5}
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSaveDeskripsi}
                      className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {obat.deskripsi || "Tidak ada deskripsi untuk obat ini."}
                </p>
              )}
            </div>
          </div>

          {/* REKOMENDASI PRODUK dengan ProductCard */}
          {rekomendasi.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">💊</span> 
                  Rekomendasi Lainnya
                </h2>
                
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rekomendasi.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200"}
                      alt={item.nama}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{item.nama}</h3>
                    <p className="text-xs text-gray-400 mb-2">{item.merk}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-emerald-600">{formatHarga(item.harga)}</span>
                      <button
                        onClick={() => navigate(`/obat/${item.id}`)}
                        className="text-xs text-emerald-500 hover:text-emerald-600 font-medium"
                      >
                        Detail →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

         
        </div>
      </div>

      {/* MODAL Konfirmasi Edit Deskripsi */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Konfirmasi Edit"
        onConfirm={handleConfirmEdit}
      >
        <div className="space-y-3">
          <p className="text-gray-600">Apakah Anda yakin ingin mengedit deskripsi obat ini?</p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Obat:</span> {obat?.nama}
            </p>
            <p className="text-sm text-gray-500 italic mt-2">
              "{obat?.deskripsi || "Tidak ada deskripsi"}"
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}