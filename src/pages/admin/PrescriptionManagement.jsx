import React, { useState } from "react";

// --- DATA DUMMY LOKAL ---
const dummyPrescriptions = [
  {
    id: "RSP-001",
    date: "2026-07-08",
    status: "pending",
    patient: "Ahmad Subarjo",
    doctor: "Dr. Dian Sulistyo",
    notes: "Mohon obat sirupnya dipisahkan wadahnya",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",
    recommendations: ["Paracetamol 500mg"]
  },
  {
    id: "RSP-002",
    date: "2026-07-07",
    status: "diproses",
    patient: "Siti Rahma",
    doctor: "Dr. Budi Santoso",
    notes: "Pasien alergi obat golongan penisilin",
    image: null,
    recommendations: ["Vitamin C 1000mg", "Ibuprofen 400mg"]
  }
];

const dummyMeds = [
  "Paracetamol 500mg",
  "Amoxicillin 500mg",
  "Vitamin C 1000mg",
  "Ibuprofen 400mg",
  "Antasida Doen",
  "Cetirizine 10mg",
  "OBH Combi",
  "Curcuma Plus",
];

const statusCfg = {
  pending: { bg: "bg-amber-100", text: "text-amber-800", label: " Pending" },
  diproses: { bg: "bg-blue-100", text: "text-blue-800", label: " Diproses" },
  selesai: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    label: " Selesai",
  },
  ditolak: { bg: "bg-red-100", text: "text-red-800", label: " Ditolak" },
};

