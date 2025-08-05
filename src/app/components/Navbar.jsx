"use client";
import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ handleLogout, toggleDropdown, myName, dropdownOpen }) => {
    const isLoggedIn = !!myName;

    return (
        <header className="bg-emerald-200 shadow-md px-6 py-2 text-green-900 font-semibold">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/shopping-bag.png"
                            alt="CompareWise Logo"
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-700">
                                CompareWise
                            </span>
                            <span className="text-xs sm:text-sm md:text-base font-light text-gray-500 -mt-1 whitespace-nowrap">
                                Buy Smart. Save Big.
                            </span>
                        </div>
                    </div>

                    {/* Mobile: Welcome or Login Button */}
                    <div className="md:hidden flex items-center gap-2">
                        {isLoggedIn ? (
                            <>
                                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl">
                                    Welcome, {myName.split(" ")[0]}
                                </h1>
                                <FaUserCircle className="text-emerald-700 text-2xl sm:text-3xl md:text-4xl" />
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow-sm border border-emerald-400 text-emerald-700 hover:bg-emerald-50 transition-all duration-200 text-xs sm:text-sm md:text-base"
                            >
                                <FaUserCircle className="text-base sm:text-lg md:text-xl" />
                                <span className="whitespace-nowrap">Login</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4 md:mt-0 flex justify-center md:justify-end space-x-6 text-sm md:text-base">
                    <Link href="/" className="hover:text-emerald-700 transition">Home</Link>
                    <Link href="/about" className="hover:text-emerald-700 transition">About</Link>
                    <Link href="/services" className="hover:text-emerald-700 transition">Services</Link>
                    <Link href="/contact" className="hover:text-emerald-700 transition">Contact</Link>
                </nav>

                {/* Desktop: Welcome or Login Button */}
                <div className="relative hidden md:flex items-center gap-2">
                    {isLoggedIn ? (
                        <>
                            <h1 className="float-right">Welcome, {myName.split(" ")[0]}</h1>
                            <FaUserCircle
                                className="text-emerald-700 text-2xl sm:text-3xl md:text-4xl cursor-pointer"
                                onClick={toggleDropdown}
                            />
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
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow-sm border border-emerald-400 text-emerald-700 hover:bg-emerald-50 transition-all duration-200 text-sm md:text-base"
                        >
                            <FaUserCircle className="text-base sm:text-lg md:text-xl" />
                            <span className="whitespace-nowrap">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
