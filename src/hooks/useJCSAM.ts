import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

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

// ============================================================
// SPORTS
// ============================================================

export function useSports() {
  return useQuery({
    queryKey: ["sports"],
    queryFn: () => sportService.getAll(),
    staleTime: 60_000,
  });
}

export function useCreateSport() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (sport: any) => sportService.create(sport),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sports"] });
      toast.success("Sport added!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to add sport");
    },
  });
}

export function useUpdateSport() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (sport: any) => sportService.update(sport),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sports"] });
      toast.success("Sport updated!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update sport");
    },
  });
}

export function useDeleteSport() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sportService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sports"] });
      toast.success("Sport deleted!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete sport");
    },
  });
}

// ============================================================
// SPORT IMAGES
// ============================================================

export function useSportImages(sportId?: string) {
  return useQuery({
    queryKey: ["sport-images", sportId],
    queryFn: () => {
      if (!sportId) {
        throw new Error("Sport ID is required");
      }

      return sportService.getImages(sportId);
    },
    enabled: Boolean(sportId),
    staleTime: 60_000,
  });
}

export function useAddSportImage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (image: {
      sport_id: string;
      url: string;
      caption: string;
      display_order?: number;
    }) => sportService.addImage(image),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: ["sport-images", variables.sport_id],
      });

      toast.success("Image added!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to add image");
    },
  });
}

export function useDeleteSportImage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
    }: {
      id: string;
      sportId: string;
    }) => sportService.deleteImage(id),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: ["sport-images", variables.sportId],
      });

      toast.success("Image removed!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to remove image");
    },
  });
}

// ============================================================
// COLLEGES
// ============================================================

export function useColleges() {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: () => collegeService.getAll(),
    staleTime: 60_000,
  });
}

// ============================================================
// PUBLIC COLLEGE REGISTRATION
// ============================================================

export function useRegisterCollege() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (college: Record<string, any>) =>
      collegeService.register(college),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["colleges"],
      });

      toast.success(
        "College registration submitted successfully!"
      );
    },

    onError: (error: any) => {
      toast.error(
        error?.message ||
          "Failed to submit college registration"
      );
    },
  });
}

// ============================================================
// ADMIN COLLEGE CRUD
// ============================================================

export function useCreateCollege() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (college: any) =>
      collegeService.create(college),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["colleges"],
      });

      toast.success("College added!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to add college");
    },
  });
}

export function useUpdateCollege() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (college: any) =>
      collegeService.update(college),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["colleges"],
      });

      toast.success("College updated!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update college");
    },
  });
}

export function useDeleteCollege() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      collegeService.remove(id),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["colleges"],
      });

      toast.success("College deleted!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete college");
    },
  });
}

// ============================================================
// PLAYERS
// ============================================================

export function usePlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: () => playerService.getAll(),
    staleTime: 60_000,
  });
}

// ============================================================
// PUBLIC PLAYER REGISTRATION
// ============================================================

export function useRegisterPlayer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (player: Record<string, any>) =>
      playerService.register(player),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["players"],
      });

      toast.success(
        "Player registration submitted successfully!"
      );
    },

    onError: (error: any) => {
      toast.error(
        error?.message ||
          "Failed to submit player registration"
      );
    },
  });
}

// ============================================================
// ADMIN PLAYER CRUD
// ============================================================

export function useCreatePlayer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (player: any) =>
      playerService.create(player),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["players"],
      });

      toast.success("Player added!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to add player");
    },
  });
}

export function useUpdatePlayer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (player: any) =>
      playerService.update(player),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["players"],
      });

      toast.success("Player updated!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update player");
    },
  });
}

export function useDeletePlayer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      playerService.remove(id),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["players"],
      });

      toast.success("Player deleted!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete player");
    },
  });
}

// ============================================================
// SCHEDULES
// ============================================================

export function useSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: () => scheduleService.getAll(),
    staleTime: 30_000,
  });
}

export function useCreateSchedule() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (schedule: any) =>
      scheduleService.create(schedule),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["schedules"],
      });

      toast.success("Schedule added!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to add schedule");
    },
  });
}

export function useUpdateSchedule() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (schedule: any) =>
      scheduleService.update(schedule),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["schedules"],
      });

      toast.success("Schedule updated!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update schedule");
    },
  });
}

export function useDeleteSchedule() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      scheduleService.remove(id),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["schedules"],
      });

      toast.success("Schedule deleted!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete schedule");
    },
  });
}

// ============================================================
// RESULTS
// ============================================================

export function useResults() {
  return useQuery({
    queryKey: ["results"],
    queryFn: () => resultService.getAll(),
    staleTime: 60_000,
  });
}

export function useCreateResult() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (result: any) =>
      resultService.create(result),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["results"],
      });

      toast.success("Result added!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to add result");
    },
  });
}

export function useUpdateResult() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (result: any) =>
      resultService.update(result),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["results"],
      });

      toast.success("Result updated!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update result");
    },
  });
}

export function useDeleteResult() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      resultService.remove(id),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["results"],
      });

      toast.success("Result deleted!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete result");
    },
  });
}

// ============================================================
// NOTICES
// ============================================================

export function useNotices() {
  return useQuery({
    queryKey: ["notices"],
    queryFn: () => noticeService.getAll(),
    staleTime: 30_000,
  });
}

export function useCreateNotice() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (notice: any) =>
      noticeService.create(notice),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["notices"],
      });

      toast.success("Notice added!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to add notice");
    },
  });
}

export function useUpdateNotice() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (notice: any) =>
      noticeService.update(notice),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["notices"],
      });

      toast.success("Notice updated!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update notice");
    },
  });
}

export function useDeleteNotice() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      noticeService.remove(id),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["notices"],
      });

      toast.success("Notice deleted!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete notice");
    },
  });
}

// ============================================================
// COMMITTEE
// ============================================================

export function useCommittee() {
  return useQuery({
    queryKey: ["committee"],
    queryFn: () => committeeService.getAll(),
    staleTime: 300_000,
  });
}

export function useCreateCommitteeMember() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (member: any) =>
      committeeService.create(member),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["committee"],
      });

      toast.success("Member added!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to add member");
    },
  });
}

export function useUpdateCommitteeMember() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (member: any) =>
      committeeService.update(member),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["committee"],
      });

      toast.success("Member updated!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update member");
    },
  });
}

export function useDeleteCommitteeMember() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      committeeService.remove(id),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["committee"],
      });

      toast.success("Member deleted!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete member");
    },
  });
}

// ============================================================
// GALLERY
// ============================================================

export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: () => galleryService.getAll(),
    staleTime: 300_000,
  });
}

export function useCreateGalleryItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (item: any) =>
      galleryService.create(item),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["gallery"],
      });

      toast.success("Image added!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to add image");
    },
  });
}

export function useUpdateGalleryItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (item: any) =>
      galleryService.update(item),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["gallery"],
      });

      toast.success("Image updated!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to update image");
    },
  });
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      galleryService.remove(id),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["gallery"],
      });

      toast.success("Image deleted!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete image");
    },
  });
}

// ============================================================
// DASHBOARD
// ============================================================

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => dashboardService.getStats(),
    staleTime: 30_000,
  });
}