
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import DarkModeToggle from "@/components/DarkModeToggle";
import {
  FiHome, FiGrid, FiUsers, FiUserCheck, FiCalendar, FiAward,
  FiBell, FiImage, FiLogOut, FiMenu, FiChevronLeft, FiActivity, FiKey, FiX, FiClock
} from "react-icons/fi";
import { MdSportsCricket } from "react-icons/md";
const sidebarItems = [
  { label: "Overview", path: "/admin", icon: <FiGrid /> },
  { label: "Registrations", path: "/admin/registrations", icon: <FiClock /> },
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
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const { logout, user, updatePassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    if (newPassword.length < 6) { toast.error("Min 6 characters required"); return; }
    setPwLoading(true);
    const ok = await updatePassword(newPassword);
    setPwLoading(false);
    if (ok) {
      toast.success("Password updated successfully!");
      setChangePasswordOpen(false);
      setNewPassword(""); setConfirmPassword("");
    } else {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full z-40`}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center">
                <FiActivity className="w-4 h-4 text-white" />
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

        <div className="p-2 border-t border-sidebar-border space-y-1">
          {!collapsed && (
            <div className="px-3 py-2 text-xs text-sidebar-foreground/60">
              Logged in as <span className="font-semibold">{user?.email?.split("@")[0]}</span>
            </div>
          )}
          <button
            onClick={() => setChangePasswordOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            title={collapsed ? "Change Password" : undefined}
          >
            <FiKey className="text-lg flex-shrink-0" />
            {!collapsed && <span>Change Password</span>}
          </button>
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
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <FiHome className="text-lg flex-shrink-0" />
            {!collapsed && <span>View Site</span>}
          </Link>
        </div>
      </aside>

      {/* Change Password Modal */}
      {changePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-xl shadow-2xl w-full max-w-sm p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-lg flex items-center gap-2"><FiKey /> Change Password</h3>
              <button onClick={() => setChangePasswordOpen(false)} className="p-1.5 rounded-lg hover:bg-muted">
                <FiX className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  required minLength={6}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Min 6 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Repeat password"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={pwLoading} className="btn-primary flex-1 text-sm">
                  {pwLoading ? "Updating..." : "Update Password"}
                </button>
                <button type="button" onClick={() => setChangePasswordOpen(false)} className="flex-1 px-3 py-2 rounded-lg border border-border text-sm hover:bg-muted">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 ${collapsed ? "ml-16" : "ml-64"} transition-all duration-300`}>
        <header className="sticky top-0 z-30 h-14 bg-card/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-6">
          <h1 className="font-display font-bold text-lg text-foreground">
            {sidebarItems.find(i => i.path === location.pathname)?.label || "Admin Panel"}
          </h1>
          <DarkModeToggle />
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
