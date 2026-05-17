import React from "react";

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl font-bold mb-6">About Our Project</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Traditional attendance systems are inefficient and vulnerable to proxy
          attendance. Our Smart Attendance System leverages Artificial
          Intelligence, Face Recognition, and Anti-Spoofing techniques to
          automate attendance securely and reliably. It reduces manual workload,
          improves accuracy, and ensures real-time record management for
          institutions.
        </p>
      </div>
    </section>
  );
};

export default About;
