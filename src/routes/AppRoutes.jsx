import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../components/customer/HomePage';
import AboutPage from '../components/customer/AboutPage';
import CartPage from '../components/customer/CartPage';
// Import the rest of the pages (to be created next)
import WishlistPage from '../components/customer/WishlistPage';
import ProductsPage from '../components/customer/ProductsPage';
import SingleProductPage from '../components/customer/SingleProductPage';
import ContactPage from '../components/customer/ContactPage';
import RegistrationFormUser from '../components/customer/RegistrationFormUser';
import LoginFormUser from '../components/customer/LoginFormUser';
import Header from '../components/customer/Header';
import Footer from '../components/customer/Footer';
import ForgotPasswordUser from '../components/customer/ForgotPasswordUser';
import ProfileEditFormUser from '../components/customer/ProfileEditFormUser';
import MyOrdersUser from '../components/customer/MyOrdersUser';
import OrderHistoryUser from '../components/customer/OrderHistoryUser';
import LogoutUser from '../components/customer/LogoutUser';
import AddressManager from '../components/customer/AddressManager';
import CheckoutPage from '../components/customer/CheckoutPage';
import PaymentPage from '../components/customer/PaymentPage';
import ThankYouPage from '../components/customer/ThankYouPage';
import { useSelector } from 'react-redux';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.users);
  return isAuthenticated ? children : <Navigate to="/LoginFormUser" replace />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/RegistrationFormUser" element={<RegistrationFormUser />} />
        <Route path="/LoginFormUser" element={<LoginFormUser />} />
        <Route path="/ForgotPasswordUser" element={<ForgotPasswordUser />} />
        <Route path="/ProfileEditFormUser" element={<PrivateRoute><ProfileEditFormUser/></PrivateRoute>} />
        <Route path="/MyOrdersUser" element={<PrivateRoute><MyOrdersUser/></PrivateRoute>} />
        <Route path="/OrderHistoryUser" element={<PrivateRoute><OrderHistoryUser/></PrivateRoute>} />
        <Route path="/LogoutUser" element={<LogoutUser/>} />
        <Route path="/AddressManager" element={<PrivateRoute><AddressManager/></PrivateRoute>} />
        <Route path="/CheckoutPage" element={<PrivateRoute><CheckoutPage/></PrivateRoute>} />
        <Route path="/PaymentPage" element={<PrivateRoute><PaymentPage/></PrivateRoute>} />
        <Route path="/ThankYouPage" element={<PrivateRoute><ThankYouPage/></PrivateRoute>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default AppRoutes;
