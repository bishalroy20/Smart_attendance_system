// src/components/TeacherDashboardHome.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function TeacherDashboardHome() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false); // Controls mobile drawer panel

  // 📝 STATIC DATA FOR THE DASHBOARD VIEW
  const stats = {
    totalStudents: 142,
    todayClassesCount: 2,
    totalCourses: 4,
  };

  const todayClasses = [
    { id: 1, name: "Advanced Machine Learning", code: "CSE-4101", time: "09:00 AM - 10:30 AM", room: "Lab 3" },
    { id: 2, name: "Digital Signal Processing", code: "ECE-3205", time: "01:30 PM - 03:00 PM", room: "Room 402" },
  ];

  const latestClasses = [
    { id: 101, name: "Advanced Machine Learning", code: "CSE-4101", date: "June 04, 2026", status: "Completed" },
    { id: 102, name: "Database Management Systems", code: "CSE-3103", date: "June 03, 2026", status: "Completed" },
    { id: 103, name: "Compiler Design", code: "CSE-4103", date: "June 02, 2026", status: "Completed" },
  ];

  // Sidebar link matching helper
  const navItem = (to, label) => {
    const isActive = pathname === to || (to === "/teacher-dashboard" && pathname === "/teacher-dashboard/");
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`}
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 relative flex flex-col">
      
      {/* 1. MOBILE RESPONSIVE TOP BAR */}
      <div className="md:hidden fixed top-[70px] left-0 right-0 h-14 bg-slate-900 border-t border-slate-800 text-white flex items-center justify-between px-4 z-40 shadow-sm">
        <span className="font-semibold text-sm tracking-wide text-indigo-400">
          🕒 Attendance Menu
        </span>
        <button
          type="button"
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs rounded-md font-medium transition-all"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close Panel" : "Open Panel"}
        </button>
      </div>

      {/* 2. BODY LAYOUT CONTEXT WRAPPER */}
      <div className="flex flex-1 w-full relative">
        
        {/* Mobile Backdrop Overlay */}
        {open && (
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setOpen(false)}
          />
        )}

        {/* 3. SIDEBAR MODULE */}
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

            <nav className="space-y-1.5">
              {navItem("/teacher-dashboard/home", "Dashboard")}
             {navItem("/teacher-dashboard/assigned-courses", "Assigned Courses")} {/* নতুন যুক্ত হলো */}
              {navItem("/teacher-dashboard/create-class", "Create Class")}
              {navItem("/teacher-dashboard/created-class", "Created Class")}
              {navItem("/teacher-dashboard/course-summary", "Course Summary")}
              {navItem("/teacher-dashboard/students", "See Students")}
            </nav>
          </div>

          <div className="text-[11px] text-slate-500 text-center font-mono">
            Management Portal v2.0
          </div>
        </aside>

        {/* 4. MAIN WORKSPACE ZONE CONTAINER */}
        <main className="flex-1 w-full md:pl-64 min-w-0 transition-all duration-200">
          <div className="pt-[140px] md:pt-24 px-4 pb-12 w-full max-w-7xl mx-auto space-y-6">
            
            {/* WELCOME BANNER HEADER */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                Welcome Back, Instructor
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Here is your overview structure for today's session checkpoints.
              </p>
            </div>

            {/* 📊 STATS BOX COUNTERS ROW GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Box 1: Total Students */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between group hover:border-indigo-200 transition-all">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Enrolled Students</span>
                  <span className="text-3xl font-bold text-slate-800 block group-hover:text-indigo-600 transition-colors">{stats.totalStudents}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold">
                  👥
                </div>
              </div>

              {/* Box 2: Today's Classes */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between group hover:border-indigo-200 transition-all">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Classes Scheduled Today</span>
                  <span className="text-3xl font-bold text-slate-800 block group-hover:text-indigo-600 transition-colors">{stats.todayClassesCount} Courses</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
                  📚
                </div>
              </div>

              {/* Box 3: Total Active Courses */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between group hover:border-indigo-200 transition-all sm:col-span-2 lg:col-span-1">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">Total Assigned Tracks</span>
                  <span className="text-3xl font-bold text-slate-800 block group-hover:text-indigo-600 transition-colors">{stats.totalCourses} Departments</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
                  🏛️
                </div>
              </div>

            </div>

            {/* LOWER CONTENT MATRIX TRACK (Split Today's Agenda vs Recent Classes Logs) */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Left Segment Matrix: Today's Class Cards List (Span 3) */}
              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Today's Class Lineup</h3>
                  <p className="text-xs text-slate-400">Scheduled active tracks registered under runtime parameters.</p>
                </div>

                <div className="space-y-3">
                  {todayClasses.map((cls) => (
                    <div key={cls.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-200 transition-all group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                            {cls.code}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{cls.room}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                          {cls.name}
                        </h4>
                      </div>
                      <div className="text-xs text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs self-start sm:self-auto">
                        🕒 {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Segment Matrix: Latest 3 Class Activity Log Table Tracker (Span 2) */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Latest 3 Classes Log</h3>
                    <p className="text-xs text-slate-400">Most recent structural sessions created inside repository index.</p>
                  </div>

                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                    {latestClasses.map((item) => (
                      <div key={item.id} className="p-3.5 bg-white flex items-center justify-between text-xs hover:bg-slate-50/50 transition-colors">
                        <div className="space-y-0.5 min-w-0 pr-2">
                          <span className="font-bold text-slate-700 block truncate">{item.name}</span>
                          <span className="text-[10px] text-slate-400 block font-medium">{item.date} • {item.code}</span>
                        </div>
                        <span className="px-2 py-0.5 font-semibold bg-emerald-50 border border-emerald-100 text-emerald-700 rounded text-[10px]">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link 
                  to="/teacher-dashboard/created-class" 
                  className="w-full text-center py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-indigo-600 font-semibold text-xs rounded-lg transition-all block mt-4"
                >
                  View Full Course Log Registry →
                </Link>
              </div>

            </div>

          </div>
        </main>

      </div>
    </div>
  );
}