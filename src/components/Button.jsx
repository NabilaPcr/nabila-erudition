// components/Button.jsx
export default function Button({ children, type = "primary", onClick, className = "" }) {
  const types = {
    primary: "bg-apotek-hijau hover:bg-green-600 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-apotek-merah hover:bg-red-400 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`${types[type]} px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}