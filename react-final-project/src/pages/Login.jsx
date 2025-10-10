// Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 2️⃣ Fetch user role from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;

        // 3️⃣ Redirect based on role
        if (role === "Patient") {
          navigate("/dashboard");
        } else if (role === "Doctor") {
          navigate("/dashboard");
        } else {
          console.log("Role not defined!");
        }
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 py-12 bg-indigo-50">
        <div className="w-full max-w-md bg-white shadow-xl border border-blue-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-900 text-white py-3 rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-900 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
