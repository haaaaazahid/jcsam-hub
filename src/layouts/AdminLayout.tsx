import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  FiHome, FiGrid, FiUsers, FiUserCheck, FiCalendar, FiAward,
  FiBell, FiImage, FiLogOut, FiMenu, FiChevronLeft, FiActivity
} from "react-icons/fi";
import { MdSportsCricket } from "react-icons/md";

const sidebarItems = [
  { label: "Overview", path: "/admin", icon: <FiGrid /> },
  { label: "Sports", path: "/admin/sports", icon: <MdSportsCricket /> },
  { label: "Colleges", path: "/admin/colleges", icon: <FiHome /> },
  { label: "Players", path: "/admin/players", icon: <FiUserCheck /> },
  { label: "Schedule", path: "/admin/schedule", icon: <FiCalendar /> },
  { label: "Results", path: "/admin/results", icon: <FiAward /> },
  { label: "Notices", path: "/admin/notices", icon: <FiBell /> },
  { label: "Committee", path: "/admin/committee", icon: <FiUsers /> },
  { label: "Gallery", path: "/admin/gallery", icon: <FiImage /> },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full z-40`}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center">
                <FiActivity className="w-4 h-4 text-secondary-foreground" />
              </div>
              <span className="font-display font-bold text-sidebar-foreground text-sm">JCSAM Admin</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          >
            {collapsed ? <FiMenu className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-sidebar-border">
          {!collapsed && (
            <div className="px-3 py-2 text-xs text-sidebar-foreground/60 mb-1">
              Logged in as <span className="font-semibold">{user?.username}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
            title={collapsed ? "Logout" : undefined}
          >
            <FiLogOut className="text-lg flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors mt-1"
          >
            <FiHome className="text-lg flex-shrink-0" />
            {!collapsed && <span>View Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 ${collapsed ? "ml-16" : "ml-64"} transition-all duration-300`}>
        <header className="sticky top-0 z-30 h-14 bg-card/80 backdrop-blur-xl border-b border-border flex items-center px-6">
          <h1 className="font-display font-bold text-lg text-foreground">
            {sidebarItems.find(i => i.path === location.pathname)?.label || "Admin Panel"}
          </h1>
        </header>
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
