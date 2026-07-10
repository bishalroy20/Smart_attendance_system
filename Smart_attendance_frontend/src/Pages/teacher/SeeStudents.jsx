// src/components/SeeStudents.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Added for responsive route context tracking
import axios from "axios";

export default function SeeStudents() {
  const { pathname } = useLocation();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Mobile Panel Toggles
  const [open, setOpen] = useState(false); // Controls the Slide-out Navigation Drawer

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/teacher/students/");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // FILTER + SEARCH FUNCTIONALITY
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      ? student.name.toLowerCase().includes(search.toLowerCase())
      : false;

    const matchesSemester = semesterFilter
      ? String(student.semester) === String(semesterFilter)
      : true;

    return matchesSearch && matchesSemester;
  });

  // Sidebar helper item rendering template context
  // ✅ FIX: Added {label} inside the Link component and updated colors for dark background contrast
  const navItem = (to, label) => {
    const isActive = pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-white" 
        }`}
        onClick={() => setOpen(false)} // Closes mobile panel on click selection automatically
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 relative flex flex-col">

      {/* 1. MOBILE RESPONSIVE TOP BAR (Perfect stack configuration at top-[70px] beneath global layout) */}
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

      {/* 2. BODY LAYOUT WRAP MODULE CONTAINER */}
      <div className="flex flex-1 w-full relative">
        
        {/* Mobile Backdrop Overlay click-closer block layout */}
        {open && (
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setOpen(false)}
          />
        )}

        {/* 3. CENTRAL SIDEBAR MODULE (Desktop static placement / Mobile overlay block setup) */}
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

            {/* Navigation paths matching portal layout architecture routes */}
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

        {/* 4. MAIN WORKSPACE ZONE CONTAINER (Padded pt-[140px] prevents overlap layout clips) */}
        <main className="flex-1 w-full md:pl-64 min-w-0 transition-all duration-200">
          <div className="pt-[140px] md:pt-24 px-4 pb-12 w-full max-w-7xl mx-auto">
            
            {/* DATA VIEW BOARD COMPONENT CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              
              {/* HEADER DATA ROW CONTAINER MODULE */}
              <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    All Students
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Filter rosters and analyze profiles registered across system segments.</p>
                </div>

                {/* COUNT METRIC BADGE DISPLAY */}
                <div className="self-start sm:self-auto text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100">
                  Total Students: {filteredStudents.length}
                </div>
              </div>

              {/* SEARCH FILTERS CONTROLLER MATRIX ACTION BAR ROW */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/20 flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-64 relative">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="w-full sm:w-48 relative">
                  <select
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
                    value={semesterFilter}
                    onChange={(e) => setSemesterFilter(e.target.value)}
                  >
                    <option value="">All Semesters</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>Semester {num}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* DIRECTORY DISPLAY MATRIX SYSTEM RENDER FIELDS */}
              <div className="p-4 sm:p-6">

                {/* ACTIVE LOAD PROCESS DIALOG WINDOW */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-slate-500 animate-pulse">
                      Parsing system database files...
                    </p>
                  </div>
                )}

                {/* BLANK EMPTY ROSTER STATE */}
                {!loading && filteredStudents.length === 0 && (
                  <div className="text-center py-16 max-w-sm mx-auto">
                    <span className="text-3xl block mb-2">🔍</span>
                    <p className="text-sm font-medium text-slate-700">No student profiles found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      No identities match your input conditions inside this filter index parameter selection.
                    </p>
                  </div>
                )}

                {/* ROSTER GRID DATA TABLE SYSTEM MATRIX */}
                {!loading && filteredStudents.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <th className="py-3.5 px-4">Name</th>
                          <th className="py-3.5 px-4">Email Address</th>
                          <th className="py-3.5 px-4">Semester Placement</th>
                          <th className="py-3.5 px-4">Department Track</th>
                        </tr>
                      </thead>

                      <tbody className="text-slate-700 divide-y divide-slate-100 text-sm">
                        {filteredStudents.map((student) => (
                          <tr
                            key={student.id}
                            className="hover:bg-slate-50/80 transition-colors duration-150 group"
                          >
                            <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {student.name}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                              {student.email}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded">
                                Term {student.semester}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-500">
                              {student.department || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}