const STORAGE_KEY = "prescriptions";

const defaultData = [
  {
    id: "RES-001",
    patient: "Budi Santoso",
    date: "2026-07-02 09:15",
    status: "pending",
    doctor: "",
    image: "",
    notes: "Resep rutin bulanan",
    recommendations: [],
  },
  {
    id: "RES-002",
    patient: "Siti Rahayu",
    date: "2026-07-01 14:30",
    status: "diproses",
    doctor: "Dr. Budi Santoso",
    image: "",
    notes: "Resep antibiotik",
    recommendations: ["Amoxicillin 500mg", "Paracetamol 500mg"],
  },
];

function initialize() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }
}

export function getPrescriptions() {
  initialize();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function savePrescription(data) {
  const prescriptions = getPrescriptions();

  prescriptions.unshift(data);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(prescriptions)
  );
}

export function updatePrescription(id, updates) {
  const prescriptions = getPrescriptions();

  const updated = prescriptions.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );
}

export function generatePrescriptionId() {

  const prescriptions = getPrescriptions();

  if (prescriptions.length === 0) {
    return "RES-001";
  }

  const maxId = Math.max(
    ...prescriptions.map(p =>
      Number(p.id.replace("RES-", ""))
    )
  );

  return `RES-${String(maxId + 1).padStart(3, "0")}`;
}