// src/pages/teacher/Sidebar.jsx

import {
  LayoutDashboard,
  PlusSquare,
  BookOpen,
  Users,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/teacher-dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Create Class",
      path: "/teacher-dashboard/create-class",
      icon: <PlusSquare size={20} />,
    },
    {
      name: "Created Classes",
      path: "/teacher-dashboard/created-class",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Students",
      path: "/teacher-dashboard/students",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="w-[270px] min-h-screen bg-base-100 border-r border-base-300 flex flex-col justify-between mt-20">

      <div>

        <div className="p-6 border-b border-base-300">

          <h1 className="text-2xl font-bold text-primary">
            Smart Attendance
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Teacher Panel
          </p>

        </div>

        <ul className="menu p-4 gap-2">

          {menus.map((menu, index) => (

            <li key={index}>

              <Link
                to={menu.path}
                className={`flex items-center gap-3 rounded-xl ${
                  location.pathname === menu.path
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                {menu.icon}
                {menu.name}
              </Link>

            </li>

          ))}

        </ul>

      </div>

      <div className="p-4">

        <button className="btn btn-error btn-outline w-full">
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}