import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  FiLock,
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [tab, setTab] =
    useState<"login" | "forgot">("login");

  const [forgotEmail, setForgotEmail] =
    useState("");

  const [forgotSent, setForgotSent] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    signIn,
    isAuthenticated,
    user,
  } = useAuth();

  const navigate = useNavigate();

  // ============================================================
  // REDIRECT IF ALREADY AUTHENTICATED
  // ============================================================

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/admin", {
        replace: true,
      });
    }
  }, [
    isAuthenticated,
    user,
    navigate,
  ]);

  if (isAuthenticated) {
    return null;
  }

  // ============================================================
  // EMAIL/PASSWORD LOGIN
  // ============================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn(
        email.trim(),
        password
      );

      if (result.success) {
        toast.success(
          "Login successful!"
        );

        navigate("/admin", {
          replace: true,
        });
      } else {
        setError(
          result.error ||
            "Invalid email or password. Please try again."
        );
      }
    } catch (err: any) {
      setError(
        err?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // FORGOT PASSWORD
  // ============================================================

  const handleForgot = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    /*
     * Google Apps Script authentication currently
     * does not provide a password-reset endpoint.
     *
     * We therefore don't pretend that an email
     * was actually sent.
     */

    toast.info(
      "Password reset is not currently available. Please contact the JCSAM administrator."
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="w-full max-w-md px-4"
      >
        <div className="admin-card p-8">

          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <div className="text-center mb-8">

            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center"
            >
              <FiLock className="w-8 h-8 text-primary-foreground" />
            </motion.div>

            <h1 className="text-2xl font-display font-bold text-foreground">
              Admin Login
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              JCSAM Management Portal
            </p>

            <p className="text-xs text-muted-foreground mt-2 bg-muted/50 p-2 rounded border border-border inline-block">
              Secure administrator access
            </p>

          </div>

          {/* ================================================== */}
          {/* LOGIN TAB */}
          {/* ================================================== */}

          {tab === "login" ? (
            <>
              {/* ERROR */}
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2"
                >
                  <FiAlertCircle className="shrink-0" />

                  <span>
                    {error}
                  </span>
                </motion.div>
              )}

              {/* ================================================== */}
              {/* LOGIN FORM */}
              {/* ================================================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>

                  <div className="relative">

                    <FiMail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      required
                      autoComplete="username"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="juniorcollegesportsassociation@gmail.com"
                    />

                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>

                  <div className="relative">

                    <FiLock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      required
                      autoComplete="current-password"
                      className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••••••"
                    />

                    {/* SHOW/HIDE PASSWORD */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      title={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>

                  </div>
                </div>

                {/* SIGN IN */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </button>

              </form>

              {/* ================================================== */}
              {/* FORGOT PASSWORD */}
              {/* ================================================== */}

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setTab("forgot");
                }}
                className="w-full text-center text-sm text-primary hover:underline mt-4"
              >
                Forgot Password?
              </button>

            </>
          ) : (

            /* ================================================== */
            /* FORGOT PASSWORD TAB */
            /* ================================================== */

            <>
              {forgotSent ? (

                <div className="text-center space-y-4">

                  <div className="w-14 h-14 rounded-full bg-success/10 mx-auto flex items-center justify-center">
                    <FiCheckCircle className="w-7 h-7 text-success" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Password reset instructions
                    are not currently available.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setTab("login");
                      setForgotSent(
                        false
                      );
                      setForgotEmail("");
                    }}
                    className="btn-primary w-full text-sm"
                  >
                    Back to Login
                  </button>

                </div>

              ) : (

                <>
                  {/* BACK */}
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setTab("login");
                    }}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
                  >
                    <FiArrowLeft />

                    Back to Login
                  </button>

                  <p className="text-sm text-muted-foreground mb-4">
                    Password reset is
                    currently unavailable
                    for the Google Apps Script
                    authentication system.
                  </p>

                  <form
                    onSubmit={handleForgot}
                    className="space-y-4"
                  >

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Admin Email
                      </label>

                      <div className="relative">

                        <FiMail
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />

                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) =>
                            setForgotEmail(
                              e.target.value
                            )
                          }
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="juniorcollegesportsassociation@gmail.com"
                        />

                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full text-sm"
                    >
                      Request Password Reset
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