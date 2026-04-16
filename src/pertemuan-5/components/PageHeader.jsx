// components/PageHeader.jsx
export default function PageHeader() {
  
  const handleAddClick = () => {
    alert("System: Order baru berhasil ditambahkan ke antrean!");
  };

  return (
    <div id="pageheader-container" className="flex items-center justify-between p-4">
      <div id="pageheader-left" className="flex flex-col">
        <span id="page-title" className="text-3xl font-semibold text-teks">Dashboard</span>
        <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
          <span className="text-gray-500">Dashboard</span>
          <span className="text-gray-500">/</span>
          <span className="text-hijau">Order List</span> 
        </div>
      </div>
      <div id="action-button">
        <button 
          id="add-button" 
          onClick={handleAddClick} 
          className="bg-hijau hover:bg-green-600 transition-colors text-white px-6 py-2 rounded-xl shadow-md font-medium"
        >
          + Add New Order
        </button>
      </div>
    </div>
  );
}