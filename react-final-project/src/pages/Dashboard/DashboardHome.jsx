// src/pages/Dashboard/DashboardHome.jsx

import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FaUserMd, FaUser } from "react-icons/fa";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
          setUserName(docSnap.data().name);
        }
      } else {
        navigate("/login");
      }
    };
    fetchUserRole();
  }, [navigate]);

  if (!userRole) return <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-3xl shadow-xl w-full max-w-md sm:max-w-lg lg:max-w-xl text-center border border-indigo-200/50 transition-all duration-300">
        {/* Welcome Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-900 mb-6 tracking-tight">
          Welcome
        </h1>

        {/* Icon + Name */}
        <div className="flex flex-col items-center mb-8">
          {userRole === "Doctor" ? (
            <>
              <FaUserMd className="text-indigo-950 text-5xl sm:text-6xl mb-4" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-indigo-950">
                Dr. {userName}
              </h2>
            </>
          ) : (
            <>
              <FaUser className="text-indigo-950 text-5xl sm:text-6xl mb-4" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-indigo-950">
                {userName}
              </h2>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-10 leading-relaxed px-2">
          {userRole === "Doctor"
            ? "Manage your patients and view today’s appointments with ease."
            : "Book appointments and keep track of your upcoming visits effortlessly."}
        </p>

        {/* Button */}
        <Link
          to="/dashboard/appointments"
          className="inline-block bg-indigo-900 hover:bg-indigo-950 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg font-medium"
        >
          Show Appointments
        </Link>
      </div>
    </div>
  );
}