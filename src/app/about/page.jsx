"use client";

export default function page() {
  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 flex flex-col items-center text-center">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6">About Us</h1>

        <p className="text-gray-700 text-base md:text-lg mb-6">
          Welcome to <span className="font-semibold text-emerald-700">CompareWise</span> — your smart shopping assistant.
          We help users compare products across top Indian platforms like <strong>Flipkart</strong>, <strong>Amazon</strong>, and <strong>Myntra</strong>, 
          bringing the best prices, reviews, and recommendations all in one place.
        </p>

        <p className="text-gray-600 text-sm md:text-base mb-4">
          Whether you're looking for the latest tech gadgets, trendy fashion, or reliable appliances,
          CompareWise helps you make confident purchase decisions by comparing features, prices, and user feedback quickly and easily.
        </p>

        <p className="text-gray-600 text-sm md:text-base mb-8">
          Our goal is to save your time, money, and effort by giving you a smarter way to shop online.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 text-left">
          <h2 className="text-xl font-semibold mb-3 text-emerald-700">What Makes Us Different</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Aggregated prices from top Indian marketplaces</li>
            <li>Location-based product suggestions</li>
            <li>Real-time reviews and ratings</li>
            <li>Clean, fast, and mobile-friendly experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
