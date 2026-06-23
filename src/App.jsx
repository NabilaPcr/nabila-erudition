import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from "./components/Loading";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import LandingPage from './pages/LandingPage'; // Perbaiki path: seharusnya di pages/LandingPage.jsx, bukan pages/auth/LandingPage
import { User } from 'lucide-react';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CekStok = lazy(() => import('./pages/CekStok'));
const Chatbox = lazy(() => import('./pages/Chatbox'));
const Register = lazy(() => import('./pages/auth/Register'));
const Obat = lazy(() => import('./pages/Obat'));  
const DetailObat = lazy(() => import('./pages/DetailObat')); 

export default function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* LandingPage - Tanpa Layout (full width) */}
          <Route path="/" element={<LandingPage />} />
          
          {/* AuthLayout untuk halaman login/register */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          {/* MainLayout untuk halaman dengan sidebar (setelah login) */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cek-stok" element={<CekStok />} />
            <Route path="/chatbox" element={<Chatbox />} />
            <Route path="/obat" element={<Obat />} />
            <Route path="/obat/:id" element={<DetailObat />} />
            <Route path="/user" element={<User />} />

          </Route>

          {/* Redirect berdasarkan status login */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}