import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { RoleSelection } from './pages/RoleSelection';
import { DriverAuth } from './pages/DriverAuth';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { RestaurantOrder } from './pages/RestaurantOrder';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminRoute } from './components/AdminRoute';
import { DriverDashboard } from './pages/driver/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/role-selection" element={<Layout><RoleSelection /></Layout>} />
          
          {/* Driver Routes */}
          <Route path="/driver-auth" element={<Layout><DriverAuth /></Layout>} />
          <Route path="/driver/dashboard" element={<Layout><DriverDashboard /></Layout>} />
          
          {/* User Routes */}
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/orders" element={<Layout><Orders /></Layout>} />
          <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/restaurant/:id/order" element={<Layout><RestaurantOrder /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;