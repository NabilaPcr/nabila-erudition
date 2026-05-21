export default function Table({ headers, children }) {
  const headerArray = Array.isArray(headers) ? headers : [];
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
            {headerArray.map((header, index) => (
              <th
                key={index}
                className="px-4 py-4 first:pl-4 last:pr-4 font-bold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm font-medium">
          {children}
        </tbody>
      </table>
    </div>
  );
}