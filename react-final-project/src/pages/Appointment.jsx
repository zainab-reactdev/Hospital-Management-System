// Appointment.jsx

import React, { useMemo, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const doctorOptions = [
  "Dr. Zachary Brown",
  "Dr. Emily Carter",
  "Dr. Michael Davis",
  "Dr. Sophia Lee",
  "Dr. James Wilson",
  "Dr. Olivia Martinez",
  "Dr. Ethan Walker",
  "Dr. Charlotte Adams",
  "Dr. Benjamin Clark",
  "Dr. Isabella Turner",
];

const serviceOptions = [
  "General Consultation",
  "Cardiology Checkup",
  "Pediatrics Care",
  "Neurology Assessment",
  "Orthopedic Evaluation",
  "Gynecology & Maternity",
  "ENT Examination",
  "Dermatology Treatment",
  "Diagnostic & Lab Tests",
  "Physiotherapy Session",
];

const getDayName = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString(undefined, { weekday: "long" });
};

const Appointment = () => {
  const [form, setForm] = useState({
    patientName: auth.currentUser?.displayName || "",
    phone: "",
    doctor: doctorOptions[0],
    service: serviceOptions[0],
    date: "",
    time: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const dayName = useMemo(() => getDayName(form.date), [form.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patientName || !form.phone || !form.date || !form.time || !form.doctor) {
      setSubmitted(false);
      alert("Please fill all required fields.");
      return;
    }

    const doctorUIDMap = {
      "Dr. Emily Carter": "9IXai5a2wocOXWA1FChIuiqAIMs1",
      "Dr. Zachary Brown": "some_uid_1",
      "Dr. Michael Davis": "some_uid_2",
      "Dr. Sophia Lee": "some_uid_3",
      "Dr. James Wilson": "some_uid_4",
      "Dr. Olivia Martinez": "some_uid_5",
      "Dr. Ethan Walker": "some_uid_6",
      "Dr. Charlotte Adams": "some_uid_7",
      "Dr. Benjamin Clark": "some_uid_8",
      "Dr. Isabella Turner": "some_uid_9",
    };

    const payload = {
      patientName: form.patientName,
      phone: form.phone,
      doctor: form.doctor,
      service: form.service,
      date: form.date,
      time: form.time,
      day: dayName || "",
      createdAt: new Date().toISOString(),
      patientId: auth.currentUser?.uid || "anonymous",
      doctorName: form.doctor,
      doctorId: doctorUIDMap[form.doctor] || "",
    };

    try {
      await addDoc(collection(db, "appointment"), payload);
      setSubmitted(true);
      setForm({
        patientName: auth.currentUser?.displayName || "",
        phone: "",
        doctor: doctorOptions[0],
        service: serviceOptions[0],
        date: "",
        time: "",
      });
    } catch (err) {
      console.error("Error saving appointment:", err);
      alert("Error booking appointment. Try again.");
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-12 bg-white text-center">
        <h1
          className="text-5xl md:text-5xl font-bold text-indigo-900"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Booking Appointment is Easy Now
        </h1>
      </section>

      {/* Appointment Form Card */}
      <div className="max-w-6xl w-full mx-auto px-4 -mt-10 md:-mt-12 mb-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={form.patientName}
                onChange={handleChange}
                placeholder="Enter patient full name"
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />

              <label className="block text-sm font-medium text-blue-900 mt-5 mb-1">Patient Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g., (123) 456-7890"
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />

              <label className="block text-sm font-medium text-blue-900 mt-5 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />

              <label className="block text-sm font-medium text-blue-900 mt-5 mb-1">Day</label>
              <input
                type="text"
                value={dayName}
                placeholder="Auto-detected from date"
                className="w-full rounded-lg border border-blue-200 px-4 py-3 bg-gray-50 text-gray-700"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Doctor Name</label>
              <select
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {doctorOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <label className="block text-sm font-medium text-blue-900 mt-5 mb-1">Services</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <label className="block text-sm font-medium text-blue-900 mt-5 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition"
            >
              Book Appointment
            </button>
          </div>

          {submitted && (
            <div className="mt-6 text-center">
              <p className="inline-block bg-green-50 text-green-800 px-4 py-2 rounded-md border border-green-200">
                Your appointment has been booked
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Help / Contact Section (Restored) */}
      <div className="w-full bg-blue-50 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <h3 className="text-4xl md:text-4xl font-semibold text-blue-900">
              Need help?
            </h3>
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex items-center gap-3 text-blue-900 text-2xl">
                <FaPhone />
                <span>(123) 456-7890</span>
              </div>
              <button className="bg-white border border-blue-200 text-blue-900 rounded-md px-7 py-3 text-lg hover:bg-blue-100 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
