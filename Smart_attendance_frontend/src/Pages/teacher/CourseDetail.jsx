// src/components/CourseDetails.jsx
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

export default function CourseDetails() {
  const { courseId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    if (course?.semester) {
      fetchSemesterStudentsAndMarks();
    }
  }, [course]);

  // 🌐 ১. স্টুডেন্ট ডাটা এবং পূর্বে সেভ করা মার্কস একসাথে ব্যাকএন্ড থেকে আনা
  const fetchSemesterStudentsAndMarks = async () => {
    try {
      setLoading(true);
      
      // ক) সেমিস্টারের শিক্ষার্থীদের প্রোফাইল আনা
      const studentRes = await axios.get(`http://127.0.0.1:8000/teacher/students/`);
      const semesterSpecificStudents = studentRes.data.filter(
        (student) => String(student.semester) === String(course.semester)
      );
      setStudents(semesterSpecificStudents);

      // খ) ডাটাবেজে আগে থেকে সেভ করা মার্কস ব্যাকএন্ড থেকে আনা
      const marksRes = await axios.get(`http://127.0.0.1:8000/teacher/course-details/${courseId}/marks/`);
      
      const savedMarks = marksRes.data.marks || {};
      const backendLockStatus = marksRes.data.is_locked || false;
      setIsLocked(backendLockStatus); 

      // গ) শিক্ষার্থীদের আইডির সাথে ব্যাকএন্ডের মার্কস ম্যাপ করা
      const initialMarks = {};
      semesterSpecificStudents.forEach((student) => {
        const studentSaved = savedMarks[student.id] || {};
        initialMarks[student.id] = {
          assignment: studentSaved.assignment ?? "",
          ct1: studentSaved.class_test_1 ?? "", 
          ct2: studentSaved.class_test_2 ?? "", 
          // 🛠️ ফিক্স: অ্যাটেনডেন্স যদি আগে সেভ না থাকে, তবে ডিফল্ট হিসেবে ফাঁকা ("") বা ০ রাখা নিরাপদ
          attendanceMarks: studentSaved.attendance_marks ?? "", 
        };
      });
      
      setMarksData(initialMarks);
    } catch (err) {
      console.error("Error fetching students or marks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkChange = (studentId, field, value) => {
    if (isLocked) return; 
    setMarksData((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value },
    }));
  };

  // 💾 ২. মার্কস ব্যাকএন্ডে সেভ/আপডেট করার ফাংশন
  const handleSaveMarks = async (lockStatus = false) => {
    try {
      const payload = {
        marks: marksData,
        lock_course: lockStatus,
      };
      
      await axios.post(`http://127.0.0.1:8000/teacher/course-details/${courseId}/save/`, payload);
      
      if (lockStatus) {
        setIsLocked(true);
        setShowModal(false);
        alert("কোর্সটি সফলভাবে কমপ্লিট এবং লক করা হয়েছে! আর এডিট করা যাবে না।");
      } else {
        alert("মার্কশিট প্রোগ্রেস সফলভাবে সেভ হয়েছে!");
      }
      
      fetchSemesterStudentsAndMarks();
    } catch (err) {
      console.error("Save marks error:", err);
      alert(err.response?.data?.error || "মার্কস সেভ করতে সমস্যা হয়েছে।");
    }
  };

  // 📊 ৩. এক্সেল ফাইল জেনারেট এবং ডাউনলোড ফাংশন
  const handleDownloadExcel = () => {
    const excelData = students.map((student) => ({
      "Student Name": student.name,
      "Registration ID": student.regId || "N/A", 
      "Email": student.email,
      "Assignment (10)": marksData[student.id]?.assignment || 0,
      "Class Test 1 (15)": marksData[student.id]?.ct1 || 0,
      "Class Test 2 (15)": marksData[student.id]?.ct2 || 0,
      "Attendance Marks (10)": marksData[student.id]?.attendanceMarks || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marksheet");
    XLSX.writeFile(workbook, `${course?.course_id}_Marksheet_${course?.session}.xlsx`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 relative flex flex-col pl-0 md:pl-64">
      <div className="pt-24 px-4 pb-12 w-full max-w-7xl mx-auto space-y-6">
        
        {/* COURSE HEADER BANNER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                {course?.course_id}
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Semester {course?.semester}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">{course?.course_name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Session: {course?.session} | Continuous Assessment</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownloadExcel}
              className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
            >
              📥 Download XLSX
            </button>
            <button
              onClick={() => navigate("/teacher-dashboard/assigned-courses")}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* ROSTER GRID TABLE SYSTEM */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base">Student Assessment Roster</h3>
            
            <div className="flex gap-2">
              <button
                disabled={isLocked}
                onClick={() => handleSaveMarks(false)}
                className={`px-4 py-2 text-white text-xs font-bold rounded-lg shadow-sm transition-all ${isLocked ? "bg-slate-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"}`}
              >
                Save Progress
              </button>
              <button
                disabled={isLocked}
                onClick={() => setShowModal(true)}
                className={`px-4 py-2 text-white text-xs font-bold rounded-lg shadow-sm transition-all ${isLocked ? "bg-red-400/50 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
              >
                {isLocked ? "🔒 Locked & Completed" : "Complete Course"}
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="text-center py-16 text-sm text-slate-500">Loading student profiles...</div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Student Info</th>
                      <th className="py-3.5 px-4 text-center">Assignment (10)</th>
                      <th className="py-3.5 px-4 text-center">Class Test 1 (15)</th>
                      <th className="py-3.5 px-4 text-center">Class Test 2 (15)</th>
                      {/* 🛠️ স্টাইল সামঞ্জস্য করা হয়েছে */}
                      <th className="py-3.5 px-4 text-center">Attendance (10)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 divide-y divide-slate-100 text-sm">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{student.name}</div>
                          <div className="text-[11px] text-indigo-600 font-mono font-semibold">ID: {student.regId || "N/A"}</div>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="number"
                            disabled={isLocked}
                            placeholder="0"
                            className="w-20 px-2 py-1.5 border border-slate-200 rounded-lg text-center focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            value={marksData[student.id]?.assignment || ""}
                            onChange={(e) => handleMarkChange(student.id, "assignment", e.target.value)}
                          />
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="number"
                            disabled={isLocked}
                            placeholder="0"
                            className="w-20 px-2 py-1.5 border border-slate-200 rounded-lg text-center focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            value={marksData[student.id]?.ct1 || ""}
                            onChange={(e) => handleMarkChange(student.id, "ct1", e.target.value)}
                          />
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="number"
                            disabled={isLocked}
                            placeholder="0"
                            className="w-20 px-2 py-1.5 border border-slate-200 rounded-lg text-center focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            value={marksData[student.id]?.ct2 || ""}
                            onChange={(e) => handleMarkChange(student.id, "ct2", e.target.value)}
                          />
                        </td>

                        {/* 🎯 ফিক্সড: স্ট্যাটিক টেক্সটের বদলে এখন এটি টাইপ করা যাবে এমন ইনপুট বক্সে রূপান্তরিত হয়েছে */}
                        <td className="py-3.5 px-4 text-center bg-indigo-50/30">
                          <input
                            type="number"
                            disabled={isLocked}
                            placeholder="0"
                            className="w-20 px-2 py-1.5 border border-indigo-200 rounded-lg text-center font-bold text-indigo-600 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            value={marksData[student.id]?.attendanceMarks || ""}
                            onChange={(e) => handleMarkChange(student.id, "attendanceMarks", e.target.value)}
                          />
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

      {/* 🛑 CONFIRMATION MODAL POP-UP */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-100">
            <div className="text-red-600 text-3xl">⚠️</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Are you absolutely sure?</h3>
              <p className="text-xs text-slate-500 mt-1">
                কোর্সটি একবার "Complete" মার্ক করলে এই সেমিস্টারের মার্কশিটটি চিরতরে লক হয়ে যাবে। আপনি পরবর্তীতে এটি আর কোনোভাবেই এডিট বা পরিবর্তন করতে পারবেন না।
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all"
              >
                Cancel, Go Back
              </button>
              <button
                onClick={() => handleSaveMarks(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
              >
                Yes, Finalize & Lock
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}