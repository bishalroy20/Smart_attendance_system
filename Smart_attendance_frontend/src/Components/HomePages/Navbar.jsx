import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthProvider";
import {
  Menu,
  X,
  Home,
  User,
  LogOut,
  LogIn,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const { user, profile, signOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold tracking-wide"
            >
              Smart Attendance
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-6 font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-200 transition duration-200"
                >
                  Home
                </Link>
              </li>

              <li>
                <a
                  href="#features"
                  className="hover:text-blue-200 transition duration-200"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="contact"
                  className="hover:text-blue-200 transition duration-200"
                >
                  Contact
                </a>
              </li>

              {user ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 hover:text-blue-200 transition"
                    >
                      <User size={18} />
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={signOutUser}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition duration-200 hover:scale-105"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="flex items-center gap-2 hover:text-blue-200 transition"
                    >
                      <UserPlus size={18} />
                      Register
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/login"
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition duration-200 hover:scale-105 shadow-sm flex items-center gap-2"
                    >
                      <LogIn size={18} />
                      Login
                    </Link>
                    
                  </li>
                  <Link
                      to="/admin-login"
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition duration-200 hover:scale-105 shadow-sm flex items-center gap-2"
                    >
                      <LogIn size={18} />
                      Admin
                    </Link>
                </>
              )}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[240px] bg-slate-800 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-700">
          <h2 className="text-lg font-bold">Menu</h2>

          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-red-400 transition"
          >
            <X size={26} />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col p-4 gap-2 text-[15px] font-medium">
          
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 hover:text-white transition"
            >
              <Home size={18} />
              Home
            </Link>
          </li>

          <li>
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 hover:text-white transition"
            >
              <LayoutDashboard size={18} />
              Features
            </a>
          </li>

          <li>
            <a
              href="contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 hover:text-white transition"
            >
              <User size={18} />
              Contact
            </a>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition"
                >
                  <User size={18} />
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {
                    signOutUser();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition"
                >
                  <UserPlus size={18} />
                  Register
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition shadow"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;