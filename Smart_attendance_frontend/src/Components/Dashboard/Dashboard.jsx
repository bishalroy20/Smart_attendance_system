import { useState } from "react";

export default function Dashboard() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");

  const handleAddClass = () => {
    if (newClass.trim() !== "") {
      setClasses([...classes, { id: Date.now(), name: newClass }]);
      setNewClass("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">📚 Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </header>

      {/* Create Class Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">➕ Create Class</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            placeholder="Enter class name"
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            onClick={handleAddClass}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </section>

      {/* Classes List */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📖 Classes</h2>
        {classes.length === 0 ? (
          <p className="text-gray-500">No classes created yet.</p>
        ) : (
          <ul className="space-y-2">
            {classes.map((cls) => (
              <li
                key={cls.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{cls.name}</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Manage
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Extra Features */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">👩‍🎓 Students</h3>
          <p className="text-gray-600">Add, edit, and view student info.</p>
          <button className="mt-3 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Go
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">👨‍🏫 Teachers</h3>
          <p className="text-gray-600">Manage teacher profiles and roles.</p>
          <button className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
            Go
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">⚙️ Settings</h3>
          <p className="text-gray-600">Customize dashboard preferences.</p>
          <button className="mt-3 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            Go
          </button>
        </div>
      </section>
    </div>
  );
}
