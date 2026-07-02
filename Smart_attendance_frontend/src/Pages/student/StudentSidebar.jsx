// src/pages/student/StudentSidebar.jsx

import {
  LayoutDashboard,
  BookOpen,
  UserCircle,
  ClipboardList,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function StudentSidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/student-dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    // {
    //   name: "My Classes",
    //   path: "/student/classes",
    //   icon: <BookOpen size={20} />,
    // },
    {
      name: "Attendance",
      path: "/student/attendance",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserCircle size={20} />,
    },
  ];

  return (
    <div className="mt-15 w-[270px] min-h-screen bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800 text-white flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-indigo-500">
        <h1 className="text-2xl font-extrabold tracking-wide">
          Smart Attendance
        </h1>
        <p className="text-sm text-indigo-200 mt-1">Student Panel</p>
      </div>

      {/* Menu */}
      <ul className="flex-1 p-4 space-y-2">
        {menus.map((menu, index) => (
          <li key={index}>
            <Link
              to={menu.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === menu.path
                  ? "bg-white text-indigo-700 font-semibold shadow-sm"
                  : "hover:bg-indigo-500 hover:text-white"
              }`}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-500 text-xs text-indigo-200">
        © 2026 Smart Attendance
      </div>
    </div>
  );
}
