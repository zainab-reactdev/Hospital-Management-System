// src/pages/Home.jsx
//import React from "react";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ✅ Agar Header/Footer use karne ho to uncomment karo:
// import Header from "../components/Header";
// import Footer from '../components/Footer';

// ✅ LOCAL IMAGES FROM ASSETS FOLDER:
import Img1 from "../assets/work_image_2.jpg";
import Img2 from "../assets/work_image_3.jpg";

export default function Home() {
  // FAQ state
  const [openFAQ, setOpenFAQ] = useState([false, false, false, false]);

  const toggleFAQ = (index) => {
    const newOpen = [...openFAQ];
    newOpen[index] = !newOpen[index];
    setOpenFAQ(newOpen);
  };

  // Reviews slider state
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = [
    { text: "Curo provided excellent care during my treatment. Highly recommended!", name: "John Doe" },
    { text: "The doctors are very professional and the facilities are top-notch.", name: "Jane Smith" },
    { text: "Friendly staff and quick emergency response saved my day.", name: "Alice Johnson" },
    { text: "Best hospital experience I've had. Compassionate and efficient.", name: "Bob Brown" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // FAQ data
  const faqs = [
    { q: "What are the hospital visiting hours?", a: "Visiting hours are from 10 AM to 8 PM daily." },
    { q: "How can I book an appointment?", a: "You can book via our website or call our helpline." },
    { q: "Do you accept insurance?", a: "Yes, we accept most major insurance providers." },
    { q: "What emergency services do you offer?", a: "We provide 24/7 emergency care with ambulance services." },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* ✅ Header yahan lagana ho to uncomment karo */}
      {/* <Header /> */}

      {/* ✅ Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4 text-indigo-900">
              Quality Healthcare,<br />Trusted by Families
            </h1>
            <p className="text-lg mb-6">
              Access world-class doctors, advanced facilities, and compassionate care. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <Link to="/appointment" className="bg-indigo-900 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
                Book Appointment
              </Link>
              <button className="bg-white text-indigo-900 border border-indigo-900 px-6 py-3 rounded-md hover:bg-indigo-100 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={Img1}
              alt="Doctors"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ✅ Stats Section */}
      <section className="bg-indigo-100 py-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
          10+ Years Experience<br />50K+ Patients Resolved
        </h2>
      </section>

      {/* ✅ Cards Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-indigo-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-900 transition cursor-pointer">
            <h3 className="text-xl font-bold mb-2 text-indigo-900">Quality Doctors</h3>
            <p>Our team of experienced doctors ensures the best care for every patient.</p>
          </div>
          <div className="p-6 bg-white border border-indigo-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-900 transition cursor-pointer">
            <h3 className="text-xl font-bold mb-2 text-indigo-900">Emergency Services</h3>
            <p>24/7 emergency support with rapid response teams.</p>
          </div>
          <div className="p-6 bg-white border border-indigo-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-900 transition cursor-pointer">
            <h3 className="text-xl font-bold mb-2 text-indigo-900">Friendly Services</h3>
            <p>Compassionate staff dedicated to making your visit comfortable.</p>
          </div>
        </div>
      </section>

      {/* ✅ Why Choose Us Section */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={Img2}
              alt="Doctors Team"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-4 text-indigo-900">Why Choose Us</h2>
            <p className="mb-4">
              At Curo, we prioritize your health with state-of-the-art facilities and a team of dedicated professionals.
              Our patient-centered approach ensures personalized care tailored to your needs.
            </p>
            <p>
              With over 10 years of experience, we've resolved issues for over 50,000 patients, building trust in our community.
              Choose us for reliable, compassionate, and advanced healthcare services.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-900">FAQ</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-indigo-200">
              <h3
                className="text-xl font-semibold cursor-pointer flex justify-between items-center py-4 hover:text-indigo-700 transition"
                onClick={() => toggleFAQ(index)}
              >
                {faq.q}
                <span className="text-2xl">{openFAQ[index] ? '-' : '+'}</span>
              </h3>
              {openFAQ[index] && <p className="pb-4">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Reviews Section */}
      <section className="py-12 bg-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-indigo-900">Patient Reviews</h2>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <p className="text-lg italic mb-4">
              "{reviews[currentReview].text}"
            </p>
            <p className="font-semibold">
              - {reviews[currentReview].name}
            </p>
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() =>
                setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
              }
              className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              &lt;
            </button>
            <button
              onClick={() =>
                setCurrentReview((prev) => (prev + 1) % reviews.length)
              }
              className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Footer uncomment if needed */}
      {/* <Footer /> */}
    </div>
  );
}
