// src/components/Admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AssignedCoursesList from "./AssignedCoursesList";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("teachers"); 

  // ডাটা স্টেট
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  
  // কোর্স অ্যাসাইনমেন্ট ফর্ম স্টেট
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState("");

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState("");

  const [fromSemester, setFromSemester] = useState("");
  const [toSemester, setToSemester] = useState("");

  



  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const teachersRes = await axios.get("http://127.0.0.1:8000/teacher/teachers/");
      const studentsRes = await axios.get("http://127.0.0.1:8000/teacher/students/");
      
      // 🛠️ ফিক্স: সরাসরি অ্যারে না এসে অবজেক্ট আকারে ডেটা আসলেও যেন ক্র্যাশ না করে
      const teachersData = Array.isArray(teachersRes.data) 
        ? teachersRes.data 
        : (teachersRes.data.teachers || teachersRes.data.data || []);
        
      const studentsData = Array.isArray(studentsRes.data) 
        ? studentsRes.data 
        : (studentsRes.data.students || studentsRes.data.data || []);

      setTeachers(teachersData);
      setStudents(studentsData);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setTeachers([]);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchInitialData();
  }, []);

  

  const handleAssignCourse = async (e) => {
    e.preventDefault();

    if (!selectedTeacher || !courseName || !courseCode || !semester) {
        toast.error("Please fill all assignment fields!");
        return;
    }

    try {
        const payload = {
            course_id: courseCode,
            course_name: courseName,
            session: session,
            semester: parseInt(semester),
            teacher: selectedTeacher,
        };

        await axios.post(
            "http://127.0.0.1:8000/teacher/assign-course/",
            payload
        );

        toast.success(`${courseName} assigned successfully!`);

        // Reset form
        setSelectedTeacher("");
        setCourseName("");
        setCourseCode("");
        setSemester("");
    } catch (err) {
        if (err.response?.data?.error) {
            toast.error(err.response.data.error);
        } else {
            toast.error(err.error );
        }

        console.error(err.response?.data);
    }
};




