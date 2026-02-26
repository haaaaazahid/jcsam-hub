import { supabase } from "@/integrations/supabase/client";

export const sportService = {
  async getAll() {
    const { data, error } = await supabase.from("sports").select("*").order("name");
    if (error) throw error;
    return data ?? [];
  },

  async create(sport: any) {
    const { error } = await supabase.from("sports").insert(sport);
    if (error) throw error;
  },

  async update(sport: any) {
    const { id, created_at, updated_at, ...rest } = sport;
    const { error } = await supabase.from("sports").update(rest).eq("id", id);
    if (error) throw error;
  },

  async remove(id: string) {
    const { error } = await supabase.from("sports").delete().eq("id", id);
    if (error) throw error;
  },

  async getImages(sportId: string) {
    const { data, error } = await supabase.from("sport_images").select("*").eq("sport_id", sportId).order("display_order");
    if (error) throw error;
    return data ?? [];
  },

  async addImage(img: { sport_id: string; url: string; caption: string; display_order?: number }) {
    const { error } = await supabase.from("sport_images").insert(img);
    if (error) throw error;
  },

  async deleteImage(id: string) {
    const { error } = await supabase.from("sport_images").delete().eq("id", id);
    if (error) throw error;
  },
};
