// src/pages/student/StudentClasses.jsx
import { ToastContainer } from "react-toastify";
import {toast} from "react-toastify";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { Camera, Clock, BookOpen, Flame, Calendar, Lock } from "lucide-react";
import { useAuth } from "../../Contexts/AuthProvider";

export default function StudentClasses() {
  const { user, profile } = useAuth();
  const webcamRef = useRef(null);

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState("today");
  const [submittedAttendance, setSubmittedAttendance] = useState([]);
  const [attendancePassword, setAttendancePassword] = useState(""); // ✅ password state

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/student/classes/?semester=${profile?.semester}`
      );
      setClasses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const isClassRunning = (start, end) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes =
      parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1]);
    const endMinutes =
      parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1]);

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  };

  const captureAttendance = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], "attendance.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);

    try {
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=aa7cc99fc48cd7b4535b604b6633af61`,
        formData
      );

      const imageUrl = imgbbRes.data.data.url;

      // ✅ Send password + image + class info
      await axios.post("http://127.0.0.1:8000/student/give-attendance/", {
        firebase_uid: user.uid,
        class_id: selectedClass.id,
        image_url: imageUrl,
        password: attendancePassword, // ✅ send password
      });

      toast.success("Attendance Submitted");

      setSubmittedAttendance((prev) => [...prev, selectedClass.id]);
      setSelectedClass(null);
      setAttendancePassword(""); // reset
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit attendance");
      console.error(err.response?.data || err);
      toast.error("Failed to submit attendance");
    }
  };

  const todayClasses = classes;
  const liveClasses = classes.filter((c) =>
    isClassRunning(c.start_time, c.end_time)
  );
  const upcomingClasses = classes.filter((c) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes =
      parseInt(c.start_time.split(":")[0]) * 60 +
      parseInt(c.start_time.split(":")[1]);
    return startMinutes > currentMinutes;
  });

  const TabButton = ({ name, label, icon }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300
        ${
          activeTab === name
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
    >
      {icon}
      {label}
    </button>
  );

  const renderClasses = (list) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {list.map((item) => (
        <div
          key={item.id}
          className="group bg-white rounded-2xl shadow-md border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <div className="p-5 space-y-3">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold text-gray-800">
                {item.course_name}
              </h2>

              {isClassRunning(item.start_time, item.end_time) && (
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 flex items-center gap-1">
                  <Flame size={14} /> Live
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500">{item.course_code}</p>

            {/* Info */}
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                👨‍🏫 <span className="font-medium">{item.teacher_name}</span>
              </p>
              <p>📚 Semester {item.semester}</p>
              <div className="flex items-center gap-2 text-purple-600">
                <Clock size={16} />
                {item.start_time} - {item.end_time}
              </div>
            </div>

            {/* Button */}
            {isClassRunning(item.start_time, item.end_time) && (
              <button
                onClick={() => setSelectedClass(item)}
                disabled={submittedAttendance.includes(item.id)}
                className={`w-full mt-4 py-2 rounded-xl flex items-center justify-center gap-2 transition
                  ${
                    submittedAttendance.includes(item.id)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105"
                  }`}
              >
                <Camera size={18} />{" "}
                {submittedAttendance.includes(item.id)
                  ? "Attendance Given"
                  : "Give Attendance"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Tabs */}
      <ToastContainer />
      <div className="flex gap-3 mb-8 flex-wrap">
        <TabButton name="today" label="Today" icon={<Calendar size={16} />} />
        <TabButton name="live" label="Live Now" icon={<Flame size={16} />} />
        <TabButton name="upcoming" label="Upcoming" icon={<Clock size={16} />} />
      </div>

      {/* Content */}
      {activeTab === "today" && renderClasses(todayClasses)}
      {activeTab === "live" && renderClasses(liveClasses)}
      {activeTab === "upcoming" && renderClasses(upcomingClasses)}

      {/* Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-center">
              Capture Attendance
            </h2>

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-xl w-full"
            />

            {/* ✅ Password input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attendance Password
              </label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Lock size={16} className="text-gray-500" />
                <input
                  type="password"
                  value={attendancePassword}
                  onChange={(e) => setAttendancePassword(e.target.value)}
                  placeholder="Enter class password"
                  className="flex-1 outline-none text-sm"
                />
              </div>
            </div>

            <button
              onClick={captureAttendance}
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-xl hover:scale-105 transition"
            >
              Capture & Submit
            </button>

            <button
              onClick={() => setSelectedClass(null)}
              className="w-full mt-3 bg-gray-100 py-2 rounded-xl hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
