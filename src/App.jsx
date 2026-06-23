import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from "./components/Loading";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import LandingPage from './pages/LandingPage';

const MainLayout = lazy(() => import('./layouts/MainLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CekStok = lazy(() => import('./pages/CekStok'));
const Chatbox = lazy(() => import('./pages/Chatbox'));
const Register = lazy(() => import('./pages/auth/Register'));
const Obat = lazy(() => import('./pages/Obat'));  
const DetailObat = lazy(() => import('./pages/DetailObat'));
const User = lazy(() => import('./pages/Users'));
const Guest = lazy(() => import('./pages/Guest')); // ← Import Guest

// Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const userData = localStorage.getItem('user');
  
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userData);
    
    // Jika requiredRole admin dan user bukan admin
    if (requiredRole === 'admin' && user.role !== 'admin') {
      return <Navigate to="/guest" replace />;
    }
    
    // Jika requiredRole user/staff dan user adalah admin
    if (requiredRole === 'staff' && user.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
  } catch (error) {
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Route Redirect berdasarkan role
function RoleBasedRedirect() {
  const userData = localStorage.getItem('user');
  
  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const user = JSON.parse(userData);
    if (user.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/guest" replace />;
    }
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* LandingPage */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          {/* Main Layout - untuk Admin */}
          <Route element={<MainLayout />}>
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/cek-stok" element={<CekStok />} />
            <Route path="/chatbox" element={<Chatbox />} />
            <Route path="/obat" element={<Obat />} />
            <Route path="/obat/:id" element={<DetailObat />} />
            
            <Route 
              path="/user" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <User />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Guest Layout - untuk Staff/User Biasa (tanpa sidebar) */}
          <Route 
            path="/guest" 
            element={
              <ProtectedRoute requiredRole="staff">
                <Guest />
              </ProtectedRoute>
            } 
          />

          {/* Redirect berdasarkan role */}
          <Route path="/dashboard" element={<RoleBasedRedirect />} />
          <Route path="/guest" element={<RoleBasedRedirect />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}