import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import SellProductForm from "./pages/SellProductForm";
import PurchaseSuccess from "./pages/PurchaseSuccess";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sell-product" element={<SellProductForm />} />
        <Route path="/purchase-success" element={<PurchaseSuccess />} />
        {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
