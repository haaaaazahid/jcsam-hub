import { supabase } from "@/integrations/supabase/client";

export const resultService = {
  async getAll() {
    const { data, error } = await supabase
      .from("results")
      .select("*, schedules(title, date)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { schedule_id, winner, score, summary, position } = item;
    const { error } = await supabase.from("results").insert({
      schedule_id: schedule_id || null,
      winner,
      score,
      summary,
      position,
    });
    if (error) throw error;
  },

  async update(item: any) {
    const { id, created_at, updated_at, schedules, sports, ...rest } = item;
    const { error } = await supabase.from("results").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("results").delete().eq("id", id);
    if (error) throw error;
  },
};