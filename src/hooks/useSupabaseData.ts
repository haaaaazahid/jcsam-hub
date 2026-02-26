
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sportService } from "@/services/sportService";
import { collegeService } from "@/services/collegeService";
import { playerService } from "@/services/playerService";
import { scheduleService } from "@/services/scheduleService";
import { resultService } from "@/services/resultService";
import { noticeService } from "@/services/noticeService";
import { committeeService } from "@/services/committeeService";
import { galleryService } from "@/services/galleryService";
import { dashboardService } from "@/services/dashboardService";

// ============ SPORTS ============
export function useSports() {
  return useQuery({ queryKey: ["sports"], queryFn: () => sportService.getAll() });
}

export function useCreateSport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sport: any) => sportService.create(sport),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["sports"] }); toast.success("Sport added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateSport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sport: any) => sportService.update(sport),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["sports"] }); toast.success("Sport updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteSport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => sportService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["sports"] }); toast.success("Sport deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ SPORT IMAGES ============
export function useSportImages(sportId?: string) {
  return useQuery({
    queryKey: ["sport-images", sportId],
    queryFn: () => sportService.getImages(sportId!),
    enabled: !!sportId,
  });
}

export function useAddSportImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (img: { sport_id: string; url: string; caption: string; display_order?: number }) => sportService.addImage(img),
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ["sport-images", v.sport_id] }); toast.success("Image added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteSportImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, sportId }: { id: string; sportId: string }) => sportService.deleteImage(id),
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ["sport-images", v.sportId] }); toast.success("Image removed!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ COLLEGES ============
export function useColleges() {
  return useQuery({ queryKey: ["colleges"], queryFn: () => collegeService.getAll() });
}

export function useCreateCollege() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (col: any) => collegeService.create(col),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["colleges"] }); toast.success("College added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateCollege() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (col: any) => collegeService.update(col),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["colleges"] }); toast.success("College updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteCollege() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => collegeService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["colleges"] }); toast.success("College deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ PLAYERS ============
export function usePlayers() {
  return useQuery({ queryKey: ["players"], queryFn: () => playerService.getAll() });
}

export function useCreatePlayer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: any) => playerService.create(p),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["players"] }); toast.success("Player added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdatePlayer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: any) => playerService.update(p),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["players"] }); toast.success("Player updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeletePlayer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => playerService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["players"] }); toast.success("Player deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ SCHEDULES ============
export function useSchedules() {
  return useQuery({ queryKey: ["schedules"], queryFn: () => scheduleService.getAll() });
}

export function useCreateSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (s: any) => scheduleService.create(s),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["schedules"] }); toast.success("Schedule added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (s: any) => scheduleService.update(s),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["schedules"] }); toast.success("Schedule updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => scheduleService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["schedules"] }); toast.success("Schedule deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ RESULTS ============
export function useResults() {
  return useQuery({ queryKey: ["results"], queryFn: () => resultService.getAll() });
}

export function useCreateResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (r: any) => resultService.create(r),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["results"] }); toast.success("Result added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (r: any) => resultService.update(r),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["results"] }); toast.success("Result updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resultService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["results"] }); toast.success("Result deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ NOTICES ============
export function useNotices() {
  return useQuery({ queryKey: ["notices"], queryFn: () => noticeService.getAll() });
}

export function useCreateNotice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (n: any) => noticeService.create(n),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notices"] }); toast.success("Notice added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateNotice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (n: any) => noticeService.update(n),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notices"] }); toast.success("Notice updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteNotice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => noticeService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notices"] }); toast.success("Notice deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ COMMITTEE ============
export function useCommittee() {
  return useQuery({ queryKey: ["committee"], queryFn: () => committeeService.getAll() });
}

export function useCreateCommitteeMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (m: any) => committeeService.create(m),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["committee"] }); toast.success("Member added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateCommitteeMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (m: any) => committeeService.update(m),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["committee"] }); toast.success("Member updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteCommitteeMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => committeeService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["committee"] }); toast.success("Member deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ GALLERY ============
export function useGallery() {
  return useQuery({ queryKey: ["gallery"], queryFn: () => galleryService.getAll() });
}

export function useCreateGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (g: any) => galleryService.create(g),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast.success("Image added!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (g: any) => galleryService.update(g),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast.success("Image updated!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => galleryService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gallery"] }); toast.success("Image deleted!"); },
    onError: (e: any) => toast.error(e.message),
  });
}

// ============ DASHBOARD STATS ============
export function useDashboardStats() {
  return useQuery({ queryKey: ["dashboard-stats"], queryFn: () => dashboardService.getStats() });
}
