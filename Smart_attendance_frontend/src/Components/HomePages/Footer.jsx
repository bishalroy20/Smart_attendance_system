import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 ">
      <div className="container mx-auto text-center">
        <p>© 2026 Smart Attendance System. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          <a href="mailto:info@smartattendance.com" className="hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
