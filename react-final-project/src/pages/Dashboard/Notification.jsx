// src/pages/Dashboard/Notification.jsx

// src/pages/Dashboard/Notification.jsx

import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, orderBy } from "firebase/firestore";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);

      if (!auth.currentUser) {
        setError("Please login to see notifications.");
        setLoading(false);
        return;
      }

      try {
        // Get logged-in user's role & name
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          setError("User profile not found.");
          setLoading(false);
          return;
        }
        const userData = userSnap.data();
        const role = userData.role || "Patient";
        const name = userData.name || userData.displayName || "User";
        setUserRole(role);
        setUserName(name);

        // Fetch notifications
        const appointRef = collection(db, "appointment");
        let q;
        if (role === "Patient") {
          q = query(
            appointRef,
            where("patientId", "==", auth.currentUser.uid),
            orderBy("createdAt", "desc")
          );
        } else if (role === "Doctor") {
          q = query(
            appointRef,
            where("doctorId", "==", auth.currentUser.uid),
            orderBy("createdAt", "desc")
          );
        }

        const snap = await getDocs(q);
        const arr = [];
        snap.forEach((d) => {
          arr.push({ id: d.id, ...d.data() });
        });

        const mapped = arr.map((a) => ({
          id: a.id,
          title:
            role === "Patient"
              ? `Appointment booked with ${a.doctorName || a.doctor}`
              : `New booking from ${a.patientName || "Patient"}`,
          body: `${a.service || "Service"} — ${a.date} ${a.time}`,
          raw: a,
          acknowledged: !!a.notified,
        }));

        setNotifications(mapped);
        setLoading(false);
      } catch (err) {
        console.error("Notification fetch error:", err);
        setError("Failed to load notifications. Possibly needs Firestore index.");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const acknowledge = async (id) => {
    try {
      const docRef = doc(db, "appointment", id);
      await updateDoc(docRef, { notified: true });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, acknowledged: true } : n))
      );
    } catch (err) {
      console.error("Acknowledge error:", err);
      alert("Could not acknowledge. Try again.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <p className="text-gray-600 text-lg">Loading notifications...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-indigo-100 px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      <div className="text-center mb-10">
        <FaBell className="text-indigo-900 text-4xl mx-auto mb-2" />
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900">Notifications</h1>
        <p className="text-gray-700 mt-1">{userRole === "Doctor" ? "Recent bookings & updates for your practice" : "Your appointment updates"}</p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-6">
        {notifications.length === 0 ? (
          <div className="bg-white border border-indigo-200 rounded-2xl p-6 text-center text-gray-700 shadow">
            No notifications found.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-indigo-200 transition-transform transform hover:scale-102"
            >
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">{n.title}</h3>
                <p className="text-gray-600 mt-1">{n.body}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Created: {n.raw?.createdAt ? new Date(n.raw.createdAt).toLocaleString() : "—"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                {n.acknowledged ? (
                  <span className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full self-start">
                    Acknowledged
                  </span>
                ) : (
                  <button
                    onClick={() => acknowledge(n.id)}
                    className="bg-indigo-900 text-white px-4 py-2 rounded-full hover:bg-indigo-800 transition"
                  >
                    Acknowledge
                  </button>
                )}

                <button
              onClick={() => navigate("/dashboard/profile")}
             className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
           >
           View Profile
           </button>


              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
