import { supabase } from "@/integrations/supabase/client";

export const authService = {
  async login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { success: !error, error: error?.message };
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async resetPassword(email: string, redirectUrl: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    return { success: !error, error: error?.message };
  },

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { success: !error, error: error?.message };
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
