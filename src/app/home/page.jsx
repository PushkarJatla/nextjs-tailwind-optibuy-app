"use client"
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard'
import { FaListUl } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));

        fetch('/api/user/liked-products')
            .then(res => res.json())
            .then(data => {
                console.log("✅ liked-products response:", data);
                const liked = Array.isArray(data)
                    ? data
                    : Array.isArray(data.liked)
                        ? data.liked
                        : [];

                setLikedProducts(liked);
            });

    }, []);

    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
        try {
            const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
            if (!res.ok) throw new Error(`Failed to fetch products for category: ${category}`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("❌ Error fetching category products:", error);
            setProducts([]);
        }
    };

    const handleLike = async (productId) => {
        try {
            const res = await fetch(`/api/products/${productId}/like`, {
                method: "POST"
            });
            if (res.ok) {
                setProducts(prev =>
                    prev.map(p =>
                        p.id === productId ? { ...p, likes: (p.likes || 0) + 1 } : p
                    )
                );
                setLikedProducts(prev => (prev.includes(productId) ? prev : [...prev, productId]));
                console.log("likedProducts", likedProducts)
            } else {
                const err = await res.json();
                console.warn("⚠️", err.error);
            }
        } catch (err) {
            console.error("❌ Error while liking:", err);
        }
    };

    const categories = [
        "Shoes", "Clothing", "Utensils", "Toys", "Electronics", "Groceries",
        "Furniture", "Books", "Beauty & Personal Care", "Fitness & Sports",
        "Mobile Phones", "Kitchen Appliances", "Accessories", "Watches", "Stationery"
    ];
    const { data: session, status } = useSession();
    console.log("sesseion is ", session); // should show user info

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
            <header className="bg-white shadow p-4 text-center text-2xl font-bold text-blue-700 relative">
                🛒 OptiBuy
                <button
                    className="md:hidden absolute right-4 top-4 text-blue-700 border border-blue-700 px-3 py-1 rounded hover:bg-blue-100 transition"
                    onClick={() => setShowSidebar(prev => !prev)}
                >
                    <FaListUl className="inline mr-2" />
                    {showSidebar ? 'Close' : 'Categories'}
                </button>
            </header>

            <div className="flex items-start">
                <aside className={`bg-white shadow-xl border border-gray-200 mt-6 w-56 p-5 rounded-tr rounded-br transition-all duration-300 ease-in-out z-20 ${showSidebar ? 'block absolute md:relative' : 'hidden'} md:block`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">🗂️ Categories</h3>
                    <ul className="space-y-3">
                        <li onClick={() => handleCategorySelect(null)} className={`px-4 py-2 rounded-lg shadow hover:shadow-md cursor-pointer transition-all duration-200 border ${!selectedCategory ? 'bg-blue-100 text-blue-900 border-blue-500 font-semibold' : 'bg-gradient-to-r from-blue-50 to-white text-blue-700 hover:text-blue-900 hover:border-blue-400 border-transparent'}`}>
                            Show All
                        </li>
                        {categories.map((cat, idx) => (
                            <li key={idx} onClick={() => handleCategorySelect(cat)} className={`px-4 py-2 rounded-lg shadow hover:shadow-md cursor-pointer transition-all duration-200 border ${selectedCategory === cat ? 'bg-blue-100 text-blue-900 border-blue-500 font-semibold' : 'bg-gradient-to-r from-blue-50 to-white text-blue-700 hover:text-blue-900 hover:border-blue-400 border-transparent'}`}>
                                {cat}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="flex-1 container mx-auto px-4 py-6">
                    <SearchBar />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                        {products.map((product) => {
                            const likedProductIds = new Set(likedProducts || []);
                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onLike={() => handleLike(product.id)} // ✅ pass ID
                                    isLiked={likedProductIds.has(product.id)}
                                />

                            );
                        })}
                    </div>
                </main>

            </div>

            <footer className="bg-white shadow text-center py-3 mt-8 text-sm text-gray-500">
                © 2025 ShopCompare. All rights reserved.
            </footer>
        </div>
    );
}