import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function ProductCard({ product, onLike, isLiked }) {
  return (
    <div className="relative rounded-2xl shadow-lg p-3 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl  ring-1 ring-inset ring-green-100
 bg-gradient-to-br from-white via-green-50 to-emerald-100
 text-blue-700">
      <div
        onClick={() => {
          if (!isLiked && onLike) onLike(product.id); // ✅ only call if not liked
        }}
        className={`absolute -top-3 -right-3 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition z-10 ${isLiked ? 'pointer-events-none opacity-60' : ''
          }`}
        title={isLiked ? "Already liked" : "Like this product"}
      >
        <FaHeart className= 'text-red-500 text-lg' />
        <span className="absolute -bottom-1 -right-1 bg-white text-xs text-gray-700 font-semibold w-5 h-5 rounded-full flex items-center justify-center border border-gray-300">
          {product.likes ?? 0}
        </span>
      </div>


      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover rounded-xl shadow-md"
      />

      <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
        {product.name}
      </h3>

      <div className="mt-2 text-gray-600 text-sm">₹ {product.price}</div>
      <div className="text-yellow-500 font-medium">⭐ {product.rating}</div>

      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow hover:from-green-600 hover:to-green-700 transition-all duration-300"
      >
        Buy on {product.site}
      </a>
    </div>
  );
}