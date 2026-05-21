export default function Avatar({ name, size = "w-10 h-10" }) {
  return (
    <div
      className={`${size} rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700`}
    >
      {name?.charAt(0) || "?"}
    </div>
  );
}