import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthProvider"; // AuthProvider থেকে user/profile আসবে
import axios from "axios";

export default function Profile() {
  const { user, profile } = useAuth(); // Firebase user + Django profile
  const [backendProfile, setBackendProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/users/${user.uid}/`
          );
          setBackendProfile(res.data);
        } catch (err) {
          console.error("Profile fetch error:", err);
        }
      }
    };
    fetchProfile();
  }, [user]);

  if (!user) {
    return <p className="text-center text-red-500">⚠️ Please login first</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">👤 Profile</h2>

      {backendProfile ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {backendProfile.name}</p>
          <p><strong>Email:</strong> {backendProfile.email}</p>
          <p><strong>Phone:</strong> {backendProfile.phone}</p>
          <p><strong>Role:</strong> {backendProfile.role}</p>
          {backendProfile.semester && <p><strong>Semester:</strong> {backendProfile.semester}</p>}
          {backendProfile.department && <p><strong>Department:</strong> {backendProfile.department}</p>}
          {backendProfile.avatarUrl && (
            <img
              src={backendProfile.avatarUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full mx-auto mt-4"
            />
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading profile...</p>
      )}
    </div>
  );
}
