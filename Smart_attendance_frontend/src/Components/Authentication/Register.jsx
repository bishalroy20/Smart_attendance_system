import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../Firebase/firebase.init";
import axios from "axios";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Lock,
  GraduationCap,
  Building2,
  IdCard,
  Upload,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    regId: "",
    semester: "",
    empId: "",
    department: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    avatarFile: null,
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  async function uploadToImgBB(file) {
    const apiKey = "aa7cc99fc48cd7b4535b604b6633af61";

    const formData = new FormData();

    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return data.data.url;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm_password) {
      toast.error("❌ Passwords do not match");
      return;
    }

    try {
      const cred =
        await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

      let avatarUrl = "";

      if (form.avatarFile) {
        avatarUrl = await uploadToImgBB(
          form.avatarFile
        );
      }

      await updateProfile(cred.user, {
        displayName: form.name,
      });

      await axios.post(
        "http://127.0.0.1:8000/api/auth/register",
        {
          uid: cred.user.uid,
          ...form,
          avatarUrl,
        }
      );

      toast.success("✅ Registration successful!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10 pt-30">
      
      <ToastContainer />

      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-slate-200">
        
        {/* Left Side */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 flex-col justify-between">
          
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
              Create Your Account 🚀
            </h2>

            <p className="text-blue-100 text-lg leading-relaxed max-w-md">
              Join our AI powered attendance platform with secure authentication and real-time attendance tracking.
            </p>
          </div>

          <div className="relative z-10 text-blue-100">
            Secure • Smart • Fast
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 md:p-10 overflow-y-auto max-h-screen">
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-3">
              Register
            </h2>

            <p className="text-slate-500">
              Fill all information carefully
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            
            {/* Name */}
            <InputField
              icon={<User size={18} />}
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            {/* Registration ID */}
            <InputField
              icon={<IdCard size={18} />}
              name="regId"
              placeholder="Registration ID (Student)"
              onChange={handleChange}
            />

            {/* Semester */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Semester
              </label>

              <div className="relative">
                <GraduationCap
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="semester"
                  onChange={handleChange}
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 bg-slate-50 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">
                    Select Semester
                  </option>

                  {[...Array(8)].map((_, i) => (
                    <option key={i}>
                      {i + 1} 
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Employee ID */}
            <InputField
              icon={<IdCard size={18} />}
              name="empId"
              placeholder="Employee ID (Teacher)"
              onChange={handleChange}
            />

            {/* Department */}
            <InputField
              icon={<Building2 size={18} />}
              name="department"
              placeholder="Department"
              onChange={handleChange}
            />

            {/* Email */}
            <InputField
              icon={<Mail size={18} />}
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            {/* Phone */}
            <InputField
              icon={<Phone size={18} />}
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            {/* Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Upload Avatar
              </label>

              <label className="flex items-center gap-3 border border-dashed border-slate-300 rounded-xl p-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition">
                
                <Upload
                  size={20}
                  className="text-blue-600"
                />

                <span className="text-slate-600">
                  Choose Image
                </span>

                <input
                  name="avatarFile"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Password */}
            <InputField
              icon={<Lock size={18} />}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />

            {/* Confirm Password */}
            <InputField
              icon={<Lock size={18} />}
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300 hover:scale-[1.02] shadow-md hover:shadow-xl"
            >
              Register
              <ArrowRight size={18} />
            </button>

            {/* Login */}
            <p className="text-center text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function InputField({
  icon,
  name,
  type = "text",
  placeholder,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
        {placeholder}
      </label>

      <div className="relative">
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 bg-slate-50 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
}