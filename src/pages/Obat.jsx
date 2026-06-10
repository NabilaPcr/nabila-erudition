import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import obatData from "../data/obat.json";
import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";

// Import Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
                  <Label htmlFor="kode" className="text-right">Kode</Label>
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
                  <Label htmlFor="nama" className="text-right">Nama Obat</Label>
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
                  <Label htmlFor="kategori" className="text-right">Kategori</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, kategori: value }))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Obat Bebas">Obat Bebas</SelectItem>
                      <SelectItem value="Obat Keras">Obat Keras</SelectItem>
                      <SelectItem value="Obat Bebas Terbatas">Obat Bebas Terbatas</SelectItem>
                      <SelectItem value="Suplemen">Suplemen</SelectItem>
                      <SelectItem value="Herbal">Herbal</SelectItem>
                      <SelectItem value="Antiseptik">Antiseptik</SelectItem>
                      <SelectItem value="Alkes">Alkes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="merk" className="text-right">Merk</Label>
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
                  <Label htmlFor="harga" className="text-right">Harga</Label>
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
                  <Label htmlFor="stok" className="text-right">Stok</Label>
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
            {/* Tabel Obat */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead>Nama Obat</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Merk</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredObat.map((item) => {
                    const status = getStatusStok(item.stok);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-bold text-gray-800">{item.kode}</TableCell>
                        <TableCell>
                          <Link to={`/obat/${item.id}`} className="text-red-500 hover:underline font-medium">
                            {item.nama}
                          </Link>
                        </TableCell>
                        <TableCell className="text-gray-500">{item.kategori}</TableCell>
                        <TableCell className="text-gray-500">{item.merk}</TableCell>
                        <TableCell className="font-bold text-gray-800">{formatHarga(item.harga)}</TableCell>
                        <TableCell className="font-bold">
                          {item.stok} <span className="text-gray-400 font-normal text-xs">{item.satuan}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant}>{status.text}</Badge>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

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