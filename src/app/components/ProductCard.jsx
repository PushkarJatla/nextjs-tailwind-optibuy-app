import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-700">₹{product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>
      <a
        href={product.link}
        target="_blank"
        className="inline-block mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Buy on {product.site}
      </a>
    </div>
  );
}
