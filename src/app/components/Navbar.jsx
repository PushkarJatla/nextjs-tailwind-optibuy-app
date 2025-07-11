"use client"
import Link from 'next/link'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = ({handleLogout, toggleDropdown, myName, dropdownOpen}) => {
  return (
    <div>
       <header className="bg-emerald-200 shadow-md px-6 py-2 flex flex-col md:flex-row justify-between items-center text-green-900 font-semibold">
                <div className="flex items-center gap-3">
                    <img src="/shopping-bag.png" alt="CompareWise Logo" className="w-10 h-10 object-contain" />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-emerald-700">CompareWise</span>
                        <span className="text-sm font-light text-gray-500 -mt-1">Buy Smart. Save Big.</span>
                    </div>
                </div>

                <nav className="space-x-8 text-sm md:text-base">
                    <Link href="/home" className="hover:text-emerald-700 transition">Home</Link>
                    <Link href="/about" className="hover:text-emerald-700 transition">About</Link>
                    <Link href="/services" className="hover:text-emerald-700 transition">Services</Link>
                    <Link href="/contact" className="hover:text-emerald-700 transition">Contact</Link>
                </nav>

                {/* User section with dropdown */}
                <div className="relative mt-3 md:mt-0">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <h1>Welcome, {myName?.split(" ")[0]||"User"}</h1>
                        <FaUserCircle size={24} className="text-emerald-700" />
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-10">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-emerald-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>
    </div>
  )
}

export default Navbar
