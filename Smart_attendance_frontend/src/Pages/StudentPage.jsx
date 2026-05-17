import React, { useEffect, useState } from "react";
import { getStudents } from "../services/api";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Students List</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - Roll: {s.roll}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsPage;
