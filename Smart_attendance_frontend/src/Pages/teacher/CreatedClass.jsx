// src/pages/teacher/CreatedClasses.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthProvider";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function CreatedClasses() {

  const { user } = useAuth();

  const [classes, setClasses] = useState([]);

  useEffect(() => {

    fetchClasses();

  }, []);

  const fetchClasses = async () => {

    try {

      const res = await axios.get(
        `http://127.0.0.1:8000/teacher/created-classes/?firebase_uid=${user.uid}`
      );

      setClasses(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="flex bg-base-200 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="card bg-base-100 shadow-xl">

            <div className="card-body">

              <h2 className="text-3xl font-bold mb-5">
                Created Classes
              </h2>

              <div className="overflow-x-auto">

                <table className="table">

                  <thead>

                    <tr>
                      <th>Course</th>
                      <th>Code</th>
                      <th>Semester</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>

                  </thead>

                  <tbody>

                    {classes.map((item) => (

                      <tr key={item.id}>

                        <td>{item.course_name}</td>

                        <td>{item.course_code}</td>

                        <td>{item.semester}</td>

                        <td>{item.date}</td>

                        <td>
                          {item.start_time} - {item.end_time}
                        </td>

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