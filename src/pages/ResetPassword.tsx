
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FiLock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [checking, setChecking] = useState(true);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow this page for password recovery flows
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const type = params.get("type");
    
    if (type === "recovery") {
      setValidSession(true);
      setChecking(false);
      return;
    }

    // Check URL search params too (some flows use query params)
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("type") === "recovery") {
      setValidSession(true);
      setChecking(false);
      return;
    }

    // Listen for PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setValidSession(true);
        setChecking(false);
      }
    });

    // If no recovery event after 3 seconds, redirect away
    const timeout = setTimeout(() => {
      setChecking(false);
      if (!validSession) {
        navigate("/admin/login");
      }
    }, 3000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setMessage("Passwords do not match."); setStatus("error"); return; }
    if (password.length < 6) { setMessage("Password must be at least 6 characters."); setStatus("error"); return; }
    setLoading(true);
    const ok = await updatePassword(password);
    setLoading(false);
    if (ok) {
      setStatus("success");
      setMessage("Password updated successfully. You can now login with your new password.");
    } else {
      setStatus("error");
      setMessage("Failed to update password. The link may have expired.");
    }
  };

  if (checking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!validSession) return null;

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md px-4">
        <div className="admin-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
              <FiLock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Set New Password</h1>
            <p className="text-sm text-muted-foreground mt-1">JCSAM Admin Portal</p>
          </div>

          {status === "success" ? (
            <div className="text-center space-y-4">
              <FiCheckCircle className="w-14 h-14 text-green-500 mx-auto" />
              <p className="text-foreground font-semibold">{message}</p>
              <button onClick={() => navigate("/admin/login")} className="btn-primary w-full text-sm mt-4">
                Go to Login
              </button>
            </div>
          ) : (
            <>
              {status === "error" && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                  <FiAlertCircle /> {message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Min 6 characters"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="password"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Repeat password"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
