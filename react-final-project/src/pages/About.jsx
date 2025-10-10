// src/pages/About.jsx

import React from 'react';
import { Link } from 'react-router-dom';
//import Header from '../components/Header'; // Assuming Header is in a separate file
//import Footer from '../components/Footer'; // Assuming Footer is in a separate file
import Img4 from "../assets/work_image_4.jpg";
import Img5 from "../assets/work_image_5.jpg";
import Img6 from "../assets/work_image_6.jpg";
import Img7 from "../assets/work_image_7.jpg";
import Img8 from "../assets/work_image_8.jpg";
import Img9 from "../assets/work_image_9.jpg";
import Img10 from "../assets/work_image_10.jpg";

export default function About() {
  const doctors = [
    { name: 'Dr. Zachary Brown', specialty: 'Cardiologist', image: Img5 },
    { name: 'Dr. Emily Carter', specialty: 'Neurologist', image: Img6 },
    { name: 'Dr. Michael Davis', specialty: 'Pediatrician', image: Img7 },
    { name: 'Dr. Sophia Lee', specialty: 'Oncologist', image: Img8 },
    { name: 'Dr. James Wilson', specialty: 'Dermatologist', image: Img9 },
    { name: 'Dr. Olivia Martinez', specialty: 'Orthopedist', image: Img10 },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* header */}

      {/* Hero Section */}
      <section className="py-12 bg-white text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-indigo-900" style={{ fontFamily: "'Dancing Script', cursive" }}>
          ABOUT US
        </h1>
      </section>

      {/* Who We Are Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={Img4}
              alt="Who We Are"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-4 text-indigo-900">Who We Are?</h2>
            <p className="text-lg mb-4">
              Curo Hospital is a leading healthcare provider dedicated to delivering exceptional medical services to our community.
              With a team of highly skilled professionals and state-of-the-art facilities, we strive to offer comprehensive care across various specialties.
              Our commitment to patient well-being and innovative treatments has made us a trusted name in healthcare for over a decade.
              At Curo, your health is our top priority, and we work tirelessly to ensure every patient receives personalized and compassionate care.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-4 text-indigo-900">Vision</h3>
            <p className="text-lg">
              To be a global leader in healthcare, delivering innovative and accessible medical solutions.
              We aim to foster healthier communities through advanced care and compassion.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-4 text-indigo-900">Mission</h3>
            <p className="text-lg">
              To provide high-quality, patient-centered healthcare with ethical practices.
              We empower patients through education and ensure top standards of care.
            </p>
          </div>
        </div>
      </section>

      {/* Our Best Doctors Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-900">Our Best Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">{doctor.name}</h3>
                  <p className="text-gray-600 mb-4">{doctor.specialty}</p>
                  <Link
                    to="/appointment"
                    className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*footer */}
    </div>
  );
}