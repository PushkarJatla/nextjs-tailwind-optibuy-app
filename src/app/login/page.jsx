"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      toast.success("Login Successfull")
      router.push("/home");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex items-center border rounded px-3 py-2 mb-3">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none placeholder:text-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center border rounded px-3 py-2 mb-3">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none placeholder:text-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700"
        >
          Login
        </button>
      </form>
      <ToastContainer />

    </div>
  );
}
