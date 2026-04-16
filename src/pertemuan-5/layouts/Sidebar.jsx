import { FaPlus, FaHome, FaClipboardList, FaUsers } from "react-icons/fa";

export default function Sidebar({ onNavigate, activePage }) {
  return (
    <div id="sidebar" className="flex min-h-screen w-80 flex-col bg-white p-8 shadow-lg">
      <div id="sidebar-logo" className="flex flex-col mb-10">
        <span className="font-poppins text-[40px] text-gray-900 leading-none">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400 text-xs">Modern Admin Dashboard</span>
      </div>

      <nav id="sidebar-menu" className="flex-1">
        <ul className="space-y-2">
          <li onClick={() => onNavigate('dashboard')}>
            <div className={`flex items-center space-x-3 cursor-pointer rounded-xl p-4 font-medium transition ${activePage === 'dashboard' ? 'bg-green-100 text-hijau' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FaHome /> <span>Dashboard</span>
            </div>
          </li>
          <li onClick={() => onNavigate('orders')}>
            <div className={`flex items-center space-x-3 cursor-pointer rounded-xl p-4 font-medium transition ${activePage === 'orders' ? 
                            'bg-green-100 text-hijau' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FaClipboardList /> <span>Orders</span>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-3 cursor-not-allowed rounded-xl p-4 font-medium text-gray-300">
              <FaUsers /> <span>Customers</span>
            </div>
          </li>
        </ul>
      </nav>

      <div id="sidebar-footer" className="mt-auto">
        <div className="bg-hijau p-5 rounded-2xl shadow-lg mb-6 relative overflow-hidden">
          <p className="text-white text-xs relative z-10 mb-4">Please organize your menus through button below!</p>
          <button 
            onClick={() => onNavigate('orders')}
            className="flex justify-center items-center w-full p-2 bg-white rounded-xl space-x-2 hover:bg-gray-100 transition relative z-10"
          >
            <FaPlus className="text-hijau" />
            <span className="text-teks font-bold text-sm">Add Menus</span>
          </button>
          <div className="absolute -right-2 -bottom-2 opacity-20 text-white text-6xl rotate-12">
            <FaClipboardList />
          </div>
        </div>
        <p className="font-bold text-gray-400 text-xs">Sedap Restaurant Admin</p>
        <p className="font-light text-gray-400 text-[10px]">&copy; 2025 All Right Reserved</p>
      </div>
    </div>
  );
}