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
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Home from "./Components/HomePages/Home.jsx";
import ErrorPage from "./Components/Route/ErrorPage.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
          { path: "dashboard", element: <Dashboard /> },
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
