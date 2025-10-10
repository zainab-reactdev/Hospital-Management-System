//import React from 'react';

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-900 text-white py-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">Curo</div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex space-x-6">
          <Link to="/" className="hover:text-indigo-300 transition">Home</Link>
          <Link to="/about" className="hover:text-indigo-300 transition">About</Link>
          <Link to="/services" className="hover:text-indigo-300 transition">Services</Link>
          <Link to="/appointment" className="hover:text-indigo-300 transition">Appointment</Link>
        </nav>

        {/* Desktop Sign In Button */}
        <Link
          to="/SignUp"
          className="hidden sm:block bg-white text-indigo-900 px-4 py-2 rounded-md hover:bg-indigo-100 transition"
        >
          SignUp
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-indigo-800 px-4 py-4 space-y-4">
          <Link to="/" className="block hover:text-indigo-300">Home</Link>
          <Link to="/about" className="block hover:text-indigo-300">About</Link>
          <Link to="/services" className="block hover:text-indigo-300">Services</Link>
          <Link to="/appointment" className="block hover:text-indigo-300">Appointment</Link>
          <Link
            to="/signUp"
            className="block bg-white text-indigo-900 px-4 py-2 rounded-md hover:bg-indigo-100 transition"
          >
            SignUp
          </Link>
        </div>
      )}
    </header>
  );
}
