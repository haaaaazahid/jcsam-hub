import { supabase } from "@/integrations/supabase/client";

export const galleryService = {
  async getAll() {
    const { data, error } = await supabase.from("gallery").select("*, sports(name)").order("date", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { error } = await supabase.from("gallery").insert(item);
    if (error) throw error;
  },

  async update(item: any) {
    const { id, created_at, updated_at, sports, ...rest } = item;
    const { error } = await supabase.from("gallery").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) throw error;
  },
};
