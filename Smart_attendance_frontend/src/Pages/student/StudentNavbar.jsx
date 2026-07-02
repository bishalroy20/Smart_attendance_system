// src/pages/student/StudentNavbar.jsx

import { useAuth } from "../../Contexts/AuthProvider";

export default function StudentNavbar() {
  const { profile } = useAuth();

  return (
    <div className="mt-14 sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200 shadow-sm px-6 sm:px-10 py-4 flex justify-between items-center">

      {/* Left Section */}
      <div className="space-y-0.5">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
          Student Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Smart Attendance System
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* User Info */}
        <div className="text-right hidden sm:block">
          <h3 className="font-semibold text-gray-800 leading-tight">
            {profile?.name || "Student"}
          </h3>
          <p className="text-xs text-gray-500">
            Semester {profile?.semester || "-"}
          </p>
        </div>

        {/* Avatar */}
        <div className="relative">
          <div className="w-11 h-11 rounded-full ring-2 ring-primary ring-offset-2 overflow-hidden hover:scale-105 transition">
            <img
              src="https://i.ibb.co/4pDNDk1/avatar.png"
              alt="avatar"
              className="object-cover w-full h-full"
            />
          </div>

          {/* online dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

      </div>
    </div>
  );
}