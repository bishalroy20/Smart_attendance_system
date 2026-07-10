import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Edit,
  Save,
  ShieldCheck,
  GraduationCap,
  Building2,
  IdCard,
  Upload,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [backendProfile, setBackendProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [newAvatar, setNewAvatar] = useState(null);

  // 🔥 FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/users/${user.uid}/`
          );
          setBackendProfile(res.data);
          setForm(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchProfile();
  }, [user]);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/users/${user.uid}/update/`,
        form
      );
      setBackendProfile(res.data);
      setEditMode(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  // Helper: upload single file to ImgBB
  async function uploadToImgBB(file) {
    const apiKey = "aa7cc99fc48cd7b4535b604b6633af61"; // replace with your real key
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data.url; // ✅ ImgBB URL
  }

  // 🔥 UPDATE AVATAR
  const handleAvatarUpload = async () => {
    if (!newAvatar) return;
    try {
      // Step 1: Upload to ImgBB
      const url = await uploadToImgBB(newAvatar);

      // Step 2: Send URL to backend
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/users/${user.uid}/update/`,
        { avatarUrl: url }
      );

      setBackendProfile(res.data);
      setNewAvatar(null);
      toast.success("Avatar updated!");
    } catch (err) {
      toast.error("Avatar upload failed!");
    }
  };

  // 🔥 DASHBOARD NAV
  const goDashboard = () => {
    if (backendProfile.role === "teacher") {
      navigate("/teacher-dashboard/home");
    } else {
      navigate("/student-dashboard");
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        ⚠️ Please login first
      </p>
    );
  }

  if (!backendProfile) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

        {/* HEADER */}
        <div className="flex flex-col items-center text-center">
          {/* AVATAR */}
          {backendProfile.avatarUrl ? (
            <img
              src={backendProfile.avatarUrl}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-blue-100 object-cover shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
          )}

          {/* Change Avatar */}
          <div className="mt-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewAvatar(e.target.files[0])}
              className="hidden"
              id="avatarUpload"
            />
            <label
              htmlFor="avatarUpload"
              className="cursor-pointer px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
            >
              Change Avatar
            </label>
          </div>
          {newAvatar && (
            <button
              onClick={handleAvatarUpload}
              className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Upload
            </button>
          )}

          <h2 className="text-3xl font-bold mt-4">{backendProfile.name}</h2>
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full mt-2">
            <ShieldCheck size={16} />
            {backendProfile.role}
          </div>
        </div>

        {/* INFO */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <Input icon={<User size={16} />} label="Name" name="name" value={form.name} editMode={editMode} onChange={handleChange} />
          <Input icon={<Mail size={16} />} label="Email" name="email" value={form.email} editMode={editMode} onChange={handleChange} />
          <Input icon={<Phone size={16} />} label="Phone" name="phone" value={form.phone} editMode={editMode} onChange={handleChange} />
          <Input icon={<GraduationCap size={16} />} label="Semester" name="semester" value={form.semester} />
          <Input icon={<Building2 size={16} />} label="Department" name="department" value={form.department} editMode={editMode} onChange={handleChange} />
          <Input icon={<IdCard size={16} />} label="Registration ID" name="regId" value={form.regId} editMode={editMode} onChange={handleChange} />
          <Input
            icon={<IdCard size={16} />}
            label="Session"
            name="session"
            value={
              form.regId
                ? `${form.regId.slice(0, 4)}-${String(Number(form.regId.slice(0, 4)) + 1).slice(-2)}`
                : ""
            }
            editMode={false}
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => setEditMode(!editMode)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            <Edit size={18} />
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </button>

          {editMode && (
            <button
              onClick={handleUpdate}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Save size={18} />
              Save Changes
            </button>
          )}

          <button
            onClick={() => navigate("/upload-training-images")}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            <Upload size={18} />
            Upload Images
          </button>

          <button
            onClick={goDashboard}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            📊 Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

function Input({ icon, label, name, value, editMode, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <div className="flex items-center gap-2 border p-2 rounded-lg mt-1 bg-gray-50">
        {icon}
        {editMode ? (
          <input
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full outline-none bg-transparent"
          />
        ) : (
          <span className="text-gray-700">{value}</span>
        )}
      </div>
    </div>
  );
}
}
