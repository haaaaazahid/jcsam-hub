import { supabase } from "@/integrations/supabase/client";

export const committeeService = {
  async getAll() {
    const { data, error } = await supabase.from("committee_members").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { error } = await supabase.from("committee_members").insert(item);
    if (error) throw error;
  },

  async update(item: any) {
    const { id, created_at, updated_at, ...rest } = item;
    const { error } = await supabase.from("committee_members").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("committee_members").delete().eq("id", id);
    if (error) throw error;
  },
};
