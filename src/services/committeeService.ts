import { supabaseAdmin } from "@/integrations/supabase/adminClient";

export const committeeService = {
  async getAll() {

    const { data, error } = await supabaseAdmin
      .from("committee_members")
      .select("*")
      .order("display_order");
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const { id, created_at, updated_at, ...payload } = item;
    const { error } = await supabaseAdmin.from("committee_members").insert(payload);
    if (error) throw new Error(error.message);
  },

  async update(item: any) {
    const { id, created_at, updated_at, ...rest } = item;
    const { error } = await supabaseAdmin.from("committee_members").update(rest).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async remove(id: string) {
    const { error } = await supabaseAdmin.from("committee_members").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};