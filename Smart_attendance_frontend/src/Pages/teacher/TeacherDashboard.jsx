// src/pages/teacher/TeacherDashboard.jsx

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function TeacherDashboard() {

  return (

    <div className="flex bg-base-200 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="card bg-primary text-white shadow-xl">
              <div className="card-body">
                <h2 className="text-lg">Total Classes</h2>
                <h1 className="text-4xl font-bold">12</h1>
              </div>
            </div>

            <div className="card bg-success text-white shadow-xl">
              <div className="card-body">
                <h2 className="text-lg">Total Students</h2>
                <h1 className="text-4xl font-bold">245</h1>
              </div>
            </div>

            <div className="card bg-warning text-white shadow-xl">
              <div className="card-body">
                <h2 className="text-lg">Today's Classes</h2>
                <h1 className="text-4xl font-bold">3</h1>
              </div>
            </div>

            <div className="card bg-secondary text-white shadow-xl">
              <div className="card-body">
                <h2 className="text-lg">Attendance Rate</h2>
                <h1 className="text-4xl font-bold">85%</h1>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

            <div className="xl:col-span-2">

              <div className="card bg-base-100 shadow-xl">

                <div className="card-body">

                  <div className="flex justify-between items-center">

                    <h2 className="card-title">
                      Recent Classes
                    </h2>

                    <button className="btn btn-sm btn-primary">
                      View All
                    </button>

                  </div>

                  <div className="overflow-x-auto mt-4">

                    <table className="table">

                      <thead>

                        <tr>
                          <th>Course</th>
                          <th>Semester</th>
                          <th>Date</th>
                          <th>Time</th>
                        </tr>

                      </thead>

                      <tbody>

                        <tr>
                          <td>CSE-301</td>
                          <td>6</td>
                          <td>May 12</td>
                          <td>10AM - 12PM</td>
                        </tr>

                        <tr>
                          <td>CSE-302</td>
                          <td>5</td>
                          <td>May 14</td>
                          <td>2PM - 4PM</td>
                        </tr>

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            </div>

            <div>

              <div className="card bg-base-100 shadow-xl">

                <div className="card-body">

                  <h2 className="card-title">
                    Quick Actions
                  </h2>

                  <div className="flex flex-col gap-4 mt-4">

                    <button className="btn btn-primary">
                      Create New Class
                    </button>

                    <button className="btn btn-secondary">
                      View Students
                    </button>

                    <button className="btn btn-accent">
                      Attendance Reports
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}