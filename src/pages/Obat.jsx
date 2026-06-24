import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import obatData from "../data/obat.json";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";

// Import Components
import { Button } from "../components/ui/button";
import Badge from "../components/Badge";
import Table from "../components/Table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import Input from "../components/InputField";
import SelectField from "../components/SelectField";

export default function Obat() {
  const [obat, setObat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("semua");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  
  // State untuk form tambah obat
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    kategori: "",
    merk: "",
    harga: "",
    stok: "",
    satuan: "tablet"
  });

  useEffect(() => {
    setTimeout(() => {
      setObat(obatData.obat);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusStok = (stok) => {
    if (stok === 0) return { variant: "destructive", text: "Habis" };
    if (stok < 20) return { variant: "secondary", text: "Menipis" };
    return { variant: "default", text: "Tersedia" };
  };

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  // Filter berdasarkan tab kategori
  const getFilteredByTab = () => {
    if (activeTab === "semua") return obat;
    if (activeTab === "menipis") return obat.filter(item => item.stok > 0 && item.stok < 20);
    if (activeTab === "habis") return obat.filter(item => item.stok === 0);
    return obat.filter(item => item.kategori === activeTab);
  };

  const filteredByTab = getFilteredByTab();

  const filteredObat = filteredByTab.filter((item) => {
    return searchTerm === "" || 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.merk.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit tambah obat
  const handleTambahObat = () => {
    const newObat = {
      id: obat.length + 1,
      ...formData,
      harga: parseInt(formData.harga),
      stok: parseInt(formData.stok)
    };
    setObat([...obat, newObat]);
    setDialogOpen(false);
    setFormData({
      kode: "", nama: "", kategori: "", merk: "", harga: "", stok: "", satuan: "tablet"
    });
    setAlert({ type: "success", message: `Obat ${newObat.nama} berhasil ditambahkan!` });
    setTimeout(() => setAlert(null), 3000);
  };

  // Handle hapus obat
  const handleHapusObat = (id, nama) => {
    setObat(obat.filter(item => item.id !== id));
    setAlert({ type: "warning", message: `Obat ${nama} telah dihapus!` });
    setTimeout(() => setAlert(null), 3000);
  };

  // Kategori untuk Tabs
  const categories = ["semua", "Obat Bebas", "Obat Keras", "Obat Bebas Terbatas", "Suplemen", "Herbal", "Antiseptik", "Alkes"];

  // Options untuk SelectField
  const kategoriOptions = [
    { value: "Obat Bebas", label: "Obat Bebas" },
    { value: "Obat Keras", label: "Obat Keras" },
    { value: "Obat Bebas Terbatas", label: "Obat Bebas Terbatas" },
    { value: "Suplemen", label: "Suplemen" },
    { value: "Herbal", label: "Herbal" },
    { value: "Antiseptik", label: "Antiseptik" },
    { value: "Alkes", label: "Alkes" },
  ];

  const satuanOptions = [
    { value: "tablet", label: "Tablet" },
    { value: "kapsul", label: "Kapsul" },
    { value: "botol", label: "Botol" },
    { value: "strip", label: "Strip" },
    { value: "box", label: "Box" },
  ];

  // Header untuk tabel
  const tableHeaders = ["Kode", "Nama Obat", "Kategori", "Merk", "Harga", "Stok", "Status", "Aksi"];

  if (loading) {
    return <Loading text="Memuat data obat..." />;
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Data Obat" subtitle="Manajemen > Data Obat" />

      {/* Alert Notifikasi */}
      {alert && (
        <div className={`mb-4 p-4 rounded-lg ${
          alert.type === "success" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}>
          {alert.message}
        </div>
      )}

      <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-50 mt-6">
        
        {/* Search Bar dan Tombol Tambah */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Cari obat, kode, atau merk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30"
              alt="search"
            />
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-red-500 hover:bg-red-600">
                + Tambah Obat
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Obat Baru</DialogTitle>
                <DialogDescription>
                  Isi data obat dengan lengkap. Klik simpan ketika sudah selesai.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="kode" className="text-right text-sm font-medium text-gray-700">Kode</label>
                  <Input
                    id="kode"
                    name="kode"
                    value={formData.kode}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="OBT-001"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="nama" className="text-right text-sm font-medium text-gray-700">Nama Obat</label>
                  <Input
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Paracetamol"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="kategori" className="text-right text-sm font-medium text-gray-700">Kategori</label>
                  <SelectField
                    id="kategori"
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleSelectChange}
                    options={kategoriOptions}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="merk" className="text-right text-sm font-medium text-gray-700">Merk</label>
                  <Input
                    id="merk"
                    name="merk"
                    value={formData.merk}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Sanbe"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="harga" className="text-right text-sm font-medium text-gray-700">Harga</label>
                  <Input
                    id="harga"
                    name="harga"
                    type="number"
                    value={formData.harga}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="10000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="stok" className="text-right text-sm font-medium text-gray-700">Stok</label>
                  <Input
                    id="stok"
                    name="stok"
                    type="number"
                    value={formData.stok}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="100"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="satuan" className="text-right text-sm font-medium text-gray-700">Satuan</label>
                  <SelectField
                    id="satuan"
                    name="satuan"
                    value={formData.satuan}
                    onChange={handleSelectChange}
                    options={satuanOptions}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
                <Button variant="default" onClick={handleTambahObat} className="bg-red-500">Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* TABS untuk Filter Kategori */}
        <Tabs defaultValue="semua" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-gray-100 p-2 rounded-xl">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="capitalize data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                {cat === "semua" ? "Semua" : cat === "menipis" ? "⚠️ Stok Menipis" : cat === "habis" ? "❌ Stok Habis" : cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Tabel Obat - menggunakan komponen Table dengan headers */}
            <Table headers={tableHeaders}>
              {filteredObat.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-8">
                    {searchTerm ? "Obat tidak ditemukan" : "Belum ada data obat"}
                  </td>
                </tr>
              ) : (
                filteredObat.map((item) => {
                  const status = getStatusStok(item.stok);
                  return (
                    <tr key={item.id}>
                      <td className="px-4 py-4 font-bold text-gray-800">{item.kode}</td>
                      <td className="px-4 py-4">
                        <Link to={`/obat/${item.id}`} className="text-red-500 hover:underline font-medium">
                          {item.nama}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-gray-500">{item.kategori}</td>
                      <td className="px-4 py-4 text-gray-500">{item.merk}</td>
                      <td className="px-4 py-4 font-bold text-gray-800">{formatHarga(item.harga)}</td>
                      <td className="px-4 py-4 font-bold">
                        {item.stok} <span className="text-gray-400 font-normal text-xs">{item.satuan}</span>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={status.variant}>{status.text}</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Link to={`/obat/${item.id}`} className="text-blue-500 hover:text-blue-700 text-sm">
                            Detail
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="text-red-500 hover:text-red-700 text-sm ml-2">
                                Hapus
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Yakin hapus obat ini?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Obat <span className="font-bold">{item.nama}</span> akan dihapus secara permanen.
                                  Tindakan ini tidak bisa dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleHapusObat(item.id, item.nama)}>
                                  Ya, Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </Table>

            {/* Info jumlah data */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Menampilkan {filteredObat.length} dari {filteredByTab.length} data obat
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}