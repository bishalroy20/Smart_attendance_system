// src/pages/teacher/Navbar.jsx

export default function Navbar() {

  return (

    <div className="bg-base-100 border-b border-base-300 px-8 py-5 flex justify-between items-center mt-50">

      <div>

        <h2 className="text-2xl font-bold">
          Teacher Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Manage classes and students
        </p>

      </div>

      <div className="flex items-center gap-3">

        <div className="text-right">

          <h3 className="font-semibold">
            Teacher
          </h3>

          <p className="text-sm text-gray-500">
            Active
          </p>

        </div>

        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://i.ibb.co/4pDNDk1/avatar.png" />
          </div>
        </div>

      </div>

    </div>
  );
}