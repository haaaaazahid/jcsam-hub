import { supabase } from "@/integrations/supabase/client";

export const playerService = {
  async getAll() {
    const { data, error } = await supabase.from("players").select("*, colleges(name), sports(name)").order("name");
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { error } = await supabase.from("players").insert(item);
    if (error) throw error;
  },

  async update(item: any) {
    const { id, created_at, updated_at, colleges, sports, ...rest } = item;
    const { error } = await supabase.from("players").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("players").delete().eq("id", id);
    if (error) throw error;
  },
};
