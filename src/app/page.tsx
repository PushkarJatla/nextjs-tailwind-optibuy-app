// app/page.jsx
"use client"
import React, { useState } from 'react';
import SearchBar from '../app/components/SearchBar'
import ProductCard from '../app/components/ProductCard'

const dummyProducts = [
  {
    id: 1,
    name: 'Nike Air Max',
    image: '/images/shoe1.jpg',
    price: 999,
    rating: 4.5,
    site: 'Amazon',
    link: 'https://www.amazon.in/',
  },
  {
    id: 2,
    name: 'Adidas Sneakers',
    image: '/images/shoe2.jpg',
    price: 949,
    rating: 4.2,
    site: 'Flipkart',
    link: 'https://www.flipkart.com/',
  },
   {
    id: 3,
    name: 'Puma Running Shoes',
    image: '/images/shoe3.jpg',
    price: 899,
    rating: 4.0,
    site: 'Myntra',
    link: 'https://www.myntra.com/',
  },
  {
    id: 4,
    name: 'Campus Street Wear',
    image: '/images/shoe4.jpg',
    price: 799,
    rating: 4.1,
    site: 'AJIO',
    link: 'https://www.ajio.com/',
  },
  {
    id: 5,
    name: 'Sparx Casual Shoes',
    image: '/images/shoe5.jpg',
    price: 699,
    rating: 3.9,
    site: 'Flipkart',
    link: 'https://www.flipkart.com/',
  },
  {
    id: 6,
    name: 'Red Tape Sneakers',
    image: '/images/shoe6.jpg',
    price: 999,
    rating: 4.3,
    site: 'Amazon',
    link: 'https://www.amazon.in/',
  },
  {
    id: 7,
    name: 'Bata Formal Shoes',
    image: '/images/shoe7.jpg',
    price: 850,
    rating: 4.0,
    site: 'AJIO',
    link: 'https://www.ajio.com/',
  },
  {
    id: 8,
    name: 'HRX by Hrithik Roshan',
    image: '/images/shoe8.jpg',
    price: 950,
    rating: 4.4,
    site: 'Myntra',
    link: 'https://www.myntra.com/',
  },
  {
    id: 9,
    name: 'Woodland Trekking Boots',
    image: '/images/shoe9.jpg',
    price: 999,
    rating: 4.6,
    site: 'Amazon',
    link: 'https://www.amazon.in/',
  },
  {
    id: 10,
    name: 'ASICS Sports Shoes',
    image: '/images/shoe10.jpg',
    price: 990,
    rating: 4.3,
    site: 'Myntra',
    link: 'https://www.myntra.com/',
  }
];

export default function HomePage() {
  const [products, setProducts] = useState(dummyProducts);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 text-center text-xl font-bold text-blue-700">🛒 ShopCompare</header>

      <main className="container mx-auto px-4 py-6">
        <SearchBar/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>


      <footer className="bg-white shadow text-center py-3 mt-8 text-sm text-gray-500">© 2025 ShopCompare. All rights reserved.</footer>
    </div>
  );
}
