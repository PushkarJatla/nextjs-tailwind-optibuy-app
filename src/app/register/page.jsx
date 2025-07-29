"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // icons
import { ToastContainer, toast } from 'react-toastify';


export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      toast.success("Registered successfully! Please login.");
      router.push('/login');
    } else {
      toast.error("Registration failed. Try again.");
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-emerald-600">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded px-3 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full outline-none placeholder:text-emerald-500"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full outline-none placeholder:text-emerald-500"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full outline-none placeholder:text-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded ${loading
                ? 'bg-emerald-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Registering...
              </div>
            ) : (
              'Register'
            )}
          </button>

        </form>
        <p className="text-center mt-4 text-sm">
          Already registered? <a href="/login" className="text-emerald-600 underline">Login here</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}