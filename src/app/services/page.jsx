"use client";
import { FaSearch, FaStar, FaTags, FaChartBar } from "react-icons/fa";

export default function page() {
  const services = [
    {
      icon: <FaSearch className="text-emerald-700 text-3xl mb-3" />,
      title: "Product Discovery",
      desc: "Easily find top-rated products from Amazon, Flipkart, and Myntra and many more using our unified search.",
    },
    {
      icon: <FaTags className="text-emerald-700 text-3xl mb-3" />,
      title: "Price Comparison",
      desc: "Compare prices across different platforms to get the best deal without switching tabs.",
    },
    {
      icon: <FaStar className="text-emerald-700 text-3xl mb-3" />,
      title: "User Reviews",
      desc: "See real reviews and ratings to make informed decisions before you buy.",
    },
    {
      icon: <FaChartBar className="text-emerald-700 text-3xl mb-3" />,
      title: "Trends & Insights",
      desc: "Track trending products and analyze popularity based on region and category.",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-10">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg"
          >
            {service.icon}
            <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
            <p className="text-gray-600 mt-2 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
