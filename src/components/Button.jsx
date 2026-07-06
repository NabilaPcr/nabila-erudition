// components/Button.jsx
export default function Button({ children, type = "primary", onClick, disabled = false, className = "" }) {
  const types = {
    primary:   "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/25",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
    success:   "bg-green-600 hover:bg-green-700 text-white",
    danger:    "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/25",
    warning:   "bg-amber-500 hover:bg-amber-600 text-white",
    outline:   "bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 border-none cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 ${types[type] || types.primary} ${className}`}
    >
      {children}
    </button>
  );
}