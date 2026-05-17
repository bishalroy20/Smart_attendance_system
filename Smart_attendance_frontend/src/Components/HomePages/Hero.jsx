import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center"
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Smart Attendance System
      </h1>
      <p className="text-lg md:text-2xl mb-8 max-w-2xl">
        AI powered face recognition & anti-spoofing for secure, real-time attendance.
      </p>
      <div className="flex gap-4">
        <a
          href="#features"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Get Started
        </a>
        <a
          href="#about"
          className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Hero;
