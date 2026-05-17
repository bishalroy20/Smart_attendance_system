import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    regId: "",
    semester: "",
    empId: "",
    department: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    avatarFile: null,
    role: "student", // default student
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  async function uploadToImgBB(file) {
    const apiKey = "aa7cc99fc48cd7b4535b604b6633af61";
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      toast.error("❌ Passwords do not match");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      let avatarUrl = "";
      if (form.avatarFile) {
        avatarUrl = await uploadToImgBB(form.avatarFile);
      }
      await updateProfile(cred.user, { displayName: form.name });

   

    await axios.post("http://127.0.0.1:8000/api/auth/register", {
      uid: cred.user.uid,
      ...form,
      avatarUrl,
    });



      toast.success("✅ Registration successful!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border p-2" />
          <input name="regId" placeholder="Registration ID (Student)" onChange={handleChange} className="w-full border p-2" />
          <select name="semester" onChange={handleChange} className="w-full border p-2">
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i}>{i + 1} Semester</option>
            ))}
          </select>
          <input name="empId" placeholder="Employee ID (Teacher)" onChange={handleChange} className="w-full border p-2" />
          <input name="department" placeholder="Department (Teacher)" onChange={handleChange} className="w-full border p-2" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2" />
          <input name="avatarFile" type="file" accept="image/*" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />
          <input name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleChange} className="w-full border p-2" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
        </form>
      </div>
      <div className="hidden md:flex w-1/2 bg-blue-200 items-center justify-center">
        {/* <img src="https://via.placeholder.com/400x400.png?text=Registration" alt="Register" className="rounded-lg shadow-lg" /> */}
      </div>
    </div>
  );
}
