// src/pages/teacher/CreateClass.jsx

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthProvider";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function CreateClass() {

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    course_name: "",
    course_code: "",
    semester: "",
    date: "",
    start_time: "",
    end_time: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...formData,
        semester: parseInt(formData.semester),
        start_time: formData.start_time + ":00",
        end_time: formData.end_time + ":00",
        firebase_uid: user.uid,
      };

      const res = await axios.post(
        "http://127.0.0.1:8000/teacher/create-class/",
        payload
      );

      console.log(res.data);

      alert("Class Created");

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

  return (

    <div className="flex bg-base-200 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="card bg-base-100 shadow-2xl max-w-4xl mx-auto">

            <div className="card-body">

              <h2 className="text-3xl font-bold mb-6">
                Create Class
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >

                <input
                  type="text"
                  name="course_name"
                  placeholder="Course Name"
                  className="input input-bordered w-full"
                  value={formData.course_name}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="course_code"
                  placeholder="Course Code"
                  className="input input-bordered w-full"
                  value={formData.course_code}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="semester"
                  placeholder="Semester"
                  className="input input-bordered w-full"
                  value={formData.semester}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  name="date"
                  className="input input-bordered w-full"
                  value={formData.date}
                  onChange={handleChange}
                />

                <input
                  type="time"
                  name="start_time"
                  className="input input-bordered w-full"
                  value={formData.start_time}
                  onChange={handleChange}
                />

                <input
                  type="time"
                  name="end_time"
                  className="input input-bordered w-full"
                  value={formData.end_time}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered md:col-span-2"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="btn btn-primary md:col-span-2"
                >
                  Create Class
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}