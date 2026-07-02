import React from "react";
import { ArrowRight, ShieldCheck, ScanFace } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-20"
    >
      {/* Background Blur */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div className="text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <ShieldCheck size={18} />
            AI Powered Attendance Solution
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
            Smart Face Recognition
            <span className="block text-blue-600">
              Attendance System
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
            Secure and real-time attendance tracking using AI face recognition,
            anti-spoofing technology, and cloud-based monitoring system.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            
            <a
              href="#features"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition duration-300 flex items-center gap-2 hover:scale-105"
            >
              Get Started
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </a>

            <a
              href="#about"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-7 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl">
            
            {/* Top */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Live Attendance
              </h3>

              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                Active
              </div>
            </div>

            {/* Card Content */}
            <div className="space-y-4">
              
              <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-xl">
                  <ScanFace size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800">
                    Face Recognition
                  </h4>
                  <p className="text-sm text-slate-500">
                    Real-time AI verification
                  </p>
                </div>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-green-500 text-white p-3 rounded-xl">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800">
                    Anti-Spoofing
                  </h4>
                  <p className="text-sm text-slate-500">
                    Advanced security protection
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <h2 className="text-2xl font-bold text-blue-600">99%</h2>
                  <p className="text-sm text-slate-500">Accuracy</p>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                  <h2 className="text-2xl font-bold text-indigo-600">
                    24/7
                  </h2>
                  <p className="text-sm text-slate-500">Monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;