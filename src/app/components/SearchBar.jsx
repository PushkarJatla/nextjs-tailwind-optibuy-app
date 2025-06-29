import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [site, setSite] = useState('');
  const [link, setLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('');

  const categories = [
  "Footwear",
  "Clothing",
  "Utensils",
  "Toys",
  "Electronics",
  "Groceries",
  "Furniture",
  "Books",
  "Beauty & Personal Care",
  "Fitness & Sports",
  "Mobile Phones",
  "Kitchen Appliances",
  "Accessories",
  "Watches",
  "Stationery"
];


  const [allProducts, setAllProducts] = useState([]);

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

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search product (e.g. Shoes)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-white p-2  rounded"
        />
        <input
          type="number"
          placeholder="Max Budget (₹)"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          className="w-full bg-white p-2  rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
        >
          Search
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded whitespace-nowrap"
        >
          Add Product
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white rounded-xl shadow-2xl border border-blue-100 w-full max-w-lg p-8">
    <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">➕ Add New Product</h2>

    <div className="space-y-4">
      <input
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        type="number"
        step="0.1"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={e => setRating(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Site (e.g., Amazon)"
        value={site}
        onChange={e => setSite(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Product Link"
        value={link}
        onChange={e => setLink(e.target.value)}
      />
     <select
  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>{cat}</option>
  ))}
</select>

      <input
        type="file"
        
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
        onChange={e => setImageFile(e.target.files[0])}
      />
    </div>

    <div className="flex justify-end mt-6 gap-3">
      <button
        onClick={() => setShowModal(false)}
        className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
      >
        Cancel
      </button>
      <button
        onClick={handleAddProduct}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
      >
        Add
      </button>
    </div>
  </div>
</div>

      )}
    </>
  );
};

export default SearchBar;
