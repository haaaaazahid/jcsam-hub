// ============================================================
// JCSAM HUB - AUTH SERVICE
// GOOGLE SHEETS / APPS SCRIPT
// ============================================================

import {
  login,
  logout,
  getAdminToken,
  getAdmin,
  setAdminSession,
  clearAdminSession,
} from "@/services/api";

export const authService = {
  // ==========================================================
  // LOGIN
  // ==========================================================

  async login(
    email: string,
    password: string
  ) {
    try {
      const result =
        await login(
          email,
          password
        );

      if (
        result.token
      ) {
        setAdminSession(
          result.token,
          result.admin || {}
        );
      }

      return {
        success: true,
        token: result.token,
        admin: result.admin || {},
      };
    } catch (error: any) {
      return {
        success: false,
        error:
          error?.message ||
          "Login failed",
      };
    }
  },

  // ==========================================================
  // LOGOUT
  // ==========================================================

  async logout() {
    try {
      await logout();
    } catch {
      clearAdminSession();
    }
  },

  // ==========================================================
  // RESET PASSWORD
  // ==========================================================

  async resetPassword() {
    return {
      success: false,
      error:
        "Password reset is not currently available.",
    };
  },

  // ==========================================================
  // UPDATE PASSWORD
  // ==========================================================

  async updatePassword() {
    return {
      success: false,
      error:
        "Password update is not currently available.",
    };
  },

  // ==========================================================
  // GET SESSION
  // ==========================================================

  async getSession() {
    const token =
      getAdminToken();

    const admin =
      getAdmin();

    if (
      !token ||
      !admin
    ) {
      return null;
    }

    return {
      token,
      admin,
    };
  },

  // ==========================================================
  // AUTH STATE CHANGE
  // ==========================================================

  onAuthStateChange(
    callback: (
      event: string,
      session: any
    ) => void
  ) {
    // Google Sheets/App Script does not provide
   

    return {
      data: {
        subscription: {
          unsubscribe() {
            // Intentionally empty.
          },
        },
      },
    };
  },
};
