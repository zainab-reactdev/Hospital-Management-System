import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Appointment from "../pages/Appointment";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

import DashboardHome from "../pages/Dashboard/DashboardHome";
import Appointments from "../pages/Dashboard/Appointments";
import Profile from "../pages/Dashboard/Profile";
import Notification from "../pages/Dashboard/Notification";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/dashboard/appointments" element={<Appointments />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/dashboard/notification" element={<Notification />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
 



