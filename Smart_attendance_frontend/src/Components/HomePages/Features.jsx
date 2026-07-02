import React from "react";
import {
  ScanFace,
  ShieldCheck,
  Database,
  Activity,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "AI Face Recognition",
      desc: "Accurate and fast face detection using ArcFace & RetinaFace.",
      icon: <ScanFace size={32} />,
      color: "bg-blue-600",
    },
    {
      title: "Anti-Spoofing",
      desc: "Texture CNN ensures liveness detection against photo/video attacks.",
      icon: <ShieldCheck size={32} />,
      color: "bg-green-500",
    },
    {
      title: "Real-Time Logs",
      desc: "Attendance records stored instantly with JSON metadata.",
      icon: <Activity size={32} />,
      color: "bg-purple-600",
    },
    {
      title: "Secure Database",
      desc: "PostgreSQL with pgvector for semantic search and fast retrieval.",
      icon: <Database size={32} />,
      color: "bg-pink-500",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-slate-100 to-slate-200 px-4"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold uppercase tracking-wider mb-3">
            Powerful Features
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Everything You Need
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Advanced AI-powered attendance management with secure real-time
            monitoring and modern authentication technology.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-7 shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-2 border border-slate-100"
            >
              {/* Icon */}
              <div
                className={`${f.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition duration-300`}
              >
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom Line */}
              <div className="mt-6 w-12 h-1 bg-blue-600 rounded-full group-hover:w-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;