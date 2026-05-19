import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function SeeStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/teacher/students/");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Filter + Search logic
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSemester = semesterFilter
      ? student.semester === semesterFilter
      : true;
    return matchesSearch && matchesSemester;
  });

  return (
    <div className="flex bg-base-200 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-5">All Students</h2>

              {/* ✅ Search + Filter */}
              <div className="flex gap-4 mb-5">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="input input-bordered w-full max-w-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="select select-bordered"
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                >
                  <option value="">All Semesters</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Semester</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.semester}</td>
                        <td>{student.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
