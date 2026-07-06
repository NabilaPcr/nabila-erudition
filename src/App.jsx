import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from "./components/Loading";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import LandingPage from './pages/LandingPage';

// ── Admin (lazy) ──────────────────────────────────────────
const MainLayout            = lazy(() => import('./layouts/MainLayout'));
const DashboardAdmin        = lazy(() => import('./pages/admin/DashboardAdmin'));
const CustomerManagement    = lazy(() => import('./pages/admin/CustomerManagement'));
const TransactionManagement = lazy(() => import('./pages/admin/TransactionManagement'));
const PrescriptionManagement= lazy(() => import('./pages/admin/PrescriptionManagement'));
const ProductManagement     = lazy(() => import('./pages/admin/ProductManagement'));
const CategoryManagement    = lazy(() => import('./pages/admin/CategoryManagement'));
const InventoryManagement   = lazy(() => import('./pages/admin/InventoryManagement'));
const MarketingManagement   = lazy(() => import('./pages/admin/MarketingManagement'));
const ReportsAnalytics      = lazy(() => import('./pages/admin/ReportsAnalytics'));
const StaffManagement       = lazy(() => import('./pages/admin/StaffManagement'));

// ── User (lazy) ───────────────────────────────────────────
const UserLayout      = lazy(() => import('./layouts/UserLayout'));
const ShopPage        = lazy(() => import('./pages/user/ShopPage'));
const CartPage        = lazy(() => import('./pages/user/CartPage'));
const OrdersPage      = lazy(() => import('./pages/user/OrdersPage'));
const UserPrescription= lazy(() => import('./pages/user/PrescriptionPage'));
const ProfilePage     = lazy(() => import('./pages/user/ProfilePage'));

// ── Auth ──────────────────────────────────────────────────
const Register = lazy(() => import('./pages/auth/Register'));

// ── Role check helper ─────────────────────────────────────
function getUser() {
  try {
    const d = localStorage.getItem('user');
    return d ? JSON.parse(d) : null;
  } catch { return null; }
}

const ADMIN_ROLES = ['admin', 'apoteker', 'kasir'];

// ── Protected Route ───────────────────────────────────────
function ProtectedRoute({ children, allowRoles }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to={ADMIN_ROLES.includes(user.role) ? '/dashboard' : '/'} replace />;
  }
  return children;
}

// ── Public route: redirect if already logged in ───────────
function PublicRoute({ children }) {
  const user = getUser();
  if (user) {
    return ADMIN_ROLES.includes(user.role)
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/shop" replace />;
  }
  return children;
}

// ── Redirect setelah login ────────────────────────────────
function RoleRedirect() {
  const user = getUser();
  if (!user) return <Navigate to="/" replace />;
  return ADMIN_ROLES.includes(user.role)
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/shop" replace />;
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* ── Public Landing Page (semua bisa akses) ── */}
          <Route path="/" element={<LandingPage />} />

          {/* ── Auth ─────────────────────────────────── */}
          <Route element={<AuthLayout />}>
            <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          </Route>

          {/* ── Admin / CRM Layout ───────────────────── */}
          <Route element={
            <ProtectedRoute allowRoles={ADMIN_ROLES}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard"   element={<DashboardAdmin />} />
            <Route path="/customers"   element={<CustomerManagement />} />
            <Route path="/transactions"element={<TransactionManagement />} />
            <Route path="/prescriptions" element={<PrescriptionManagement />} />
            <Route path="/products"    element={<ProductManagement />} />
            <Route path="/categories"  element={<CategoryManagement />} />
            <Route path="/inventory"   element={<InventoryManagement />} />
            <Route path="/marketing"   element={<MarketingManagement />} />
            <Route path="/reports"     element={<ReportsAnalytics />} />
            <Route path="/staff" element={
              <ProtectedRoute allowRoles={['admin']}>
                <StaffManagement />
              </ProtectedRoute>
            } />
          </Route>

          {/* ── User Layout ───────────────────────────── */}
          <Route element={
            <ProtectedRoute allowRoles={['user']}>
              <UserLayout />
            </ProtectedRoute>
          }>
            <Route path="/shop"            element={<ShopPage />} />
            <Route path="/cart"            element={<CartPage />} />
            <Route path="/orders"          element={<OrdersPage />} />
            <Route path="/my-prescription" element={<UserPrescription />} />
            <Route path="/profile"         element={<ProfilePage />} />
          </Route>

          {/* ── Redirect & Fallback ───────────────────── */}
          <Route path="/redirect" element={<RoleRedirect />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}