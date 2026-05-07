import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/auth/login')); 
const CekStok = lazy(() => import('./pages/CekStok'));
const Chatbox = lazy(() => import('./pages/Chatbox'));
const Register = lazy(() => import('./pages/auth/Register'));

export default function App() {
  // Logika login sederhana seperti di referensi
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Suspense fallback={<Login />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cek-stok" element={<CekStok />} />
            <Route path="/chatbox" element={<Chatbox />} />
          </Route>

          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
          
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}