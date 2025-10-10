// SERVICES.JSX

// Services.jsx
import React from "react";
import { FaCheck, FaBaby, FaHeartbeat, FaUserMd, FaBrain, FaBone, FaAmbulance, FaFlask, FaDumbbell, FaTooth } from "react-icons/fa";
/* import header here */
//import Footer from "../components/Footer"; 

const servicesData = [
  { icon: <FaBaby className="text-blue-900 text-6xl mx-auto" />, title: "Pregnancy Support", desc: "Comprehensive care for expecting mothers including prenatal check-ups, counseling, and delivery support." },
  { icon: <FaHeartbeat className="text-blue-900 text-6xl mx-auto" />, title: "Cardiology", desc: "Advanced heart care including diagnostics, surgeries, and rehabilitation for cardiovascular diseases." },
  { icon: <FaUserMd className="text-blue-900 text-6xl mx-auto" />, title: "Pediatrics", desc: "Child healthcare services from newborn checkups to adolescent care with a caring touch." },
  { icon: <FaBrain className="text-blue-900 text-6xl mx-auto" />, title: "Neurology", desc: "Expert diagnosis and treatment for neurological disorders using advanced medical technology." },
  { icon: <FaBone className="text-blue-900 text-6xl mx-auto" />, title: "Orthopedics", desc: "Comprehensive bone and joint care including surgeries, physiotherapy, and recovery programs." },
  { icon: <FaAmbulance className="text-blue-900 text-6xl mx-auto" />, title: "Emergency & Trauma", desc: "24/7 emergency services with fast response and critical care for all urgent medical conditions." },
  { icon: <FaFlask className="text-blue-900 text-6xl mx-auto" />, title: "Diagnostics & Lab", desc: "State-of-the-art diagnostic services including blood tests, imaging, and advanced lab investigations." },
  { icon: <FaDumbbell className="text-blue-900 text-6xl mx-auto" />, title: "Physiotherapy & Rehab", desc: "Customized rehabilitation programs for faster recovery and improved mobility." },
  { icon: <FaTooth className="text-blue-900 text-6xl mx-auto" />, title: "Dental Care", desc: "Comprehensive dental services from routine checkups to advanced procedures with expert care." },
];

const pricingData = [
  { plan: "Standard", price: "$56.95", points: ["Basic check-ups", "Standard tests", "Consultations", "24/7 support", "Access to general wards"] },
  { plan: "Basic", price: "$76.95", points: ["Standard services", "Specialist consultations", "Lab tests included", "Priority support", "General & semi-private rooms"] },
  { plan: "Deluxe", price: "$96.95", points: ["Advanced diagnostics", "Specialist doctors", "Emergency support", "Private room access", "Extended care services"] },
  { plan: "Ultimate", price: "$126.95", points: ["All Deluxe features", "Premium private rooms", "Personalized care", "Insurance covered", "24/7 personalized support"] },
];

const Services = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* import header here */}

      {/* Hero Section */}
      <section className="py-12 bg-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-900" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Services We Offer 
        </h1>
      </section>

      {/* Services Cards */}
      <div className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {servicesData.map((service, idx) => (
          <div key={idx} className="bg-blue-50 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition duration-300">
            {service.icon} 
            <h3 className="text-xl font-semibold my-4">{service.title}</h3>
            <p className="text-gray-700">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing Plan */}
      <div className="text-center py-16 bg-blue-50">
        <h2 className="text-6xl font-bold mb-12 text-blue-900">PRICING PLAN</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {pricingData.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-2">{plan.plan}</h3>
              <p className="text-xl font-bold mb-4">{plan.price}</p>
              <ul className="mb-6 space-y-2">
                {plan.points.map((point, i) => (
                  <li key={i} className="flex items-center justify-start space-x-2">
                    <FaCheck className="text-blue-600" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-indigo-900 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">Buy Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* Simplified Insurance Section */}
      <div className="bg-white text-blue-900 text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Worry About Insurance?</h2>
        <p className="mb-4 text-lg">We work with all major insurance providers to make your care hassle-free.</p>
        <p>ABC Insurance | XYZ Health | MedCare | LifePlus | SafeHealth | TrustInsure | GlobalCare</p>
      </div>

       {/* import footer here */}
    </div>
  );
};

export default Services;
