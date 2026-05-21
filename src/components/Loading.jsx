// export default function Loading() {
//     return (
//         <div className=" flex flex-col justify-center items-center min-h-screen bg-white">
//             <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//             <p className="text-green-600 text-lg">Loading...</p>
//         </div>
//     );
// }


export default function Loading({ size = "md", text = "Loading..." }) {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`${sizes[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
      {text && <p className="mt-2 text-gray-600">{text}</p>}
    </div>
  );
}