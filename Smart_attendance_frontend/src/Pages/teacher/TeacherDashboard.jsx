// src/layouts/AttendanceDashboardLayout.jsx
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function TeacherDashboard() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Helper to render responsive nav items cleanly
  // FIX: Applied the visible text colors directly inside the Link element
  const navItem = (to, label) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
        pathname === to
          ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20"
          : "text-indigo-300 hover:bg-slate-800 hover:text-white" 
      }`}
      onClick={() => setOpen(false)}
    >
      {label} {/* FIX: Re-added the missing text label string */}
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* 1. MOBILE TOP BAR (Only visible on mobile/tablet to trigger sidebar toggle) */}
      <div className="md:hidden fixed top-[70px] left-0 right-0 h-14 bg-slate-900 border-t border-slate-800 text-white flex items-center justify-between px-4 z-40 shadow-sm">
        <span className="font-semibold text-sm tracking-wide text-indigo-400">
          🕒 Attendance Menu
        </span>
        <button
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs rounded-md font-medium transition-colors"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close Panel" : "Open Panel"}
        </button>
      </div>

      {/* 2. MAIN LAYOUT WRAPPER */}
      <div className="flex flex-1 w-full relative">
        
        {/* Mobile Sidebar Overlay Backdrop */}
        {open && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setOpen(false)}
          />
        )}

        {/* 3. SIDEBAR (Sticky on desktop, slide-out drawer on mobile) */}
        <aside
          className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white pt-24 pb-6 px-4 flex flex-col justify-between z-45 md:z-30 transform transition-transform duration-200 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-6">
            <div className="px-2 hidden md:block border-b border-slate-800 pb-4">
              <span className="text-lg font-bold tracking-wider text-indigo-400 block">
                🕒 SMART ATTENDANCE
              </span>
            </div>

            {/* Navigation Options */}
            <nav className="space-y-1.5 ">
              {navItem("/teacher-dashboard/home", "Dashboard")}
              {navItem("/teacher-dashboard/assigned-courses", "Assigned Courses")} {/* নতুন যুক্ত হলো */}

              {navItem("/teacher-dashboard/create-class", "Create Class")}
              {navItem("/teacher-dashboard/created-class", "Created Class")}
              {navItem("/teacher-dashboard/students", "See Students")}
            </nav>
          </div>

          {/* Sidebar Footer context */}
          <div className="text-[11px] text-slate-500 text-center font-mono">
            Management Portal v2.0
          </div>
        </aside>

        {/* 4. MAIN CONTENT CONTAINER (Pushed right on desktop, padded from your fixed navbar) */}
        <main className="flex-1 w-full md:pl-64 min-w-0 transition-all duration-200">
          {/* pt-20 accommodates your fixed top navbar. 
            pt-[136px] on mobile accommodates both your navbar AND the mobile menu bar.
          */}
          <div className="pt-[136px] md:pt-20 px-4 py-6 md:p-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-6 min-h-[calc(100vh-12rem)]">
              {/* Your child components (Dashboard, Create Class, etc.) inject right here */}
              <Outlet />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}