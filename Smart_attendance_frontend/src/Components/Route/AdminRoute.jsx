// src/components/Admin/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem("adminToken");
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  );
};

export default AdminRoute;