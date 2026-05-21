// components/SelectField.jsx
export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  className = "",
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-gray-400 ml-4 uppercase tracking-wider mb-1 block">
          {label} {required && <span className="text-apotek-merah">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent outline-none focus:border-apotek-merah/20 focus:bg-white transition-all text-sm font-medium"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}