import { useState, useEffect } from "react";
import axios from "axios";

export default function AssignedCoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/teacher/assigned-courses/"
        );
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6 pt-20">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Assigned Courses
            </h2>
            <p className="text-blue-100 mt-1">
              List of all courses assigned to the teacher
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3 text-center">
            <h3 className="text-3xl font-bold text-white">
              {courses.length}
            </h3>
            <p className="text-sm text-blue-100">Courses</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-slate-100 text-slate-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-4 text-left">Course ID</th>
                <th className="px-6 py-4 text-left">Course Name</th>
                <th className="px-6 py-4 text-left">Session</th>
                <th className="px-6 py-4 text-left">Semester</th>
                <th className="px-6 py-4 text-left">Teacher</th>
              </tr>
            </thead>

            <tbody>
              {courses.length > 0 ? (
                courses.map((c, index) => (
                  <tr
                    key={c.id}
                    className={`border-b transition duration-300 hover:bg-blue-50 hover:scale-[1.01]
                      ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    `}
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-700">
                        {c.course_id}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {c.course_name}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                        {c.session}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
                        {c.semester}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                          {(c.teacher_name || c.teacher)
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <span className="font-medium text-gray-700">
                          {c.teacher_name || c.teacher}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No assigned courses found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}