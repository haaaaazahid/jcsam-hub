import { supabase } from "@/integrations/supabase/client";

export const resultService = {
  async getAll() {
    const { data, error } = await supabase.from("results").select("*, sports(name), schedules(title)").order("date", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { error } = await supabase.from("results").insert(item);
    if (error) throw error;
  },

  async update(item: any) {
    const { id, created_at, updated_at, sports, schedules, ...rest } = item;
    const { error } = await supabase.from("results").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("results").delete().eq("id", id);
    if (error) throw error;
  },
};
