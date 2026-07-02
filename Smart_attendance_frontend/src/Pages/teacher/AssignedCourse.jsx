// src/components/AssignedCourses.jsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthProvider";

export default function AssignedCourses() {
  const { user } = useAuth(); // ফায়ারবেস লগইন করা ইউজারের ডাটা
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // মোবাইল সাইডবার টগল

  useEffect(() => {
    if (user?.uid) {
      fetchAssignedCourses();
    }
  }, [user]);

  // 🌐 ব্যাকএন্ড থেকে টিচারের অ্যাসাইন করা কোর্সগুলো আনা হচ্ছে
  const fetchAssignedCourses = async () => {
    try {
      setLoading(true);
      // আমরা ব্যাকএন্ডে টিচারের firebase_uid পাঠিয়ে দিচ্ছি
      const res = await axios.get(
        `http://127.0.0.1:8000/teacher/teacher/assigned-courses/?firebase_uid=${user.uid}`
      );
      setCourses(res.data);
    } catch (err) {
      console.error("Course fetch error:", err);
    } finally {
      setLoading(false);
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
    <div className="w-full min-h-screen bg-slate-50 relative flex flex-col">
      {/* মোবাইল টপ বার */}
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

      <div className="flex flex-1 w-full relative">
        {open && (
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* সাইডবার */}
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
              {navItem("/teacher-dashboard/students", "See Students")}
            </nav>
          </div>
          <div className="text-[11px] text-slate-500 text-center font-mono">
            Management Portal v2.0
          </div>
        </aside>

        {/* মেইন ওয়ার্কস্পেস */}
        <main className="flex-1 w-full md:pl-64 min-w-0 transition-all duration-200">
          <div className="pt-[140px] md:pt-24 px-4 pb-12 w-full max-w-7xl mx-auto space-y-6">
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                My Assigned Courses
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Select a course to view the students roster and manage continuous assessments.
              </p>
            </div>

            {/* লোডিং স্টেট */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-9 h-9 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-sm text-slate-500">Loading assigned directories...</p>
              </div>
            )}

            {/* কোনো কোর্স না থাকলে */}
            {!loading && courses.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto shadow-xs">
                <span className="text-4xl block mb-3">📚</span>
                <h3 className="text-base font-bold text-slate-700">No Courses Assigned</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Contact the system administrator to assign courses to your profile.
                </p>
              </div>
            )}

            {/* 🗂️ কোর্সের তালিকা (Grid Layout) */}
            {!loading && courses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md">
                          {course.course_id}
                        </span>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          Semester {course.semester}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {course.course_name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">
                          Session: {course.session}
                        </p>
                      </div>
                    </div>

                    {/* 🔘 DETAILS BUTTON */}
                    <div className="pt-5 mt-4 border-t border-slate-100">
                      <button
                        onClick={() => navigate(`/teacher-dashboard/course-details/${course.id}`, { state: { course } })}
                        className="w-full py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white font-semibold text-xs rounded-lg transition-all duration-150 text-center flex items-center justify-center gap-1.5"
                      >
                        View Marksheet & Students ➔
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}