import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  login,
  logout,
  getAdminToken,
  getAdmin,
  setAdminSession,
  clearAdminSession,
} from "@/services/api";

// ============================================================
// TYPES
// ============================================================

interface Admin {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface Session {
  token: string;
  admin: Admin;
}

interface AuthContextType {
  user: Admin | null;
  session: Session | null;
  loading: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;

  signOut: () => Promise<void>;

  isAuthenticated: boolean;
}

// ============================================================
// CONTEXT
// ============================================================

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

// ============================================================
// PROVIDER
// ============================================================

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<Admin | null>(null);

  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  // ==========================================================
  // RESTORE EXISTING ADMIN SESSION
  // ==========================================================

  useEffect(() => {
    try {
      const token = getAdminToken();
      const admin = getAdmin();

      if (token && admin) {
        setSession({
          token,
          admin,
        });

        setUser(admin);
      }
    } catch {
      clearAdminSession();
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // SIGN IN
  // ==========================================================

  const signIn = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{
      success: boolean;
      error?: string;
    }> => {
      try {
        const result = await login(
          email,
          password
        );

        const admin = result.admin || {};

        // api.ts already stores the session,
        // but explicitly syncing here keeps AuthContext
        // immediately consistent.
        setAdminSession(
          result.token,
          admin
        );

        const newSession: Session = {
          token: result.token,
          admin,
        };

        setSession(newSession);
        setUser(admin);

        return {
          success: true,
        };
      } catch (error: any) {
        clearAdminSession();

        setSession(null);
        setUser(null);

        return {
          success: false,
          error:
            error?.message ||
            "Login failed",
        };
      }
    },
    []
  );

  // ==========================================================
  // SIGN OUT
  // ==========================================================

  const signOut = useCallback(
    async (): Promise<void> => {
      try {
        await logout();
      } catch {
        // Server logout failure should not prevent
        // clearing the local session.
        clearAdminSession();
      }

      setSession(null);
      setUser(null);
    },
    []
  );

  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signOut,
        isAuthenticated:
          !!session?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ============================================================
// useAuth HOOK
// ============================================================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default AuthContext;