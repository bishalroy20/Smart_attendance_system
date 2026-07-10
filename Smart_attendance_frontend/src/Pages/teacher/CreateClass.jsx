// src/components/CreateClass.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import axios from "axios";
import { useAuth } from "../../Contexts/AuthProvider";

export default function CreateClass() {
  const { user } = useAuth();
  const { pathname } = useLocation(); 
  const [open, setOpen] = useState(false); 
  
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [fetchingCourses, setFetchingCourses] = useState(true);

  const [formData, setFormData] = useState({
    course_name: "",
    course_code: "",
    semester: "",
    date: "",
    start_time: "",
    end_time: "",
    password: "",
  });

  useEffect(() => {
    if (user?.uid) {
      fetchAssignedCourses();
    }
  }, [user]);

  const fetchAssignedCourses = async () => {
    try {
      setFetchingCourses(true);
      // React ফ্রন্টএন্ডে রিকোয়েস্ট পাঠানোর নিয়ম:
       const res = await axios.get(
        `http://127.0.0.1:8000/teacher/teacher/assigned-courses/?firebase_uid=${user.uid}`
      );
      setAssignedCourses(res.data || []);
    } catch (err) {
      console.error("Error fetching assigned courses:", err);
    } finally {
      setFetchingCourses(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const selectedId = e.target.value;
    
    if (!selectedId) {
      setFormData({
        ...formData,
        course_name: "",
        course_code: "",
        semester: "",
      });
      return;
    }

    const targetCourse = assignedCourses.find(c => String(c.id) === String(selectedId));
    
    if (targetCourse) {
      setFormData({
        ...formData,
        course_name: targetCourse.course_name || targetCourse.name || "",
        // ব্যাকএন্ডের কি (Key) অবজেক্ট সেফগার্ড
        course_code: targetCourse.course_code || targetCourse.course_id || "",
        semester: targetCourse.semester || "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.course_name || !formData.course_code) {
      alert("Please select a course from the dropdown first!");
      return;
    }

    try {
      const payload = {
        ...formData,
        semester: parseInt(formData.semester) || 0,
        start_time: formData.start_time + ":00",
        end_time: formData.end_time + ":00",
        firebase_uid: user.uid,
      };

      await axios.post(
        "http://127.0.0.1:8000/teacher/create-class/",
        payload
      );

      alert("Class Created Successfully!");

      setFormData({
        course_name: "",
        course_code: "",
        semester: "",
        date: "",
        start_time: "",
        end_time: "",
        password: "",
      });
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to create class");
    }
  };

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
      {label}
    </Link>
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 relative flex flex-col">

      {/* MOBILE TOP BAR */}
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

        {/* SIDEBAR */}
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
              {navItem("/teacher-dashboard/assigned-courses", "Assigned Courses")}
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

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 w-full md:pl-64 min-w-0 transition-all duration-200">
          <div className="pt-[140px] md:pt-24 px-4 pb-12 flex justify-center items-center w-full">
            
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
              
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                  Create New Class
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Select your assigned course from the dropdown below to schedule the class.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
              >
                {/* 🎯 মেইন ড্রপডাউন */}
                <div className="md:col-span-2 flex flex-col w-full group">
                  <label className="text-xs font-semibold text-indigo-600 mb-1.5 tracking-wide uppercase">
                    Select Course
                  </label>
                  <select
                    onChange={handleCourseChange}
                    defaultValue=""
                    disabled={fetchingCourses}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all duration-150 font-medium"
                  >
                    <option value="">-- {fetchingCourses ? "Loading Assigned Courses..." : "Choose Assigned Course"} --</option>
                    {assignedCourses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.course_name || course.name} ({course.course_code || course.course_id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 📝 কোর্স কোড / আইডির জন্য ডেডিকেটেড ভিজ্যুয়াল ফিল্ড */}
                <Input
                  label="Course Code / ID"
                  name="course_code"
                  placeholder="No course selected"
                  value={formData.course_code}
                  disabled={true}
                />

                {/* 📝 সেমিস্টারের জন্য ডেডিকেটেড ভিজ্যুয়াল ফিল্ড */}
                <Input
                  label="Semester"
                  name="semester"
                  placeholder="No course selected"
                  value={formData.semester ? `${formData.semester} Semester` : ""}
                  disabled={true}
                />

                <Input
                  label="Class Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

                <Input
                  label="Start Time"
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                />

                <Input
                  label="End Time"
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                />

                <div className="md:col-span-2">
                  <Input
                    label="Attendance Verification Password"
                    name="password"
                    placeholder="Secure entry dynamic phrase or PIN"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 active:scale-[0.99] transition-all duration-150"
                  >
                    Create & Publish Class
                  </button>
                </div>

              </form>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

function Input({ name, value, onChange, placeholder, label, type = "text", disabled = false }) {
  return (
    <div className="flex flex-col w-full group">
      {label && (
        <label className="text-xs font-semibold text-slate-600 mb-1.5 tracking-wide uppercase transition-colors group-focus-within:text-indigo-600">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-150 ${
          disabled 
            ? "bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed" 
            : "bg-slate-50/50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        }`}
      />
    </div>
  );
}