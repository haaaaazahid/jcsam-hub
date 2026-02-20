
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FiLock, FiMail, FiAlertCircle, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"login" | "forgot">("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, resetPassword, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await resetPassword(forgotEmail);
    setLoading(false);
    if (ok) {
      setForgotSent(true);
      toast.success("Password reset email sent!");
    } else {
      toast.error("Failed to send reset email. Check the address.");
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

          {tab === "login" ? (
            <>
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                  <FiAlertCircle /> {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="admin@jcsam.org"
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
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
              <button
                onClick={() => setTab("forgot")}
                className="w-full text-center text-sm text-primary hover:underline mt-4"
              >
                Forgot Password?
              </button>
            </>
          ) : (
            <>
              {forgotSent ? (
                <div className="text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-success/10 mx-auto flex items-center justify-center">
                    <FiCheckCircle className="w-7 h-7 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A password reset link has been sent to <strong>{forgotEmail}</strong>. Check your inbox (and spam folder).
                  </p>
                  <button onClick={() => { setTab("login"); setForgotSent(false); setForgotEmail(""); }} className="btn-primary w-full text-sm">
                    Back to Login
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => setTab("login")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
                    <FiArrowLeft /> Back to Login
                  </button>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your admin email and we'll send you a password reset link.
                  </p>
                  <form onSubmit={handleForgot} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={e => setForgotEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="admin@jcsam.org"
                        />
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full">
                      {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
