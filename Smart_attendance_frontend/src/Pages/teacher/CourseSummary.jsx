import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";


export default function CourseSummary() {
  const [summary, setSummary] = useState([]);
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchSummary();
  }, []);

//   const fetchSummary = async () => {
//     try {
//       const auth = getAuth();
//       const res = await axios.get("http://127.0.0.1:8000/teacher/course_class_summary/", {
//         params: { firebase_uid: auth.currentUser.uid }
//       });
//       setSummary(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };



    const fetchSummary = async () => {
        try {
            const auth = getAuth();
            const res = await axios.get(
            "http://127.0.0.1:8000/teacher/course_class_summary/",
            {
                params: {
                firebase_uid: auth.currentUser.uid,
                },
            }
            );

            setSummary(res.data);
        } catch (err) {
            console.error(err);
        }
        };




  // সাইডবার নেভিগেশন হেল্পার
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
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    );
  };



  return (
    <div className="p-6 bg-slate-50 min-h-screen">
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
    <main className="flex-1 w-full md:pl-64 min-w-0 transition-all duration-200">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        Course Class Summary
      </h2>

      {/* <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Session</th>
              <th>Total Classes</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((s, idx) => (
              <tr key={idx} className="hover:bg-indigo-50">
                <td className="font-mono text-indigo-700 font-semibold">{s.course_code}</td>
                <td>{s.course_name}</td>
                <td>{s.session}</td>
                <td className="text-purple-600 font-bold">{s.total_classes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

       <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        My Assigned Course Class Summary
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Session</th>
              <th>Total Classes</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((s, idx) => (
              <tr key={idx} className="hover:bg-indigo-50">
                <td className="font-mono text-indigo-700 font-semibold">{s.course_code}</td>
                <td>{s.course_name}</td>
                <td>{s.session}</td>
                <td className="text-purple-600 font-bold">{s.total_classes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

      </main>
    </div>
    </div>
  );
}
