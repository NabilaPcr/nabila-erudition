import React, { useEffect, useState } from "react";
import {
  savePrescription,
  generatePrescriptionId,
  getPrescriptions,
} from "../../services/prescriptionService";

const UploadIcon = () => (
  <svg
    width="40"
    height="40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const FileIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const XIcon = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const statusCfg = {
  selesai: {
    label: "Selesai",
    bg: "#f0fdf4",
    text: "#16a34a",
    icon: <CheckIcon />,
  },
  diproses: { label: "Diproses", bg: "#fffbeb", text: "#92400e", icon: null },
  ditolak: {
    label: "Ditolak",
    bg: "#fef2f2",
    text: "#991b1b",
    icon: <XIcon />,
  },
};

export default function PrescriptionPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [history, setHistory] = useState([]);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Harap unggah foto resep terlebih dahulu");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const newPrescription = {
      id: generatePrescriptionId(),
      patient: user?.name || "User",
      doctor: doctorName || "-",
      date: new Date().toLocaleString("id-ID"),
      status: "diproses",
      image: preview,
      notes,
      recommendations: [],
    };

    savePrescription(newPrescription);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      setFile(null);
      setPreview(null);
      setDoctorName("");
      setNotes("");
    }, 3000);
  };
  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (!submitted) {
      loadHistory();
    }
  }, [submitted]);

  const loadHistory = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = getPrescriptions().filter(
      (p) => p.patient === (user?.name || "User"),
    );

    setHistory(data);
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 m-0">
          Resep Saya
        </h1>
        <p className="text-sm text-gray-400 m-0 mt-1">
          Upload foto resep dokter untuk mendapatkan obat resep
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">
          Upload Resep Baru
        </h2>

        {submitted ? (
          <div className="text-center py-10">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ background: "#f0fdf4" }}
            >
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">
              Resep Berhasil Dikirim!
            </h3>
            <p className="text-sm text-gray-400">
              Apoteker akan memverifikasi resep Anda dalam 1x24 jam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              className="border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer"
              style={{
                borderColor: dragging ? "#22c55e" : "#e5e7eb",
                background: dragging ? "#f0fdf4" : "#f9fafb",
              }}
              onClick={() => document.getElementById("resep-file").click()}
            >
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview resep"
                    className="max-h-48 max-w-full mx-auto rounded-xl object-cover mb-3"
                  />
                  <p className="text-sm font-semibold text-gray-600">
                    {file?.name}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setPreview(null);
                    }}
                    className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium bg-transparent border-none cursor-pointer"
                  >
                    Hapus & pilih ulang
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-center text-gray-300 mb-3">
                    <UploadIcon />
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Seret foto resep ke sini
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    atau klik untuk memilih file (JPG, PNG, PDF)
                  </p>
                  <span className="inline-block px-4 py-2 rounded-xl text-sm font-bold border border-green-600 text-green-700 hover:bg-green-50 transition-colors">
                    Pilih File
                  </span>
                </>
              )}
            </div>
            <input
              id="resep-file"
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {/* Doctor name */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Nama Dokter (Opsional)
              </label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="dr. Nama Dokter"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-all"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: alergi tertentu, preferensi merek obat generik, dsb."
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-all resize-none"
              />
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-700 mb-1">
                Informasi Penting
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>Pastikan foto resep jelas dan dapat dibaca</li>
                <li>Resep akan diverifikasi oleh apoteker berlisensi</li>
                <li>Proses verifikasi membutuhkan 1x24 jam</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm text-white border-none cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #22c55e, #15803d)",
                boxShadow: "0 4px 15px rgba(34,197,94,0.3)",
              }}
            >
              Kirim Resep
            </button>
          </form>
        )}
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 m-0">
            Riwayat Resep
          </h2>
        </div>
        {history.length === 0 ? (
          <div className="text-center py-10">
            <div className="flex justify-center text-gray-200 mb-3">
              <FileIcon />
            </div>
            <p className="text-sm text-gray-400">Belum ada riwayat resep.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {history.map((r) => {
              const cfg = statusCfg[r.status] || statusCfg.diproses;
              return (
                <div key={r.id} className="px-6 py-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="text-xs text-gray-400 font-medium m-0">
                        {r.id} · {r.date}
                      </p>
                      <p className="text-sm font-bold text-gray-900 m-0 mt-0.5">
                        Resep dari {r.doctor}
                      </p>
                      <p className="text-xs text-gray-500 m-0 mt-1">
                        {r.recommendations?.length > 0
                          ? r.recommendations.join(", ")
                          : "Menunggu rekomendasi obat dari apoteker"}
                      </p>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0"
                      style={{ background: cfg.bg, color: cfg.text }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  {r.notes && (
                    <p className="text-xs text-gray-400 mt-2 bg-gray-50 rounded-lg px-3 py-2">
                      {r.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
