"use client";
import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots, FaClipboard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";


export default function page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "General Inquiry",
    contactMethod: "email",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_6606ytx',
      'template_pj7iv4e',
      form,
      'H403Nm5NKck8UcAOc'
    )
      .then(() => {
        toast.success("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          type: "General Inquiry",
          contactMethod: "email",
        });
        router.push('/home');
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send message. Try again.");
      });
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 
  bg-gradient-to-br from-white via-green-50 to-emerald-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-emerald-700">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex items-center border rounded px-3 py-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaPhone className="text-gray-500 mr-2" />
              <input
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaClipboard className="text-gray-500 mr-2" />
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>

            <div className="border rounded px-3 py-2">
              <label className="block text-sm text-gray-700 mb-1 font-semibold">Message Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full outline-none"
              >
                <option>General Inquiry</option>
                <option>Product Feedback</option>
                <option>Technical Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div className="border rounded px-3 py-2">
              <label className="block text-sm text-gray-700 mb-1 font-semibold">Preferred Contact Method</label>
              <div className="space-x-4 mt-1">
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={form.contactMethod === "email"}
                    onChange={handleChange}
                  />{" "}
                  Email
                </label>
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={form.contactMethod === "phone"}
                    onChange={handleChange}
                  />{" "}
                  Phone
                </label>
              </div>
            </div>

            <div className="flex items-start border rounded px-3 py-2">
              <FaCommentDots className="text-gray-500 mr-2 mt-1" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full outline-none resize-none"
                rows={4}
              />
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700">
              Send Message
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>

  );
}
