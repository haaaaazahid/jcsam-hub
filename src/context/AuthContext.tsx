import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; role: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(() => {
    const saved = localStorage.getItem("jcsam_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      const u = { username: "admin", role: "admin" };
      setUser(u);
      localStorage.setItem("jcsam_user", JSON.stringify(u));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("jcsam_user");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
