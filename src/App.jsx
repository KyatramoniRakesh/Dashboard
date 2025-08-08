import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignPage';

import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Users from './pages/Users';
import Reports from './pages/Reports';

import AdminLayout from './components/AdminLayout';

// Temporary placeholder components so the app won't crash
const AdminDashboard = () => <h2>Admin Dashboard</h2>;
const AdminUsers = () => <h2>Admin Users</h2>;
const AdminReports = () => <h2>Admin Reports</h2>;
const Unauthorized = () => <h2>Unauthorized - You do not have access</h2>;

// ✅ Protect normal routes (only logged-in users can see)
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// ✅ Protect admin-only routes
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* Normal User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
