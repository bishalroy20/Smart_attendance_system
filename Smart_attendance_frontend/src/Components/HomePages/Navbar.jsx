import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-indigo-200 bg-transparent backdrop-blur-md text-white px-8 py-4 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold">Smart Attendance</h1>
      <ul className="flex gap-6">
        <li><a href="#hero" className="hover:text-blue-300">Home</a></li>
        <li><a href="#features" className="hover:text-blue-300">Features</a></li>
        <li><a href="/register" className="hover:text-blue-300">Register</a></li>
        <li><a href="/login" className="hover:text-blue-300">Login</a></li>
        <li><a href="#contact" className="hover:text-blue-300">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
