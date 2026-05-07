import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex font-barlow">
      <Sidebar onNavigate={setCurrentPage} activePage={currentPage} />
      
      <div id="main-content" className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Header />
        
        {/* Render halaman secara kondisional */}
        <main className="flex-1">
          {currentPage === "dashboard" ? (
            <Dashboard />
          ) : (
            <Orders />
          )}
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);