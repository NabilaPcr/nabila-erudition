export default function InputComp({ label, type, placeholder, value, onChange, name, error }) {
  return (
    <div className="mb-3 text-left w-full">
      <label className="block text-[#1a3c34] font-black text-[10px] uppercase mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border-2 rounded-xl text-sm font-bold focus:outline-none bg-[#f0f9db] ${
          error ? "border-red-500" : "border-[#1a3c34]"
        }`}
      />
      {error && (
        <p className="text-red-600 text-[9px] font-bold mt-1 italic uppercase animate-pulse">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}