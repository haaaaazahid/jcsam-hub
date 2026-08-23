import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FiLoader } from "react-icons/fi";

// ============================================================
// PROTECTED ROUTE
//
// This used to hardcode a single allowed admin email and block
// anyone else, even after a valid backend-authenticated login.
// That silently locked out any second admin added to the
// Admins sheet. Authentication and authorization for "is this
// person an admin" already happens server-side (the Apps Script
// backend only issues a session token to a valid row in the
// Admins sheet) - this component just needs to check that a
// valid session exists.
// ============================================================

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in, or session data is missing/corrupt
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Any admin authenticated by the backend is allowed through
  return <>{children}</>;
};

export default ProtectedRoute;
