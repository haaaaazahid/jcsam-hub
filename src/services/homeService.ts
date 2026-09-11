// ============================================================
// JCSAM HUB - HOMEPAGE SERVICE
// SINGLE APPS SCRIPT HOMEPAGE REQUEST
// ============================================================

import { apiGet } from "@/services/api";

export interface HomeResponse {
  success: boolean;
  sports?: any[];
  activeCollegeCount?: number;
  activePlayerCount?: number;
  matchCount?: number;
  upcomingMatches?: any[];
  notices?: any[];
  currentSeason?: string;
  timestamp?: string;
}

export const homeService = {
  async getData(): Promise<HomeResponse> {
    const response = await apiGet<HomeResponse>("home");

    if (!response?.success) {
      throw new Error(
        response?.error || "Failed to load homepage data"
      );
    }

    return response;
  },
};

export default homeService;