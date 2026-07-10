import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

export default function UserImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const auth = getAuth();
      const res = await axios.get("http://127.0.0.1:8000/api/get-user-training-images/", {
        params: { firebase_uid: auth.currentUser.uid },
      });
      setImages(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">My Training Images</h2>

      {images.length === 0 ? (
        <p className="text-red-600 font-semibold">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.image_url}   // ✅ ImgBB URL
              alt="Training"
              className="w-full h-40 object-cover rounded-lg shadow-md border border-indigo-200"
            />
          ))}
        </div>
      )}
    </div>
  );
}
