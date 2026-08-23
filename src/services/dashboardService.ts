// ============================================================
// JCSAM HUB - DASHBOARD SERVICE
// GOOGLE SHEETS / APPS SCRIPT VERSION
// ============================================================

import {
  getSheet,
  adminGet,
  getAdminToken,
} from "@/services/api";

// ============================================================
// HELPERS
// ============================================================

function ensureArray<T = any>(value: any): T[] {
  if (Array.isArray(value)) {
    return value;
  }

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

// ============================================================
// DASHBOARD SERVICE
// ============================================================

export const dashboardService = {
  async getStats() {
    const token = getAdminToken();

    // --------------------------------------------------------
    // Public sheets
    // --------------------------------------------------------

    const [collegesResult, sportsResult] =
      await Promise.all([
        getSheet<any>("Colleges"),
        getSheet<any>("Sports"),
      ]);

    // --------------------------------------------------------
    // Normalize public data
    // --------------------------------------------------------

    const colleges =
      ensureArray(collegesResult);

    const sports =
      ensureArray(sportsResult);

    // --------------------------------------------------------
    // Protected sheets
    // --------------------------------------------------------

    let players: any[] = [];
    let schedules: any[] = [];
    let notices: any[] = [];

    if (token) {
      const [
        playersResult,
        schedulesResult,
        noticesResult,
      ] = await Promise.all([
        adminGet<any>("Players"),
        adminGet<any>("Schedules"),
        adminGet<any>("Notices"),
      ]);

      players =
        ensureArray(playersResult);

      schedules =
        ensureArray(schedulesResult);

      notices =
        ensureArray(noticesResult);
    }

    // --------------------------------------------------------
    // Debug
    // --------------------------------------------------------

    console.log(
      "========================================"
    );

    console.log(
      "JCSAM DASHBOARD - GOOGLE SHEETS DATA"
    );

    console.log(
      "Colleges:",
      colleges,
      "Count:",
      colleges.length
    );

    console.log(
      "Players:",
      players,
      "Count:",
      players.length
    );

    console.log(
      "Schedules:",
      schedules,
      "Count:",
      schedules.length
    );

    console.log(
      "Notices:",
      notices,
      "Count:",
      notices.length
    );

    console.log(
      "Sports:",
      sports,
      "Count:",
      sports.length
    );

    console.log(
      "========================================"
    );

    // --------------------------------------------------------
    // IMPORTANT
    //
    // Dashboard.tsx expects these values to be ARRAYS.
    // Do NOT return .length here.
    // --------------------------------------------------------

    return {
      colleges,
      players,
      schedules,
      notices,
      sports,
    };
  },
};

export default dashboardService;