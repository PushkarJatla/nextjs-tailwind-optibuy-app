"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // icons
import { ToastContainer, toast } from 'react-toastify';


export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

          <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700">
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already registered? <a href="/login" className="text-emerald-600 underline">Login here</a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}
