import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiHome, FiInfo, FiAward, FiBell, FiUsers, FiImage, FiFileText, FiMail, FiLogIn } from "react-icons/fi";
import { MdSportsCricket } from "react-icons/md";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollToTop from "@/components/ScrollToTop";
import DarkModeToggle from "@/components/DarkModeToggle";

const navItems = [
  { label: "Home", path: "/", icon: <FiHome /> },
  { label: "About", path: "/about", icon: <FiInfo /> },
  { label: "Sports", path: "/sports", icon: <MdSportsCricket /> },
  { label: "Results", path: "/results", icon: <FiAward /> },
  { label: "Notices", path: "/notices", icon: <FiBell /> },
  { label: "Committee", path: "/committee", icon: <FiUsers /> },
  { label: "Gallery", path: "/gallery", icon: <FiImage /> },
  { label: "Registration", path: "/registration", icon: <FiFileText /> },
  { label: "Contact", path: "/contact", icon: <FiMail /> },
];

const PublicLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
              JC
            </div>
            <div>
              <span className="font-display font-bold text-lg text-foreground hidden sm:block">JCSAM</span>
              <span className="text-[10px] text-muted-foreground hidden sm:block leading-tight">Junior College Sports</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <DarkModeToggle />
            <Link to="/admin/login" className="ml-1 btn-secondary text-sm !py-2 !px-4 flex items-center gap-2">
              <FiLogIn /> Admin
            </Link>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <DarkModeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-muted">
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden bg-card"
            >
              <nav className="p-4 space-y-1">
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
                <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium btn-secondary mt-2">
                  <FiLogIn /> Admin Login
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Breadcrumbs />

      {/* Main */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="gradient-hero text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display font-bold text-xl mb-4">JCSAM</h3>
              <p className="text-sm opacity-80">Junior College Sports Association of Mumbai — Promoting sports excellence among junior colleges since inception.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {navItems.slice(0, 8).map(item => (
                  <Link key={item.path} to={item.path} className="text-sm opacity-80 hover:opacity-100 transition-opacity">{item.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm opacity-80">
                C/o. The D.G. Ruparel College of Arts, Science and Commerce,<br />
                Mahim, Mumbai – 400016
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-60">
            © {new Date().getFullYear()} JCSAM. All rights reserved.
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default PublicLayout;
