import { supabase } from "@/integrations/supabase/client";

export const noticeService = {
  async getAll() {
    const { data, error } = await supabase.from("notices").select("*, sports(name)").order("date", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { error } = await supabase.from("notices").insert(item);
    if (error) throw error;
  },

  async update(item: any) {
    const { id, created_at, updated_at, sports, ...rest } = item;
    const { error } = await supabase.from("notices").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("notices").delete().eq("id", id);
    if (error) throw error;
  },
};
