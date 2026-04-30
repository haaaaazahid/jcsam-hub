import { supabaseAdmin } from "@/integrations/supabase/adminClient";

export const collegeService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from("colleges")
      .select("*")
      .order("name");
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { id, created_at, updated_at, ...payload } = item;
    const { error } = await supabaseAdmin.from("colleges").insert(payload);
    if (error) throw new Error(error.message);
  },

  async update(item: any) {
    const { id, created_at, updated_at, ...payload } = item;
    const { error } = await supabaseAdmin.from("colleges").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async remove(id: string) {
    const { error } = await supabaseAdmin.from("colleges").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};