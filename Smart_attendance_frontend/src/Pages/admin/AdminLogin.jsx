// src/components/Admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 🎯 স্ট্যাটিক ক্রেডেনশিয়াল ভ্যালিডেশন
    if (credentials.username === "bishalroy" && credentials.password === "password") {
      localStorage.setItem("adminToken", "admin_logged_in_bishalroy");
      alert("Admin Login Successful!");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid Admin Username or Password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <span className="text-3xl">🛡️</span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-3">Admin Portal</h2>
          <p className="text-sm text-slate-400 mt-1">Sign in with your static credentials</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-indigo-400 mb-1.5 uppercase">Username</label>
            <input
              type="text"
              name="username"
              required
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              placeholder="e.g., bishalroy"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-indigo-400 mb-1.5 uppercase">Password</label>
            <input
              type="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-150 disabled:opacity-50 mt-2"
          >
            {loading ? "Verifying..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}