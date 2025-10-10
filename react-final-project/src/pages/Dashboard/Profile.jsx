// src/pages/Dashboard/Profile.jsx

import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) {
        setError("Please login to see profile.");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setError("User profile not found.");
          setLoading(false);
          return;
        }

        setUserData(userSnap.data());
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login"); 
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Try again.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
        <p className="text-indigo-900 font-medium">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 lg:p-12 w-full max-w-md sm:max-w-lg lg:max-w-xl border border-indigo-200/50 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <FaUser className="text-indigo-900 text-5xl sm:text-6xl" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-900">{userData.name}</h2>
          <p className="text-indigo-700 font-medium">{userData.role}</p>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-gray-700 mb-8 px-2 sm:px-4">
          <p><strong>Email:</strong> {userData.email || auth.currentUser.email}</p>
          <p><strong>Phone:</strong> {userData.phone || "—"}</p>
          {userData.specialization && <p><strong>Specialization:</strong> {userData.specialization}</p>}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-semibold shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
