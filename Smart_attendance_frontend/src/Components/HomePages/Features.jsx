import React from "react";

const Features = () => {
  const features = [
    {
      title: "AI Face Recognition",
      desc: "Accurate and fast face detection using ArcFace & RetinaFace.",
    },
    {
      title: "Anti-Spoofing",
      desc: "Texture CNN ensures liveness detection against photo/video attacks.",
    },
    {
      title: "Real-Time Logs",
      desc: "Attendance records stored instantly with JSON metadata.",
    },
    {
      title: "Secure Database",
      desc: "PostgreSQL with pgvector for semantic search and fast retrieval.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
