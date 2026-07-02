import { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";
import { getAuth } from "firebase/auth";

export default function AttendanceHistory() {
  const [attendances, setAttendances] = useState([]);
  const [filterCourseName, setFilterCourseName] = useState("");
  const [filterCourseCode, setFilterCourseCode] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/student/attendance-history/",
        { firebase_uid: auth.currentUser.uid }
      );

      setAttendances(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered data
  const filteredAttendances = attendances.filter((att) => {
    return (
      (filterCourseName ? att.course_name === filterCourseName : true) &&
      (filterCourseCode ? att.course_code === filterCourseCode : true)
    );
  });

  return (
    <div className="flex bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <StudentSidebar />
      <div className="flex-1">
        <StudentNavbar />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">
            My Attendance History
          </h2>

          {/* Filter Form */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              className="select select-bordered w-full md:w-1/3"
              value={filterCourseName}
              onChange={(e) => setFilterCourseName(e.target.value)}
            >
              <option value="">All Course Names</option>
              {[...new Set(attendances.map((att) => att.course_name))].map(
                (course, idx) => (
                  <option key={idx} value={course}>
                    {course}
                  </option>
                )
              )}
            </select>

            <select
              className="select select-bordered w-full md:w-1/3"
              value={filterCourseCode}
              onChange={(e) => setFilterCourseCode(e.target.value)}
            >
              <option value="">All Course Codes</option>
              {[...new Set(attendances.map((att) => att.course_code))].map(
                (code, idx) => (
                  <option key={idx} value={code}>
                    {code}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Filtered Count */}
          <div className="mb-4">
            <p className="text-lg font-semibold text-indigo-700">
              Total Filtered Attendance:{" "}
              <span className="text-purple-600">{filteredAttendances.length}</span>
            </p>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="table w-full">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Session</th>
                  <th>Semester</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Photo</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendances.map((att, index) => (
                  <tr key={index} className="hover:bg-indigo-50 transition-colors">
                    <td className="font-semibold text-indigo-700">{att.course_name}</td>
                    <td>{att.course_code}</td>
                    <td>{att.session}</td>
                    <td>{att.semester}</td>
                    <td>{att.date}</td>
                    <td>{att.start_time} - {att.end_time}</td>
                    <td>
                      {att.image_url && (
                        <a href={att.image_url} target="_blank" rel="noreferrer">
                          <img
                            src={att.image_url}
                            alt="Attendance"
                            className="w-12 h-12 rounded-lg border border-indigo-200"
                          />
                        </a>
                      )}
                    </td>
                    <td>{att.submitted_at}</td>
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
