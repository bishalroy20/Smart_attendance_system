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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,   // ✅ ErrorPage connected
    children: [
      { index: true, element: <Home /> },

      {
        element: <PublicRoute />,
        children: [
          { path: "register", element: <Register /> },
          { path: "login", element: <Login /> },
        ],
      },

      {
        element: <PrivateRoute />,
        children: [
           { path: "profile", element: <Profile /> },
           { path: "teacher-dashboard", element: <TeacherDashboard /> },
           { path: "teacher-dashboard/create-class", element: <CreateClass /> },
           { path: "teacher-dashboard/created-class", element: <CreatedClass /> },
           { path: "teacher-dashboard/students", element: <SeeStudents /> },


         
        ],
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
