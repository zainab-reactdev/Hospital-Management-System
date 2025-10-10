//import React from 'react';


import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold mb-4">Curo</div>
          <p>Quality healthcare for all.</p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Links</h4>
          <ul>
            <li><Link to="/" className="hover:text-indigo-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-indigo-300">About</Link></li>
            <li><Link to="/services" className="hover:text-indigo-300">Services</Link></li>
            <li><Link to="/appointment" className="hover:text-indigo-300">Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> 123 Health St, City</p>
          <p className="flex items-center"><FaPhone className="mr-2" /> (123) 456-7890</p>
          <p className="flex items-center"><FaEnvelope className="mr-2" /> info@curo.com</p>
          <p className="flex items-center"><FaClock className="mr-2" /> 24/7 Emergency</p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-2 mb-2 text-gray-800 rounded placeholder:text-gray-400"
          />
          <button className="bg-white text-indigo-900 px-4 py-2 rounded w-full hover:bg-indigo-100">
            Subscribe
          </button>
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="#"><FaFacebook className="hover:text-indigo-300" /></a>
            <a href="#"><FaTwitter className="hover:text-indigo-300" /></a>
            <a href="#"><FaInstagram className="hover:text-indigo-300" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
