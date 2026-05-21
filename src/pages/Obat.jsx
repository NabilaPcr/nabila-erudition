// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import obatData from "../data/obat.json";
// import PageHeader from "../components/PageHeader";
// import Button from "../components/Button";
// import Badge from "../components/Badge";
// import Loading from "../components/Loading";
// import Alert from "../components/Alert";
// import Table from "../components/Table";

// export default function Obat() {
//   const [obat, setObat] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterKategori, setFilterKategori] = useState("");
//   const [alert, setAlert] = useState(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setObat(obatData.obat);
//       setLoading(false);
//     }, 500);
//   }, []);

//   const getStatusStok = (stok) => {
//     if (stok === 0) return { type: "danger", text: "Habis" };
//     if (stok < 20) return { type: "warning", text: "Menipis" };
//     return { type: "success", text: "Tersedia" };
//   };

//   const formatHarga = (harga) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(harga);
//   };

//   const headers = ["Kode", "Nama Obat", "Kategori", "Merk", "Harga", "Stok", "Status", "Aksi"];

//   const filteredObat = obat.filter((item) => {
//     const matchSearch = searchTerm === "" || 
//                         item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         item.merk.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchKategori = filterKategori === "" || item.kategori === filterKategori;
//     return matchSearch && matchKategori;
//   });

//   const uniqueKategori = [...new Set(obat.map((item) => item.kategori))];

//   if (loading) {
//     return <Loading text="Memuat data obat..." />;
//   }

//   return (
//     <div className="animate-fade-in">
//       <PageHeader title="Data Obat" subtitle="Manajemen > Data Obat" />

//       {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

//       <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-50 mt-6">
//         {/* Filter dan Search */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div className="flex flex-col md:flex-row gap-4 flex-1">
//             <div className="relative flex-1 max-w-md">
//               <input
//                 type="text"
//                 placeholder="Cari obat, kode, atau merk..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full bg-gray-50 py-3 pl-10 pr-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-apotek-merah/20"
//               />
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
//                 className="absolute left-3 top-3 w-4 h-4 opacity-30"
//                 alt="search"
//               />
//             </div>
//             <select
//               value={filterKategori}
//               onChange={(e) => setFilterKategori(e.target.value)}
//               className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-apotek-merah/20"
//             >
//               <option value="">Semua Kategori</option>
//               {uniqueKategori.map((kategori) => (
//                 <option key={kategori} value={kategori}>
//                   {kategori}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <Button type="danger" onClick={() => setAlert({ type: "info", message: "Fitur tambah obat sedang dalam pengembangan" })}>
//             + Tambah Obat
//           </Button>
//         </div>

//         {/* Tabel Obat - LANGSUNG gunakan komponen Table, tanpa <table> tambahan */}
//         <Table headers={headers}>
//           {filteredObat.map((item) => {
//             const status = getStatusStok(item.stok);
//             return (
//               <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
//                 <td className="py-5 pl-4 font-bold text-gray-800">{item.kode}</td>
//                 <td className="py-5 font-bold text-gray-800">
//                   <Link to={`/obat/${item.id}`} className="text-apotek-merah hover:underline">
//                     {item.nama}
//                   </Link>
//                 </td>
//                 <td className="py-5 text-gray-500">{item.kategori}</td>
//                 <td className="py-5 text-gray-500">{item.merk}</td>
//                 <td className="py-5 font-black text-gray-800">{formatHarga(item.harga)}</td>
//                 <td className="py-5 font-black">
//                   {item.stok} <span className="text-gray-400 font-normal text-xs">{item.satuan}</span>
//                 </td>
//                 <td className="py-5">
//                   <Badge type={status.type}>{status.text}</Badge>
//                 </td>
//                 <td className="py-5">
//                   <Link to={`/obat/${item.id}`} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
//                     Detail
//                   </Link>
//                 </td>
//               </tr>
//             );
//           })}
//         </Table>

//         {/* Info jumlah data */}
//         <div className="mt-6 text-center text-sm text-gray-500">
//           Menampilkan {filteredObat.length} dari {obat.length} data obat
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import obatData from "../data/obat.json";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Table from "../components/Table";
import SelectField from "../components/SelectField"; // Import SelectField

export default function Obat() {
  const [obat, setObat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setObat(obatData.obat);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusStok = (stok) => {
    if (stok === 0) return { type: "danger", text: "Habis" };
    if (stok < 20) return { type: "warning", text: "Menipis" };
    return { type: "success", text: "Tersedia" };
  };

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  const headers = ["Kode", "Nama Obat", "Kategori", "Merk", "Harga", "Stok", "Status", "Aksi"];

  const filteredObat = obat.filter((item) => {
    const matchSearch = searchTerm === "" || 
                        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.merk.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = filterKategori === "" || item.kategori === filterKategori;
    return matchSearch && matchKategori;
  });

  // Options untuk SelectField
  const kategoriOptions = [
    { value: "", label: "Semua Kategori" },
    { value: "Obat Bebas", label: "Obat Bebas" },
    { value: "Obat Keras", label: "Obat Keras" },
    { value: "Obat Bebas Terbatas", label: "Obat Bebas Terbatas" },
    { value: "Suplemen", label: "Suplemen" },
    { value: "Herbal", label: "Herbal" },
    { value: "Antiseptik", label: "Antiseptik" },
    { value: "Alkes", label: "Alat Kesehatan" },
    { value: "Lainnya", label: "Lainnya" }
  ];

  if (loading) {
    return <Loading text="Memuat data obat..." />;
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Data Obat" subtitle="Manajemen > Data Obat" />

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-50 mt-6">
        {/* Filter dan Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari obat, kode, atau merk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 py-3 pl-10 pr-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-apotek-merah/20"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                className="absolute left-3 top-3 w-4 h-4 opacity-30"
                alt="search"
              />
            </div>
            
            {/* SelectField untuk Filter Kategori */}
            <SelectField
              label=""
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              options={kategoriOptions}
            />
          </div>
          
          <Button type="danger" onClick={() => setAlert({ type: "info", message: "Fitur tambah obat sedang dalam pengembangan" })}>
            + Tambah Obat
          </Button>
        </div>

        {/* Tabel Obat */}
        <Table headers={headers}>
          {filteredObat.map((item) => {
            const status = getStatusStok(item.stok);
            return (
              <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 pl-4 font-bold text-gray-800">{item.kode}</td>
                <td className="py-5 font-bold text-gray-800">
                  <Link to={`/obat/${item.id}`} className="text-apotek-merah hover:underline">
                    {item.nama}
                  </Link>
                </td>
                <td className="py-5 text-gray-500">{item.kategori}</td>
                <td className="py-5 text-gray-500">{item.merk}</td>
                <td className="py-5 font-black text-gray-800">{formatHarga(item.harga)}</td>
                <td className="py-5 font-black">
                  {item.stok} <span className="text-gray-400 font-normal text-xs">{item.satuan}</span>
                </td>
                <td className="py-5">
                  <Badge type={status.type}>{status.text}</Badge>
                </td>
                <td className="py-5">
                  <Link to={`/obat/${item.id}`} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                    Detail
                  </Link>
                </td>
              </tr>
            );
          })}
        </Table>

        {/* Info jumlah data */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Menampilkan {filteredObat.length} dari {obat.length} data obat
        </div>
      </div>
    </div>
  );
}