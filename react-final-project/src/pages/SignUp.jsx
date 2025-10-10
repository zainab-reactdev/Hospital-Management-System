//SignUp 

// ✅ React hooks & navigation import
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ✅ Firebase Auth & Firestore import
// Yahan se hum firebase.js se auth (login/signup) aur db (database) use karenge
import { auth, db } from "../firebase";

// ✅ Firebase ke functions import
// createUserWithEmailAndPassword → account banane ke liye
// setDoc + doc → database me user data save karne ke liye
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();

  // ✅ Ye form ka data handle karega (UI se)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Patient",
  });

  // ✅ Jab user input change karega to ye values update karega
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Signup button par click karne par ye function chalega
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ 1) Firebase Authentication me account create karna
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // ✅ 2) Firestore database me "users" collection ke andar user ka data save karna
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        role: formData.role, // Patient ya Doctor
        createdAt: new Date(),
      });

      // ✅ 3) Role ke hisaab se redirect karna
     if (formData.role === "Patient") {
    navigate("/dashboard");
        } else {
     navigate("/dashboard");
   }

    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message); // Agar email already used ho ya password weak ho
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 py-12 bg-indigo-50">
        <div className="w-full max-w-md bg-white shadow-xl border border-blue-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-900 text-white py-3 rounded-md hover:bg-indigo-700 transition"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-900 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


