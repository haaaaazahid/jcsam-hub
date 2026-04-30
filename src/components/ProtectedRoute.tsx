import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FiLoader } from "react-icons/fi";

const ADMIN_EMAIL = "juniorcollegesportsassociation@gmail.com";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ❌ Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ Logged in but NOT admin
  if (user && user.email !== ADMIN_EMAIL) {
    alert("Access denied: Only admin allowed");
    return <Navigate to="/" replace />;
  }

  // ✅ Admin access
  return <>{children}</>;
};

export default ProtectedRoute;