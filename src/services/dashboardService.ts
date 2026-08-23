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
// NORMALIZE API RESPONSE
// ============================================================

function normalizeArray(value: any): any[] {
  // Already an array
  if (Array.isArray(value)) {
    return value;
  }

  // Common API wrapper formats
  if (value && Array.isArray(value.data)) {
    return value.data;
  }

  if (value && Array.isArray(value.rows)) {
    return value.rows;
  }

  if (value && Array.isArray(value.records)) {
    return value.records;
  }

  // Never allow Dashboard to receive an object/null
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

    const [collegesResponse, sportsResponse] =
      await Promise.all([
        getSheet<any>("Colleges"),
        getSheet<any>("Sports"),
      ]);

    // --------------------------------------------------------
    // Normalize public data
    // --------------------------------------------------------

    const colleges = normalizeArray(collegesResponse);
    const sports = normalizeArray(sportsResponse);

    // --------------------------------------------------------
    // Protected sheets
    // --------------------------------------------------------

    let players: any[] = [];
    let schedules: any[] = [];
    let notices: any[] = [];

    if (token) {
      const [
        playersResponse,
        schedulesResponse,
        noticesResponse,
      ] = await Promise.all([
        adminGet<any>("Players"),
        adminGet<any>("Schedules"),
        adminGet<any>("Notices"),
      ]);

      players = normalizeArray(playersResponse);
      schedules = normalizeArray(schedulesResponse);
      notices = normalizeArray(noticesResponse);
    }

    // --------------------------------------------------------
    // DEBUG
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
    // IMPORTANT:
    // Return ARRAYS, not counts.
    //
    // Dashboard.tsx needs to use:
    // players.filter(...)
    // schedules.filter(...)
    // colleges.filter(...)
    // etc.
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