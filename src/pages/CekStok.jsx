import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Alert from '../components/Alert';

export default function CekStok() {
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const dataStok = [
    { id: 1, nama: "Paracetamol 500mg", kategori: "Obat Bebas", stok: 120, status: "Tersedia" },
    { id: 2, nama: "Amoxicillin 250mg", kategori: "Obat Keras", stok: 15, status: "Menipis" },
    { id: 3, nama: "Dexa-M", kategori: "Obat Keras", stok: 0, status: "Kosong" },
    { id: 4, nama: "Vitamin C 1000mg", kategori: "Suplemen", stok: 250, status: "Tersedia" },
  ];

  const headers = ["Obat", "Kategori", "Jumlah", "Status", "Aksi"];

  const getStatusBadge = (status) => {
    switch(status) {
      case "Tersedia": return "success";
      case "Menipis": return "warning";
      case "Kosong": return "danger";
      default: return "secondary";
    }
  };

  const handleTambahStok = () => {
    setAlert({ type: "success", message: "Stok berhasil ditambahkan!" });
    setShowModal(false);
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Cek Stok Pusat" />

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-50 mt-6">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-gray-700">Daftar Inventaris</h3>
          <Button type="danger" onClick={() => setShowModal(true)}>
            + Tambah Stok
          </Button>
        </div>

        <Table headers={headers}>
          {dataStok.map((item) => (
            <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
              <td className="py-5 px-4 font-bold text-gray-800">{item.nama}</td>
              <td className="py-5 text-gray-500">{item.kategori}</td>
              <td className="py-5 font-black">
                {item.stok} <span className="text-gray-400 font-normal italic">Pcs</span>
              </td>
              <td className="py-5">
                <Badge type={getStatusBadge(item.status)}>{item.status}</Badge>
               </td>
              <td className="py-5">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="text-apotek-merah hover:underline text-sm font-medium"
                >
                  Detail
                </button>
               </td>
             </tr>
          ))}
        </Table>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Tambah Stok Baru"
        onConfirm={handleTambahStok}
      >
        <p>Apakah Anda yakin ingin menambahkan stok baru?</p>
        <p className="text-sm text-gray-500 mt-2">Isi form yang telah disediakan untuk menambah stok obat.</p>
      </Modal>

      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="Detail Obat"
        onConfirm={() => setSelectedItem(null)}
      >
        <div className="space-y-2">
          <p><span className="font-bold">Nama:</span> {selectedItem?.nama}</p>
          <p><span className="font-bold">Kategori:</span> {selectedItem?.kategori}</p>
          <p><span className="font-bold">Stok:</span> {selectedItem?.stok} Pcs</p>
          <p><span className="font-bold">Status:</span> {selectedItem?.status}</p>
        </div>
      </Modal>
    </div>
  );
}