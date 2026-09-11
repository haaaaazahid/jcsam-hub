import { apiGet, getAdminToken } from "@/services/api";

export interface DashboardResponse {
  success: boolean;
  colleges?: any[];
  players?: any[];
  schedules?: any[];
  notices?: any[];
  sports?: any[];
  timestamp?: string;
  error?: string;
}

export const dashboardService = {
  async getStats(): Promise<DashboardResponse> {
    const token = getAdminToken();

    if (!token) {
      return {
        success: true,
        colleges: [],
        players: [],
        schedules: [],
        notices: [],
        sports: [],
      };
    }

    const response = await apiGet<DashboardResponse>("dashboard", {
      token,
    });

    if (!response?.success) {
      throw new Error(
        response?.error || "Failed to load dashboard data"
      );
    }

    return response;
  },
};

export default dashboardService;
