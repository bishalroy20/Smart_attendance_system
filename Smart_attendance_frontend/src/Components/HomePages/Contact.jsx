import React, { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-white to-slate-100 px-4 mt-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div>
          <p className="text-blue-600 font-semibold uppercase tracking-wider mb-3">
            Contact Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Let’s Talk About
            <span className="text-blue-600 block">
              Your Project
            </span>
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed">
            Have questions about our Smart Attendance System? Send us a
            message and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-11 input input-bordered rounded-xl focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 input input-bordered rounded-xl focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Message
              </label>

              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-4 top-5 text-slate-400"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  className="w-full pl-11 textarea textarea-bordered rounded-xl focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.02] shadow-md hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;