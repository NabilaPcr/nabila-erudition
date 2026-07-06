export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 placeholder:text-gray-300 placeholder:font-normal"
      />
    </div>
  );
}