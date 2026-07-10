import { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";
import { getAuth } from "firebase/auth";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    }, []);

    const fetchCourses = async () => {
    try {
        const auth = getAuth();
        const res = await axios.post("http://127.0.0.1:8000/student/courses/", {
        firebase_uid: auth.currentUser.uid,
        });
        setCourses(res.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
    }
    };


  return (
    <div className="flex bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <StudentSidebar />
      <div className="flex-1">
        <StudentNavbar />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">
            My Semester Courses
          </h2>

          {/* Course Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="table w-full">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Session</th>
                  <th>Semester</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50 transition-colors">
                    <td>{c.course_id}</td>
                    <td className="font-semibold text-indigo-700">{c.course_name}</td>
                    <td>{c.session}</td>
                    <td>{c.semester}</td>
                    <td>{c.teacher_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
