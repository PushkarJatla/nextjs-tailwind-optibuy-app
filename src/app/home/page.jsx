"use client"
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'
import { useSession } from 'next-auth/react';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [budget, setBudget] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [site, setSite] = useState('');
    const [link, setLink] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [category, setCategory] = useState('');

    const categories = [
        "Shoes", "Clothing", "Utensils", "Toys", "Electronics", "Groceries",
        "Furniture", "Books", "Beauty & Personal Care", "Fitness & Sports",
        "Smartphones", "Kitchen Appliances", "Accessories", "Watches", "Stationery"
    ];

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setAllProducts(data); // ✅ keep a copy of all products
            });

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

    const handleSearch = () => {
        console.log(`Searching for "${query}" under ₹${budget}`);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        let imageUrl = "";

        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                imageUrl = reader.result;

                const newProduct = {
                    name,
                    price: parseFloat(price),
                    rating: parseFloat(rating),
                    site,
                    link,
                    imageUrl,
                    category,
                };

                try {
                    const res = await fetch("/api/products", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newProduct),
                    });

                    if (res.ok) {
                        const savedProduct = await res.json();
                        console.log("✅ Product added:", savedProduct);
                        setShowModal(false);
                    } else {
                        console.error("❌ Failed to add product:", await res.text());
                    }
                } catch (err) {
                    console.error("❌ Error:", err);
                }
            };

            reader.readAsDataURL(imageFile);
        }
    };

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
    useEffect(() => {
        if (!budget) {
            setProducts(allProducts); //  reset to full list
            return;
        }

        const [min, max] = budget.split("-").map(Number);

        const filtered = allProducts.filter((item) => {
            return item.price >= min && item.price <= max;
        });

        setProducts(filtered);
    }, [budget, allProducts]);



    const { data: session, status } = useSession();
   
    // const userName = 
    // // console.log(session.user.name.split(" ")[0])
    console.log(session.user.name)
    const myName = session.user.name;
    // // console.log(data.user)

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-white">
            <header className="bg-emerald-200 shadow-md px-6 py-4 flex justify-between items-center text-green-900 font-semibold">
                <div className="text-2xl font-bold flex items-center gap-2">
                    <span role="img" aria-label="cart">🛒</span> OptiBuy
                </div>
                <nav className="space-x-8 text-sm md:text-base">
                    <a href="/" className="hover:text-emerald-700 transition">Home</a>
                    <a href="#about" className="hover:text-emerald-700 transition">About</a>
                    <a href="#services" className="hover:text-emerald-700 transition">Services</a>
                    <a href="#contact" className="hover:text-emerald-700 transition">Contact</a>
                </nav>
                <h1>Welcome, {myName.split(" ")[0]}</h1>
            </header>

            <main className="flex-1 container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-2">
                    <select
                        className="w-full bg-gradient-to-r from-white via-emerald-50 to-white p-3 rounded-lg border border-emerald-200 shadow focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-800 font-medium transition duration-200"
                        value={selectedCategory || ""}
                        onChange={(e) => handleCategorySelect(e.target.value || null)}
                    >
                        <option className="hover:bg-emerald-100" value="">🗂️ Show All Categories</option>
                        {categories.map((val, index) => (
                            <option
                                key={index}
                                value={val}
                                className="hover:bg-emerald-100 hover:font-semibold"
                            >
                                {val}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full bg-gradient-to-r from-white via-emerald-50 to-white p-3 rounded-lg border border-emerald-200 shadow focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-800 font-medium transition duration-200"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    >
                        <option className="hover:bg-emerald-100" value="">💸 Select Budget</option>
                        <option className="hover:bg-emerald-100" value="0-500">Under ₹500</option>
                        <option className="hover:bg-emerald-100" value="500-1000">₹500 - ₹1,000</option>
                        <option className="hover:bg-emerald-100" value="1000-2000">₹1,000 - ₹2,000</option>
                        <option className="hover:bg-emerald-100" value="2000-3000">₹2,000 - ₹3,000</option>
                        <option className="hover:bg-emerald-100" value="3000-5000">₹3,000 - ₹5,000</option>
                        <option className="hover:bg-emerald-100" value="5000-10000">₹5,000 - ₹10,000</option>
                        <option className="hover:bg-emerald-100" value="10000-100000">Above ₹10,000</option>
                    </select>


                    <button
                        onClick={handleSearch}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-700 transition duration-200 inline-flex items-center justify-center whitespace-nowrap"
                    >
                        🔍 Search
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-full shadow hover:from-green-600 hover:to-emerald-700 transition duration-200 inline-flex items-center justify-center whitespace-nowrap"
                    >
                        ➕ Add Product
                    </button>


                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl border border-blue-100 w-full max-w-lg p-8">
                            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">➕ Add New Product</h2>
                            <div className="space-y-4">
                                <input className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
                                <input className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                                <input
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    placeholder="Rating (0 - 5)"
                                    value={rating}
                                    onChange={(e) => {
                                        let val = parseFloat(e.target.value);
                                        if (val > 5) val = 5;
                                        if (val < 0 || isNaN(val)) val = 0;
                                        // limit to one decimal place
                                        setRating(val.toFixed(1));
                                    }}
                                />
                                <input className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Site (e.g., Amazon)" value={site} onChange={e => setSite(e.target.value)} />
                                <input className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Product Link" value={link} onChange={e => setLink(e.target.value)} />
                                <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                <input type="file" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white" onChange={e => setImageFile(e.target.files[0])} />
                            </div>
                            <div className="flex justify-end mt-6 gap-3">
                                <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                                <button onClick={handleAddProduct} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow">Add</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
                    {products.map((product) => {
                        const likedProductIds = new Set(likedProducts || []);
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onLike={() => handleLike(product.id)}
                                isLiked={likedProductIds.has(product.id)}
                            />
                        );
                    })}
                </div>
            </main>

            <footer className="bg-emerald-100 text-center py-4 text-sm text-green-800 mt-auto shadow-inner">
                © 2025 ShopCompare. All rights reserved.
            </footer>
        </div>

    );
}