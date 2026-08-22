import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiAlertCircle } from "react-icons/fi";

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md px-4">
        <div className="admin-card p-8 text-center">
          <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
            <FiLock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Password Reset Unavailable</h1>
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2 justify-center">
            <FiAlertCircle /> Self-service password reset isn't set up yet.
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Please contact a system administrator to reset your admin password directly in the Admins sheet.
          </p>
          <button onClick={() => navigate("/admin/login")} className="btn-primary w-full text-sm">
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;