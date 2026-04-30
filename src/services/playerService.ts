import { supabaseAdmin } from "@/integrations/supabase/adminClient";

const cleanPlayer = (item: any) => {
  const { id, created_at, updated_at, colleges, sports, ...rest } = item;
  return rest;
};

export const playerService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from("players")
      .select("*, colleges(name), sports(name)")
      .order("name");
    if (error) throw error;
    return data ?? [];
  },

  async create(item: any) {
    const payload = cleanPlayer(item);
    const { error } = await supabaseAdmin.from("players").insert(payload);
    if (error) throw new Error(error.message);
  },

  async update(item: any) {
    const { id } = item;
    const payload = cleanPlayer(item);
    const { error } = await supabaseAdmin.from("players").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async remove(id: string) {
    const { error } = await supabaseAdmin.from("players").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};