// --- MAIN COMPONENT ---
export default function PrescriptionManagement() {
  const [prescriptions, setPrescriptions] = useState(dummyPrescriptions);
  const [detail, setDetail] = useState(null);
  const [recInput, setRecInput] = useState("");

  // Fungsi update status resep
  const updateStatus = (id, status) => {
    setPrescriptions((prevList) =>
      prevList.map((p) => (p.id === id ? { ...p, status } : p))
    );

    if (detail?.id === id) {
      setDetail((prev) => ({
        ...prev,
        status,
      }));
    }
  };

  // Fungsi tambah rekomendasi obat
  const addRecommendation = (id) => {
    if (!recInput.trim()) return;

    setPrescriptions((prevList) =>
      prevList.map((p) => {
        if (p.id === id) {
          const updatedRecommendations = [...p.recommendations, recInput.trim()];
          
          if (detail?.id === id) {
            setDetail((prev) => ({ ...prev, recommendations: updatedRecommendations }));
          }
          
          return { ...p, recommendations: updatedRecommendations };
        }
        return p;
      })
    );

    setRecInput("");
  };

  // Fungsi hapus rekomendasi obat
  const deleteRec = (id, idx) => {
    setPrescriptions((prevList) =>
      prevList.map((p) => {
        if (p.id === id) {
          const updatedRecommendations = p.recommendations.filter((_, i) => i !== idx);
          
          if (detail?.id === id) {
            setDetail((prev) => ({ ...prev, recommendations: updatedRecommendations }));
          }
          
          return { ...p, recommendations: updatedRecommendations };
        }
        return p;
      })
    );
  };

  // Data untuk kartu statistik di atas halaman
  const statCards = [
    {
      label: "Total Resep",
      value: prescriptions.length,
      icon: "📋",
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      label: "Pending",
      value: prescriptions.filter((p) => p.status === "pending").length,
      icon: "⏳",
      color: "text-amber-500 bg-amber-50",
    },
    {
      label: "Diproses",
      value: prescriptions.filter((p) => p.status === "diproses").length,
      icon: "⚙️",
      color: "text-blue-500 bg-blue-50",
    },
    {
      label: "Selesai",
      value: prescriptions.filter((p) => p.status === "selesai").length,
      icon: "✅",
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="m-0 text-xl font-extrabold text-gray-900">
          Manajemen Resep
        </h2>
        <p className="m-0 mt-1 text-sm text-gray-500">
          Kelola dan proses resep yang diunggah pelanggan
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${s.color}`}
            >
              {s.icon}
            </div>
            <div>
              <div className="text-xl font-extrabold text-gray-900">
                {s.value}
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-0.5">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cards grid (Menampilkan langsung dari state `prescriptions`) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {prescriptions.map((p) => {
          const s = statusCfg[p.status] || { bg: "bg-gray-100", text: "text-gray-800", label: "Unknown" };
          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-extrabold text-emerald-600">
                    {p.id}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    {p.date}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}
                >
                  {s.label}
                </span>
              </div>

              {/* Preview area */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center border border-gray-100">
                <div className="bg-gray-50 rounded-xl p-2 mb-4 border border-gray-100">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt="Resep"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-xs text-gray-400 py-12">
                      Tidak ada gambar
                    </div>
                  )}
                </div>{" "}
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                  File Resep
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1 mb-4">
                <div className="text-xs text-gray-700">
                  <span className="font-bold">Pasien:</span> {p.patient}
                </div>
                {p.doctor && (
                  <div className="text-xs text-gray-500">
                    <span className="font-bold">Dokter:</span> {p.doctor}
                  </div>
                )}
                {p.notes && (
                  <div className="text-xs text-gray-400 italic">
                    "{p.notes}"
                  </div>
                )}
                {p.recommendations && p.recommendations.length > 0 && (
                  <div className="mt-2">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                      Rekomendasi Obat
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {p.recommendations.map((r, ri) => (
                        <span
                          key={ri}
                          className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 flex-wrap mt-auto">
                <button
                  onClick={() => setDetail(p)}
                  className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors"
                >
                  Detail & Rekomendasi
                </button>
                {p.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(p.id, "diproses")}
                      className="text-[10px] text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors"
                    >
                      Proses
                    </button>
                    <button
                      onClick={() => updateStatus(p.id, "ditolak")}
                      className="text-[10px] text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors"
                    >
                      Tolak
                    </button>
                  </>
                )}
                {p.status === "diproses" && (
                  <button
                    onClick={() => updateStatus(p.id, "selesai")}
                    className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg px-3 py-1.5 cursor-pointer font-bold transition-colors"
                  >
                    Selesai
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="m-0 text-xl font-extrabold text-gray-900">
                  Resep {detail.id}
                </h3>
                <p className="m-0 mt-0.5 text-xs text-gray-400">
                  {detail.date}
                </p>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Pasien
                </span>
                <span className="text-sm font-extrabold text-gray-900">
                  {detail.patient}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Status
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusCfg[detail.status]?.bg || 'bg-gray-100'} ${statusCfg[detail.status]?.text || 'text-gray-800'}`}
                >
                  {statusCfg[detail.status]?.label || 'Unknown'}
                </span>
              </div>
            </div>

            {/* Tambah rekomendasi */}
            <div className="mb-5">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-3">
                Tambah Rekomendasi Obat
              </p>
              <div className="flex gap-2">
                <select
                  value={recInput}
                  onChange={(e) => setRecInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="">Pilih obat...</option>
                  {dummyMeds.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => addRecommendation(detail.id)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Tambah
                </button>
              </div>
            </div>

            {/* List rekomendasi */}
            {detail.recommendations && detail.recommendations.length > 0 && (
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide mb-3">
                  Rekomendasi Obat ({detail.recommendations.length})
                </p>
                <div className="flex flex-col gap-2">
                  {detail.recommendations.map((r, ri) => (
                    <div
                      key={ri}
                      className="flex justify-between items-center bg-white rounded-xl px-3 py-2.5 border border-emerald-100 shadow-sm"
                    >
                      <span className="text-xs font-bold text-gray-700">
                        {r}
                      </span>
                      <button
                        onClick={() => deleteRec(detail.id, ri)}
                        className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer text-xs font-bold transition-colors ml-2 shrink-0"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
