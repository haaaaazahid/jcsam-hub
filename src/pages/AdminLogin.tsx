import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FiLock, FiUser, FiAlertCircle } from "react-icons/fi";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin");
    } else {
      setError("Invalid credentials. Use admin / admin123");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md px-4">
        <div className="admin-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
              <FiLock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1">JCSAM Management Portal</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
              <FiAlertCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="admin"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">Demo: admin / admin123</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
