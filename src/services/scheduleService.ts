import { supabase } from "@/integrations/supabase/client";

export const scheduleService = {
  async getAll() {
    const { data, error } = await supabase.from("schedules").select("*, sports(name, icon)").order("date");
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { error } = await supabase.from("schedules").insert(item);
    if (error) throw error;
  },

  async update(item: any) {
    const { id, created_at, updated_at, sports, ...rest } = item;
    const { error } = await supabase.from("schedules").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("schedules").delete().eq("id", id);
    if (error) throw error;
  },
};
