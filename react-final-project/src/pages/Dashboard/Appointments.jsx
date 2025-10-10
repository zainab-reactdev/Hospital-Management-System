// src/pages/Dashboard/Appointments.jsx

import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { FaUserMd, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DashboardAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!auth.currentUser) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        // Fetch user details
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setError("User data not found");
          setLoading(false);
          return;
        }

        const { role, name, displayName, uid } = userSnap.data();
        setUserRole(role);
        const doctorNameToMatch = name || displayName || "Unknown";
        setUserName(doctorNameToMatch);

        const appointRef = collection(db, "appointment");
        let q;

        if (role === "Patient") {
          q = query(appointRef, where("patientId", "==", auth.currentUser.uid));
        } else if (role === "Doctor") {
          const today = new Date().toISOString().split("T")[0];
          q = query(appointRef, where("doctorId", "==", uid), where("date", "==", today));
        } else {
          setError("Invalid user role");
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(q);
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAppointments(temp);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white"><p>Loading appointments...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100-to-white"><p className="text-red-600">{error}</p></div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 to-white px-6 py-12">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-900 mb-8 tracking-tight">
        {userRole === "Doctor" ? "Today's Appointments" : "My Appointments"}
      </h1>

      <div className="flex flex-col items-center mb-10">
        {userRole === "Doctor" ? (
          <FaUserMd className="text-indigo-950 text-5xl sm:text-6xl mb-4" />
        ) : (
          <FaUser className="text-indigo-950 text-5xl sm:text-6xl mb-4" />
        )}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-indigo-950">
          {userRole === "Doctor" ? `Dr. ${userName}` : userName}
        </h2>
      </div>

      <div className="w-full max-w-5xl flex flex-col items-center gap-6">
        {appointments.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">No appointments found.</p>
        ) : (
          appointments.map((app) => (
            <div key={app.id} className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-200/50 w-full max-w-lg flex flex-col items-center">
              <div className="text-center">
                <p className="text-lg mb-3"><span className="font-semibold text-indigo-900">Patient:</span> {app.patientName || "Unknown"}</p>
                <p className="text-lg mb-3"><span className="font-semibold text-indigo-900">Doctor:</span> {app.doctorName || app.doctor || "Unknown"}</p>
                <p className="text-lg mb-3"><span className="font-semibold text-indigo-900">Service:</span> {app.service || "N/A"}</p>
                <p className="text-lg mb-3"><span className="font-semibold text-indigo-900">Date:</span> {app.date} ({app.day || "N/A"})</p>
                <p className="text-lg mb-3"><span className="font-semibold text-indigo-900">Time:</span> {app.time || "N/A"}</p>
              </div>
           <button
                onClick={() => navigate("/dashboard/notification")}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View Details
              </button>
            </div>     
          ))
        )}
      </div>
    </div>
  );
} 