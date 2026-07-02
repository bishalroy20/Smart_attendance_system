import { useState } from "react";
import {
  LayoutDashboard,
  PlusSquare,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menus = [
    { name: "Dashboard",      path: "/teacher-dashboard",                icon: LayoutDashboard, badge: null },
    { name: "My Courses",     path: "/teacher-dashboard/courses",        icon: BookOpen,         badge: "5" },
    { name: "Create Session", path: "/teacher-dashboard/create-class",   icon: PlusSquare,       badge: null },
    { name: "Attendance",     path: "/teacher-dashboard/attendance",     icon: ClipboardCheck,   badge: "3" },
    { name: "Gradebook",      path: "/teacher-dashboard/gradebook",      icon: GraduationCap,    badge: null },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-400/20 border border-indigo-300/30 flex items-center justify-center">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M12 3L2 9l10 6 10-6-10-6z" stroke="#A5B4FC" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M2 15l10 6 10-6" stroke="#A5B4FC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-white text-sm tracking-tight">Smart Attend</p>
            <p className="text-[11px] text-indigo-300/80">Teacher Panel</p>
          </div>
        </div>
        <button className="md:hidden text-indigo-300 hover:text-white transition" onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
      </div>

      {/* Section label */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/60 px-5 pt-5 pb-2">
        Navigation
      </p>

      {/* Nav links */}
      <nav className="px-3 flex-1 flex flex-col gap-0.5">
        {menus.map((menu) => {
          const active = location.pathname === menu.path;
          const Icon = menu.icon;
          return (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative
                ${active
                  ? "bg-indigo-500/25 text-white shadow-sm"
                  : "text-indigo-200/70 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {/* Active indicator bar */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-400 rounded-r-full" />
              )}

              <span className={`shrink-0 transition-colors ${active ? "text-indigo-300" : "text-indigo-400/60 group-hover:text-indigo-300"}`}>
                <Icon size={17} />
              </span>

              <span className="flex-1">{menu.name}</span>

              {menu.badge && (
                <span className="text-[10px] font-bold bg-indigo-500/40 text-indigo-200 px-1.5 py-0.5 rounded-full">
                  {menu.badge}
                </span>
              )}

              {active && (
                <ChevronRight size={14} className="text-indigo-300/50 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade / info card */}
      <div className="mx-3 mb-4 p-3.5 rounded-xl bg-indigo-500/15 border border-indigo-400/20">
        <p className="text-xs font-bold text-indigo-200 mb-0.5">⏰ Next Class</p>
        <p className="text-xs text-indigo-100 font-semibold">CSE-401 · OS Fundamentals</p>
        <p className="text-[11px] text-indigo-300/70 mt-0.5">Today, 9:00 AM · Room 302</p>
      </div>

      {/* Profile + Logout */}
      <div className="border-t border-white/10 p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-400 flex items-center justify-center font-bold text-xs text-white shrink-0">
          AR
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">Prof. A. Rahman</p>
          <p className="text-[11px] text-indigo-300/70 truncate">CSE Department</p>
        </div>
        <button className="w-8 h-8 rounded-lg hover:bg-white/10 transition flex items-center justify-center text-indigo-300 hover:text-white shrink-0" title="Logout">
          <LogOut size={15} />
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Mobile topbar toggle */}
      <div className="md:hidden flex items-center justify-between bg-[#1E1B4B] px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-400/20 flex items-center justify-center">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M12 3L2 9l10 6 10-6-10-6z" stroke="#A5B4FC" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 15l10 6 10-6" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-white text-sm">Smart Attend</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          <Menu size={18} className="text-white" />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-64 bg-[#1E1B4B]
          transform transition-transform duration-300 ease-in-out shrink-0
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{
          background: "linear-gradient(160deg, #1E1B4B 0%, #1a1836 100%)",
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
