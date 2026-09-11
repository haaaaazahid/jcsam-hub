// ============================================================
// JCSAM HUB - DASHBOARD SERVICE
// SINGLE APPS SCRIPT DASHBOARD REQUEST
// ============================================================

import { apiGet, getAdminToken } from "@/services/api";

function normalizeArray(value: any): any[] {
  if (Array.isArray(value)) return value;

  if (value && Array.isArray(value.data)) {
    return value.data;
  }

  if (value && Array.isArray(value.rows)) {
    return value.rows;
  }

  if (value && Array.isArray(value.records)) {
    return value.records;
  }

  return [];
}

export const dashboardService = {
  async getStats() {
    const token = getAdminToken();

    if (!token) {
      return {
        colleges: [],
        players: [],
        schedules: [],
        notices: [],
        sports: [],
      };
    }

    const response = await apiGet<any>("dashboard", {
      token,
    });

    return {
      colleges: normalizeArray(response?.colleges),
      players: normalizeArray(response?.players),
      schedules: normalizeArray(response?.schedules),
      notices: normalizeArray(response?.notices),
      sports: normalizeArray(response?.sports),
    };
  },
};

export default dashboardService;