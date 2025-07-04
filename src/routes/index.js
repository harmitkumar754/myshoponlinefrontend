import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AdminDashboard from '../components/admin/AdminDashboard';
import VendorDashboard from '../components/vendor/VendorDashboard';
import CustomerDashboard from '../components/customer/CustomerDashboard';
import Header from '../components/common/Header';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/vendor" element={<VendorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
