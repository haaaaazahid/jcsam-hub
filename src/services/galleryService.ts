import { supabaseAdmin } from "@/integrations/supabase/adminClient";

export const galleryService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from("gallery")
      .select("*, sports(name)")
      .order("date", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { id, created_at, updated_at, sports, ...payload } = item;
    const { error } = await supabaseAdmin.from("gallery").insert(payload);
    if (error) throw new Error(error.message);
  },

  async update(item: any) {
    const { id, created_at, updated_at, sports, ...rest } = item;
    const { error } = await supabaseAdmin.from("gallery").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async remove(id: string) {
    const { error } = await supabaseAdmin.from("gallery").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};