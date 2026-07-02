import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Firebase login
      const cred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // ✅ Django backend JWT
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        {
          email: cred.user.email,
        }
      );

      localStorage.setItem(
        "accessToken",
        res.data.access
      );

      navigate("/profile");
    } catch (err) {
      console.error(
        "Login error:",
        err.response?.data || err
      );

      toast.error("❌ Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10 pt-20">
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Left Side */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white flex-col justify-between">
          
          {/* Blur */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <ShieldCheck size={28} />
              </div>

              <h1 className="text-3xl font-bold">
                Smart Attendance
              </h1>
            </div>

            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Welcome Back 👋
            </h2>

            <p className="text-blue-100 text-lg leading-relaxed max-w-md">
              Login securely to access your AI powered attendance dashboard and real-time monitoring system.
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-blue-100">
              Secure • Fast • Reliable
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 md:p-10">
          
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            <div className="mb-8 text-center lg:text-left">
              
              <h2 className="text-4xl font-bold text-slate-800 mb-3">
                Login
              </h2>

              <p className="text-slate-500">
                Enter your credentials to continue
              </p>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300 hover:scale-[1.02] shadow-md hover:shadow-xl"
            >
              Login
              <ArrowRight size={18} />
            </button>

            {/* Register */}
            <p className="text-center text-slate-500 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}