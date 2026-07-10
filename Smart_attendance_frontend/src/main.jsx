import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootLayout from "./Components/RootLayout.jsx";

import AuthProvider from "./Contexts/AuthProvider.jsx";
import Register from "./Components/Authentication/Register.jsx";
import Login from "./Components/Authentication/Login.jsx";
import Profile from "./Components/Authentication/Profile.jsx";
import PublicRoute from "./Components/Route/PublicRoute.jsx";
import PrivateRoute from "./Components/Route/PrivateRoute.jsx";
import Home from "./Components/HomePages/Home.jsx";
import ErrorPage from "./Components/Route/ErrorPage.jsx";
import TeacherDashboard from "./Pages/teacher/TeacherDashboard.jsx"
import CreateClass from "./Pages/teacher/CreateClass.jsx"
import CreatedClass from "./Pages/teacher/CreatedClass.jsx"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SeeStudents from "./Pages/teacher/SeeStudents.jsx";
import StudentDashboard from "./Pages/student/StudentDashboard.jsx";
import AttendanceHistory from "./Pages/student/AttendanceHistory.jsx";
import Contact from "./Components/HomePages/Contact.jsx";
import TeacherDashboardHome from "./Pages/teacher/TeacherDashboardHome.jsx";
import AssignedCourses from "./Pages/teacher/AssignedCourse.jsx";
import CourseDetails from "./Pages/teacher/CourseDetail.jsx";
import AdminLogin from "./Pages/admin/AdminLogin.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import AdminRoute from "./Components/Route/AdminRoute.jsx";
import StudentCourses from "./Pages/student/StudentCourses.jsx";
import AttendanceList from "./Pages/teacher/AttendanceList.jsx";
import CourseSummary from "./Pages/teacher/CourseSummary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,   // ✅ ErrorPage connected
    children: [
      { index: true, element: <Home /> },
      { path: "contact" , element: <Contact /> },

      {
        element: <PublicRoute />,
        children: [
          { path: "register", element: <Register /> },
          { path: "login", element: <Login /> },
          { path: "admin-login", element: <AdminLogin /> },
        ],
      },

      {
        element: <PrivateRoute />,
        children: [
           { path: "profile", element: <Profile /> },
          //  { path: "teacher-dashboard", element: <TeacherDashboard /> },
           { path: "teacher-dashboard/home", element: <TeacherDashboardHome /> },
           { path: "teacher-dashboard/assigned-courses", element: <AssignedCourses /> },
           { path: "/teacher-dashboard/course-details/:courseId", element: <CourseDetails /> },

           { path: "teacher-dashboard/create-class", element: <CreateClass /> },
           { path: "teacher-dashboard/created-class", element: <CreatedClass /> },
           { path: "teacher-dashboard/students", element: <SeeStudents /> },
           { path: "teacher-dashboard/attendance/:classId", element: <AttendanceList /> },

           { path: "teacher-dashboard/course-summary", element: <CourseSummary /> },
           { path: "student-dashboard", element: <StudentDashboard /> },
           { path: "student/attendance", element: <AttendanceHistory /> },
           { path: "student/courses", element: <StudentCourses /> },





         
        ],
      },
      {
        element: <AdminRoute />,
        children: [
           { path: "/admin-dashboard", element: <AdminDashboard /> },
          //  <Route path="/admin-dashboard" element={<AdminDashboard />} />
          //  { path: "teacher-dashboard", element: <TeacherDashboard /> },
           
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
