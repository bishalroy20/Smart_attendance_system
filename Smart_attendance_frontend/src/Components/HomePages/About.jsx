import React from "react";
import { ShieldCheck, ScanFace, Database } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-slate-100 to-slate-200 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <p className="text-blue-600 font-semibold uppercase tracking-wider mb-3">
            About Project
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
            Smart Attendance With
            <span className="text-blue-600 block">
              AI Technology
            </span>
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Traditional attendance systems are inefficient and vulnerable to
            proxy attendance. Our Smart Attendance System leverages Artificial
            Intelligence, Face Recognition, and Anti-Spoofing techniques to
            automate attendance securely and reliably.
          </p>

          <p className="text-slate-600 text-lg leading-relaxed">
            It reduces manual workload, improves accuracy, and ensures
            real-time attendance management for schools, universities, and
            organizations.
          </p>
        </div>

        {/* Right Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 border border-slate-100">
            <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
              <ScanFace size={28} />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Face Recognition
            </h3>

            <p className="text-slate-600">
              Advanced AI detects and verifies faces instantly with high
              accuracy.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 border border-slate-100">
            <div className="bg-green-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
              <ShieldCheck size={28} />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Secure System
            </h3>

            <p className="text-slate-600">
              Anti-spoofing protection prevents fake attendance attempts.
            </p>
          </div>

          <div className="sm:col-span-2 bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 border border-slate-100">
            <div className="bg-purple-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
              <Database size={28} />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Smart Database Management
            </h3>

            <p className="text-slate-600">
              Attendance data is stored securely with PostgreSQL and optimized
              for real-time search and reporting.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;