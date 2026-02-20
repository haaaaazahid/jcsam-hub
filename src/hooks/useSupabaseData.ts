
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ============ SPORTS ============
export function useSports() {
  return useQuery({
    queryKey: ["sports"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sports").select("*").order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateSport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sport: any) => {
      const { error } = await supabase.from("sports").insert(sport);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["sports"] }); toast.success("Sport added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateSport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sport: any) => {
      const { id, created_at, updated_at, ...rest } = sport;
      const { error } = await supabase.from("sports").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["sports"] }); toast.success("Sport updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteSport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("sports").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["sports"] }); toast.success("Sport deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ SPORT IMAGES ============
export function useSportImages(sportId?: string) {
  return useQuery({
    queryKey: ["sport-images", sportId],
    queryFn: async () => {
      let q = supabase.from("sport_images").select("*").order("display_order");
      if (sportId) q = q.eq("sport_id", sportId);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!sportId,
  });
}

export function useAddSportImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (img: { sport_id: string; url: string; caption: string; display_order?: number }) => {
      const { error } = await supabase.from("sport_images").insert(img);
      if (error) throw error;
    },
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ["sport-images", v.sport_id] }); toast.success("Image added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteSportImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, sportId }: { id: string; sportId: string }) => {
      const { error } = await supabase.from("sport_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ["sport-images", v.sportId] }); toast.success("Image removed!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ COLLEGES ============
export function useColleges() {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const { data, error } = await supabase.from("colleges").select("*").order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateCollege() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (col: any) => {
      const { error } = await supabase.from("colleges").insert(col);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["colleges"] }); toast.success("College added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateCollege() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (col: any) => {
      const { id, created_at, updated_at, ...rest } = col;
      const { error } = await supabase.from("colleges").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["colleges"] }); toast.success("College updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteCollege() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("colleges").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["colleges"] }); toast.success("College deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ PLAYERS ============
export function usePlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const { data, error } = await supabase.from("players").select("*, colleges(name), sports(name)").order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreatePlayer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: any) => {
      const { error } = await supabase.from("players").insert(p);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["players"] }); toast.success("Player added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdatePlayer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: any) => {
      const { id, created_at, updated_at, colleges, sports, ...rest } = p;
      const { error } = await supabase.from("players").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["players"] }); toast.success("Player updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeletePlayer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("players").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["players"] }); toast.success("Player deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ SCHEDULES ============
export function useSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schedules").select("*, sports(name, icon)").order("date");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (s: any) => {
      const { error } = await supabase.from("schedules").insert(s);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["schedules"] }); toast.success("Schedule added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (s: any) => {
      const { id, created_at, updated_at, sports, ...rest } = s;
      const { error } = await supabase.from("schedules").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["schedules"] }); toast.success("Schedule updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("schedules").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["schedules"] }); toast.success("Schedule deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ RESULTS ============
export function useResults() {
  return useQuery({
    queryKey: ["results"],
    queryFn: async () => {
      const { data, error } = await supabase.from("results").select("*, sports(name), schedules(title)").order("date", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (r: any) => {
      const { error } = await supabase.from("results").insert(r);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["results"] }); toast.success("Result added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (r: any) => {
      const { id, created_at, updated_at, sports, schedules, ...rest } = r;
      const { error } = await supabase.from("results").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["results"] }); toast.success("Result updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("results").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["results"] }); toast.success("Result deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ NOTICES ============
export function useNotices() {
  return useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("notices").select("*, sports(name)").order("date", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateNotice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (n: any) => {
      const { error } = await supabase.from("notices").insert(n);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notices"] }); toast.success("Notice added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateNotice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (n: any) => {
      const { id, created_at, updated_at, sports, ...rest } = n;
      const { error } = await supabase.from("notices").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notices"] }); toast.success("Notice updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteNotice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notices").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notices"] }); toast.success("Notice deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ COMMITTEE ============
export function useCommittee() {
  return useQuery({
    queryKey: ["committee"],
    queryFn: async () => {
      const { data, error } = await supabase.from("committee_members").select("*").order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateCommitteeMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m: any) => {
      const { error } = await supabase.from("committee_members").insert(m);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["committee"] }); toast.success("Member added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateCommitteeMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m: any) => {
      const { id, created_at, updated_at, ...rest } = m;
      const { error } = await supabase.from("committee_members").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["committee"] }); toast.success("Member updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteCommitteeMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("committee_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["committee"] }); toast.success("Member deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ GALLERY ============
export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*, sports(name)").order("date", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (g: any) => {
      const { error } = await supabase.from("gallery").insert(g);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast.success("Image added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (g: any) => {
      const { id, created_at, updated_at, sports, ...rest } = g;
      const { error } = await supabase.from("gallery").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast.success("Image updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast.success("Image deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ DASHBOARD STATS ============
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [colleges, players, schedules, notices, sports] = await Promise.all([
        supabase.from("colleges").select("id, status"),
        supabase.from("players").select("id, status, sport_id"),
        supabase.from("schedules").select("id, status, title, date, sport_id"),
        supabase.from("notices").select("id"),
        supabase.from("sports").select("id, name"),
      ]);
      return {
        colleges: colleges.data ?? [],
        players: players.data ?? [],
        schedules: schedules.data ?? [],
        notices: notices.data ?? [],
        sports: sports.data ?? [],
      };
    },
  });
}
