import { supabase } from "@/integrations/supabase/client";

export const collegeService = {
  async getAll() {
    const { data, error } = await supabase.from("colleges").select("*").order("name");
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { error } = await supabase.from("colleges").insert(item);
    if (error) throw error;
  },

  async update(item: any) {
    const { id, created_at, updated_at, ...rest } = item;
    const { error } = await supabase.from("colleges").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("colleges").delete().eq("id", id);
    if (error) throw error;
  },
};
