import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import UserImages from "./UserImages";

// Helper function: upload single file to ImgBB
async function uploadToImgBB(file) {
  const apiKey = "aa7cc99fc48cd7b4535b604b6633af61";
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.data.url; // return uploaded image URL
}

export default function UploadTrainingImages() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setImages(e.target.files);
  };

  const handleUpload = async () => {
    if (images.length < 5) {
      setMessage("Please select at least 5 images.");
      return;
    }

    try {
      const auth = getAuth();

      // Step 1: Upload all images to ImgBB
      const uploadedUrls = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadToImgBB(images[i]);
        uploadedUrls.push(url);
      }

      // Step 2: Send URLs to backend
      const res = await axios.post("http://127.0.0.1:8000/api/upload-training-images/", {
        firebase_uid: auth.currentUser.uid,
        image_urls: uploadedUrls,
      });

      setMessage("Upload successful!");
      console.log(res.data);
    } catch (err) {
      setMessage("Upload failed.");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Upload Training Images</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Upload
      </button>

      {message && <p className="mt-4 text-purple-600 font-semibold">{message}</p>}


      

      <UserImages /> {/* Display uploaded images */}

    </div>
  );
}
