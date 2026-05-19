import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Firebase login
      const cred = await signInWithEmailAndPassword(auth, form.email, form.password);

      // ✅ Django backend থেকে JWT token + user info fetch
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        email: cred.user.email,
      });
      localStorage.setItem("accessToken", res.data.access);


      // toast.success(`✅ Welcome ${res.data.user.name} (${res.data.user.role})`);
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      toast.error("❌ Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            🔑 Login
          </h2>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
          <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-700 transition">
            Login
          </button>
        </form>
      </div>
      <div className="hidden md:flex w-1/2 bg-green-200 items-center justify-center"></div>
    </div>
  );
}
