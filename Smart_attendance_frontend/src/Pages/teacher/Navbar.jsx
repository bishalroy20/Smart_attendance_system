import { useState } from "react";

export default function Navbar() {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between bg-white border-b border-gray-100 px-5 md:px-8 py-3.5 sticky top-0 z-30 shadow-sm">

      {/* LEFT */}
      <div className="flex flex-col">
        <h1
          className="text-base md:text-lg font-bold text-gray-900 leading-tight"
          style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", letterSpacing: "-0.02em" }}
        >
          Teacher Dashboard
        </h1>
        <p className="text-[11px] text-gray-400 mt-0.5 hidden sm:block">
          Wednesday, June 3 — Spring Semester 2026
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-3">

        {/* Search */}
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-400 hover:bg-gray-50 transition w-44">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Search...</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition text-gray-500"
          >
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
              <path
                d="M15 17H20L18.595 15.595C18.21 15.21 18 14.69 18 14.148V11C18 8.038 15.786 5.612 12.925 5.079V4.5C12.925 3.672 12.253 3 11.425 3C10.597 3 9.925 3.672 9.925 4.5V5.079C7.064 5.612 4.85 8.038 4.85 11V14.148C4.85 14.69 4.64 15.21 4.255 15.595L2.85 17H8.85M15 17H8.85M15 17V18C15 19.657 13.657 21 12 21C10.343 21 9 19.657 9 18V17H8.85"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {/* Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-11 w-72 bg-white rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <p className="text-sm font-bold text-gray-800">Notifications</p>
                <span className="text-xs bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">2 new</span>
              </div>
              {[
                { text: "CSE-401 class starts in 30 minutes", time: "Just now", dot: "bg-indigo-500" },
                { text: "3 students marked absent today", time: "1h ago", dot: "bg-amber-400" },
                { text: "Gradebook updated for CSE-302", time: "Yesterday", dot: "bg-gray-300" },
              ].map((n, i) => (
                <div key={i} className="px-4 py-3 hover:bg-gray-50 flex items-start gap-3 cursor-pointer transition">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                  <div>
                    <p className="text-sm text-gray-700">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-7 bg-gray-100 hidden sm:block" />

        {/* Profile */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <img
            src="https://i.ibb.co/4pDNDk1/avatar.png"
            alt="profile"
            className="w-9 h-9 rounded-xl object-cover border-2 border-indigo-100 group-hover:border-indigo-300 transition"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div
            className="w-9 h-9 rounded-xl bg-indigo-600 items-center justify-center font-bold text-xs text-white hidden"
          >
            AR
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">Prof. A. Rahman</p>
            <p className="text-[11px] text-green-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              Active
            </p>
          </div>
          <svg className="hidden sm:block w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>
    </header>
  );
}
