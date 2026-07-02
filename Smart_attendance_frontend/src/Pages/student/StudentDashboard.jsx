// src/pages/student/StudentDashboard.jsx

import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";
import StudentClasses from "./StudentClasses";

export default function StudentDashboard() {

  return (

    <div className="flex bg-base-200 min-h-screen">

      <StudentSidebar />

      <div className="flex-1">

        <StudentNavbar />

        <StudentClasses />

      </div>

    </div>
  );
}