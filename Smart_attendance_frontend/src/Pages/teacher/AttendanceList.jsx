import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function AttendanceList() {
  const { classId } = useParams(); // URL থেকে classId নেবে
  const [attendance, setAttendance] = useState([]);
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/teacher/class-attendance/${classId}/`);
      setAttendance(res.data.students);
      setAttendanceCount(res.data.count);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Chart data তৈরি
  const chartData = {
    labels: attendance.map((s) => s.student_name),
    datasets: [
      {
        label: "Attendance",
        data: attendance.map(() => 1), // প্রতিটি student এর জন্য 1 মানে present
        backgroundColor: "rgba(99, 102, 241, 0.6)", // Indigo
      },
    ],
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        Attendance Details for Class {classId}
      </h2>


      {/* Table */}
      {attendance.length > 0 ? (
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-bold text-indigo-700 mb-3">
            Attendance List (Total: {attendanceCount})
          </h3>
          <table className="table w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th>Student Name</th>
                <th>Reg ID</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((s, idx) => (
                <tr key={idx} className="hover:bg-indigo-50">
                  <td>{s.student_name}</td>
                  <td>{s.student_regId}</td>
                  <td>{s.submitted_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-bold text-indigo-700 mb-3">
            No attendance records found.
          </h3>
        </div>
      )}
    </div>
  );
}
