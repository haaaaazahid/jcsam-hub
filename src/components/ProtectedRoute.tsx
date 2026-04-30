
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, user, logout } = useAuth();
  
  // Temporarily unlocking the route so the final admin can log in and sign up.
  // We will re-lock this once the final admin account relies on it.
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      // Temporary unlock: allow anyone authenticated.
      // toast.success("Temporary backdoor access granted.");
    }
  }, [loading, isAuthenticated, user, logout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  
  // Render children only if they represent a valid admin
  // if (user && user.email !== 'juniorcollegesportsassociation@gmail.com') {
  //   return <Navigate to="/admin/login" replace />;
  // }
  
  return <>{children}</>;
};

export default ProtectedRoute;
