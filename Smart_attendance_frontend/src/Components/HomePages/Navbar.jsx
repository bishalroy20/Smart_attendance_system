import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthProvider"; // ✅ Auth context

const Navbar = () => {
  const { user, profile, signOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-indigo-600 text-white px-6 py-4 flex justify-between items-center z-50 shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold">Smart Attendance</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
        <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
        <li><a href="#features" className="hover:text-yellow-300">Features</a></li>
        <li><a href="#contact" className="hover:text-yellow-300">Contact</a></li>

        {user ? (
          <>
            <li><Link to="/profile" className="hover:text-yellow-300">Profile</Link></li>
            <li>
              <button
                onClick={signOutUser}
                className="hover:text-yellow-300"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/register" className="hover:text-yellow-300">Register</Link></li>
            <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
          </>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-700 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-indigo-500">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl">✕</button>
        </div>
        <ul className="flex flex-col gap-4 px-6 py-6">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><a href="#features" onClick={() => setIsOpen(false)}>Features</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>

          {user ? (
            <>
              <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
              <li>
                <button
                  onClick={() => {
                    signOutUser();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
              <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
