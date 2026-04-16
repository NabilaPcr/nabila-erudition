import { useState } from "react";
import { FaBell, FaSearch, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div id="header-container" className="flex justify-between items-center p-4 relative">
      <div id="search-bar" className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search Here..."
          className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none focus:ring-2 focus:ring-green-200"
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
          <FaBell />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">50</span>
        </div>
        <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer"><FcAreaChart /></div>
        <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"><SlSettings /></div>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <div 
            className="flex items-center space-x-4 border-l pl-4 border-gray-300 cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <span className="hidden md:block">Hello, <b>Nabila Azzahra</b></span>
            <img src="img/crochet.jpg" className="w-10 h-10 rounded-full border-2 border-hijau hover:opacity-80 transition" alt="Profile" />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-garis z-50 p-4 animate-in fade-in zoom-in duration-200">
              <div className="flex flex-col items-center">
                <img src="img/crochet.jpg" className="w-16 h-16 rounded-full mb-3" alt="Big Profile" />
                <h4 className="font-bold text-teks">Nabila Azzahra</h4>
                <p className="text-sm text-teks-samping mb-4 text-center">2 SI C - Politeknik Caltex Riau</p>
                <div className="w-full border-t border-garis pt-3">
                  <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg text-teks transition">
                    <FaUserCircle className="text-gray-400" />
                    <span>My Profile</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full p-2 hover:bg-red-50 rounded-lg text-merah transition mt-1">
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}