const promoteToTeacher = async (id) => {
  try {
    await axios.post(`http://127.0.0.1:8000/teacher/students/${id}/promote/`);
    toast.success("Student promoted to Teacher!");
    // Optionally refetch students list
    fetchStudents();
  } catch (err) {
    // toast.error("Failed to promote student.");
    console.error(err.response?.data);
  }
};



  const promoteSemester = async () => {
    if (!fromSemester || !toSemester) {
      return alert("Please select both semesters!");
    }
    try {
      await axios.post("http://127.0.0.1:8000/student/promote-semester/", {
        from_semester: fromSemester,
        to_semester: toSemester,
      });
      alert(`All students from ${fromSemester} promoted to ${toSemester}!`);
      fetchStudents(); // ✅ refresh student list
    } catch (err) {
      console.error(err);
      // alert("Failed to promote students");
    }
  };




  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex">
      <ToastContainer />
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between fixed left-0 top-0 z-30">
        <div className="space-y-8">
          <div className="px-2 border-b border-slate-800 pb-4 pt-4">
            <span className="text-lg font-bold tracking-wider text-indigo-400 block">🛡️ ADMIN CONTROL</span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("teachers")}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                activeTab === "teachers" ? "bg-indigo-600 text-white shadow-md" : "text-indigo-300 hover:bg-slate-800"
              }`}
            >
              👨‍🏫 All Teachers
            </button>

            <button
              onClick={() => setActiveTab("students")}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                activeTab === "students" ? "bg-indigo-600 text-white shadow-md" : "text-indigo-300 hover:bg-slate-800"
              }`}
            >
              👨‍🎓 All Students
            </button>

            <button
              onClick={() => setActiveTab("assign")}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                activeTab === "assign" ? "bg-indigo-600 text-white shadow-md" : "text-indigo-300 hover:bg-slate-800"
              }`}
            >
              📚 Assign Course
            </button>
            <button
              onClick={() => setActiveTab("assigned-courses")}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
                activeTab === "assigned-courses" ? "bg-indigo-600 text-white shadow-md" : "text-indigo-300 hover:bg-slate-800"
              }`}
            >
              📚 Assigned CourseList
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2.5 bg-red-600/20 hover:bg-red-600 hover:text-white text-red-400 rounded-lg text-sm font-medium transition-all"
        >
          Logout Admin
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pl-64 transition-all duration-200">
        <div className="p-8 md:p-12 max-w-5xl mx-auto">
          
          {loading ? (
            <div className="text-center py-20 text-slate-500 font-medium">Syncing database records...</div>
          ) : (
            <>
              {/* TAB 1: TEACHER LIST */}
              {activeTab === "teachers" && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Teachers Directory</h2>
                    <p className="text-sm text-slate-500">Registered faculty members in the attendance system.</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Phone</th>
                          <th className="px-6 py-4">Department</th>
                          {/* <th className="px-6 py-4"></th> */}
                          <th className="px-6 py-4">Firebase UID / ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                        {!Array.isArray(teachers) || teachers.length === 0 ? (
                          <tr><td colSpan="3" className="px-6 py-4 text-center text-slate-400">No teachers found.</td></tr>
                        ) : (
                          teachers.map((t) => (
                            <tr key={t.id || t.firebase_uid} className="hover:bg-slate-50">
                              <td className="px-6 py-4 font-medium text-slate-900">{t.name || t.username}</td>
                              <td className="px-6 py-4">{t.email}</td>
                              <td className="px-6 py-4">{t.phone}</td>
                              <td className="px-6 py-4">{t.department}</td>
                              <td className="px-6 py-4 font-mono text-xs text-indigo-600">{t.firebase_uid || 'id'}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}




              {/* TAB 2: STUDENT LIST*/}
              {activeTab === "students" && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Students Directory</h2>
                    <p className="text-sm text-slate-500">All registered students profile logs.</p>
                  </div>

                  {/* Bulk Semester Promotion */}
                <div className="flex items-center gap-4 mb-6">
                  <select
                    className="select select-bordered w-1/3"
                    value={fromSemester}
                    onChange={(e) => setFromSemester(e.target.value)}
                  >
                    <option value="">From Semester</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <select
                    className="select select-bordered w-1/3"
                    value={toSemester}
                    onChange={(e) => setToSemester(e.target.value)}
                  >
                    <option value="">To Semester</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={promoteSemester}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Promote Students
                  </button>
                </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
    <th className="px-6 py-4">Name</th>
    <th className="px-6 py-4">Email</th>
    <th className="px-6 py-4">Phone</th>
    <th className="px-6 py-4">Department</th>
    <th className="px-6 py-4">Roll / Reg No</th>
    <th className="px-6 py-4">Session</th>
    <th className="px-6 py-4">Semester</th>
    <th className="px-6 py-4">Action</th>
  </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                          {students.map((s) => (
                            <tr key={s.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 font-medium text-slate-900">{s.name || s.username}</td>
                              <td className="px-6 py-4">{s.email}</td>
                              <td className="px-6 py-4">{s.phone}</td>
                              <td className="px-6 py-4">{s.department}</td>
                              <td className="px-6 py-4 font-mono">{s.regId}</td>
                              <td className="px-6 py-4">
                              {`${s.regId.slice(0, 4)}-${String(Number(s.regId.slice(0, 4)) + 1).slice(-2)}`}
                            </td>
                              <td className="px-6 py-4">{s.semester ? `${s.semester} Semester` : "-"}</td>
                              <td className="px-6 py-4">
                                {s.role === "student" && (
                                  <button
                                    onClick={() => promoteToTeacher(s.id)}
                                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs"
                                  >
                                    Make Teacher
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>



                    </table>

                  
                  </div>
                </div>
              )} 



              {/* TAB 3: ASSIGN COURSE FORM */}
              {activeTab === "assign" && (
                //   <AddCourseForm/>
                <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Course Assignment Setup</h2>
                    <p className="text-sm text-slate-500">Map and assign academic courses to corresponding lecturers.</p>
                  </div>

                  <form onSubmit={handleAssignCourse} className="space-y-5">
                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-slate-600 mb-1.5 uppercase">Select Faculty Member</label>
                      <select
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 font-medium focus:outline-none"
                      >
                        <option value="">-- Choose Lecturer --</option>
                        {Array.isArray(teachers) && teachers.map((t) => (
                          <option key={t.id || t.firebase_uid} value={t.firebase_uid || t.id}>
                            {t.name || t.username}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-col">
                        <label className="text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                          Academic Session
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 2021-22"
                          value={session}
                          onChange={(e) => setSession(e.target.value)}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50"
                        />
                      </div>

                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-slate-600 mb-1.5 uppercase">Course Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Compiler Design"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-slate-600 mb-1.5 uppercase">Course Code</label>
                      <input
                        type="text"
                        placeholder="e.g., CSE-3201"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs font-semibold text-slate-600 mb-1.5 uppercase">Target Semester</label>
                      <input
                        type="number"
                        placeholder="e.g., 6"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-150 mt-4"
                    >
                      Process Assignment Map
                    </button>
                  </form>
                </div>
              )}




              {/* TAB 4: ASSIGNED COURSE FORM */}
              {activeTab === "assigned-courses" && (
                <AssignedCoursesList />
              )}
            
            
            </>
          )}

        </div>
      </main>

    </div>
  );
}