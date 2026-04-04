export default function InputComp({ label, type, placeholder, value, onChange, error }) {
    return (
        <div className="mb-3 text-left w-full">
            <label className="block text-[#1a3c34] font-black text-[10px] uppercase mb-1">
                {label}
            </label>

            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full p-2 border-2 rounded-xl text-sm font-bold focus:outline-none bg-[#f0f9db] ${
                    error ? "border-red-500" : "border-[#1a3c34]"
                }`}
            />
            {/* Menampilkan pesan error jika ada */}
            {error && <p className="text-red-500 text-[9px] font-bold mt-1 italic uppercase tracking-tighter leading-none">⚠️ {error}</p>}
        </div>
    );
}