// src/components/CreatedClasses.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Added for sidebar routing context tracking
import axios from "axios";
import { useAuth } from "../../Contexts/AuthProvider";
import AttendanceList from "./AttendanceList";

export default function CreatedClasses() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mobile Panel Toggles
  const [open, setOpen] = useState(false); // Controls the Sidebar navigation view drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Controls the inner data filter alert banner


  const [attendance, setAttendance] = useState([]);
  const [attendanceCount, setAttendanceCount] = useState(0);

  const fetchAttendance = async (classId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/teacher/class-attendance/${classId}/`);
      setAttendance(res.data.students);
      setAttendanceCount(res.data.count);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };



  useEffect(() => {
    if (user?.uid) {
      fetchClasses();
    }
  }, [user]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://127.0.0.1:8000/teacher/created-classes/?firebase_uid=${user.uid}`
      );
      setClasses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Sidebar helper item template
  const navItem = (to, label) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
        pathname === to
          ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20"
          : "text-indigo-300 hover:bg-slate-800 hover:text-white" 
      }`}
      onClick={() => setOpen(false)} // Auto closes drawer menu on navigation hit
    >
      {label}
    </Link>
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 relative flex flex-col">

      {/* 1. MOBILE NAVIGATION TOP BAR (Stacked cleanly right at top-[70px] under main layout) */}
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

      {/* 2. BODY SECTION WRAPPER */}
      <div className="flex flex-1 w-full relative">
        
        {/* Mobile Sidebar Overlay Backdrop layer click-to-close handler */}
        {open && (
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setOpen(false)}
          />
        )}

        {/* 3. RESPONSIVE SIDEBAR ANCHOR LAYOUT */}
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

            {/* Navigation options tree paths */}
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

        {/* 4. CONTENT ZONE AREA (pt-[140px] provides structural clearance buffer across displays) */}
        <main className="flex-1 w-full md:pl-64 min-w-0 transition-all duration-200">
          <div className="pt-[140px] md:pt-24 px-4 pb-12 w-full max-w-7xl mx-auto">
            
            {/* 📱 MOBILE SUB-PANEL CONTROLLER INFORMATION BANNER */}
            <div className="md:hidden w-full bg-slate-800 p-3 rounded-xl text-white flex items-center justify-between mb-4 shadow-sm">
              <span className="font-semibold text-xs text-indigo-400 uppercase tracking-wider">
                Class Panel Directory
              </span>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-[11px] rounded font-medium transition-colors"
              >
                {mobileMenuOpen ? "Hide Filter Details" : "Show Filter Details"}
              </button>
            </div>

            {/* COLLAPSIBLE DATA INFORMATION CARD (Linked contextually to inner toggle state) */}
            <div className={`mb-4 ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-xs sm:text-sm text-indigo-900 flex items-center justify-between shadow-sm">
                <span>Viewing all dynamic virtual directories attached to your teacher account credentials.</span>
                <span className="hidden sm:inline-block bg-indigo-600 text-white font-bold px-2 py-1 rounded-md text-xs">Live Logs</span>
              </div>
            </div>

            {/* MAIN DATA GRID DISPLAY SYSTEM CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              
              {/* HEADER CONTAINER */}
              <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    Created Classes
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage and review schedule logs for attendance tracking templates.</p>
                </div>

                <span className="self-start sm:self-auto inline-flex items-center text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                  Total: {classes.length}
                </span>
              </div>

              {/* TABLE CONTAINER BODY MATRIX */}
              <div className="p-4 sm:p-6">

                {/* VISUAL STATE SYSTEM: RUNNING FETCH LOADER */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-slate-500 animate-pulse">
                      Querying database files...
                    </p>
                  </div>
                )}

                {/* VISUAL STATE SYSTEM: RECORD IS BLANK / EMPTY QUERY */}
                {!loading && classes.length === 0 && (
                  <div className="text-center py-16 max-w-sm mx-auto">
                    <span className="text-3xl block mb-2">📁</span>
                    <p className="text-sm font-medium text-slate-700">No classes found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      You haven't initialized any lecture tracking spaces under this profile route parameter yet.
                    </p>
                  </div>
                )}

                {/* RESPONSIVE TABLE STRUCTURE RENDER WINDOW */}
                {!loading && classes.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left border-collapse min-w-[620px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <th className="py-3.5 px-4">Course</th>
                          <th className="py-3.5 px-4">Code</th>
                          <th className="py-3.5 px-4">Semester</th>
                          <th className="py-3.5 px-4">Date</th>
                          <th className="py-3.5 px-4">Time Windows</th>
                        </tr>
                      </thead>

                      <tbody className="text-slate-700 divide-y divide-slate-100 text-sm">
                        {classes.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50/80 transition-colors duration-150 group"
                          >
                            <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {item.course_name}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                              <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                                {item.course_code}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">Term {item.semester}</td>
                            <td className="py-3.5 px-4 font-medium text-slate-600">{item.date}</td>
                            <td className="py-3.5 px-4 text-xs">
                              <span className="inline-flex items-center gap-1.5 text-indigo-700 bg-indigo-50 font-medium px-2.5 py-1 rounded-md border border-indigo-100">
                                🕒 {item.start_time} - {item.end_time}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <Link
                                to={`/teacher-dashboard/attendance/${item.id}`}

                                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs"
                              >
                                Details
                              </Link>


                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* <AttendanceList attendance={attendance} attendanceCount={attendanceCount} /> */}

              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}