import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { initializeDatabase } from './services/database';
import { getCurrentUser } from './services/auth';

// Layouts
import DashboardLayout from './components/Layout/DashboardLayout';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserDashboard from './pages/User/Dashboard';
import NewBooking from './pages/User/NewBooking';
import MyBookings from './pages/User/MyBookings';
import HubLocator from './pages/User/HubLocator';
import Schedule from './pages/User/Schedule';
import AdminDashboard from './pages/Admin/Dashboard';
import ManageBookings from './pages/Admin/ManageBookings';
import ManageHubs from './pages/Admin/ManageHubs';
import ManageSchedules from './pages/Admin/ManageSchedules';
import CollectionManager from './pages/Admin/CollectionManager';

// Protected route wrapper
function ProtectedRoute({ children, adminOnly = false }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F1F5F9',
            border: '1px solid rgba(148,163,184,0.12)',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/new-booking" element={<NewBooking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/hubs" element={<HubLocator />} />
          <Route path="/schedule" element={<Schedule />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute adminOnly><DashboardLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
          <Route path="/admin/hubs" element={<ManageHubs />} />
          <Route path="/admin/schedules" element={<ManageSchedules />} />
          <Route path="/admin/collection" element={<CollectionManager />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
