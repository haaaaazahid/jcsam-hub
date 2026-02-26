import { supabase } from "@/integrations/supabase/client";

export const dashboardService = {
  async getStats() {
    const [colleges, players, schedules, notices, sports] = await Promise.all([
      supabase.from("colleges").select("id, status"),
      supabase.from("players").select("id, status, sport_id"),
      supabase.from("schedules").select("id, status, title, date, sport_id"),
      supabase.from("notices").select("id"),
      supabase.from("sports").select("id, name"),
    ]);
    return {
      colleges: colleges.data ?? [],
      players: players.data ?? [],
      schedules: schedules.data ?? [],
      notices: notices.data ?? [],
      sports: sports.data ?? [],
    };
  },
};
