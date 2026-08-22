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

function countRecords(value: any): number {
  if (Array.isArray(value)) {
    return value.length;
  }

  if (value && Array.isArray(value.data)) {
    return value.data.length;
  }

  if (value && Array.isArray(value.rows)) {
    return value.rows.length;
  }

  if (value && Array.isArray(value.records)) {
    return value.records.length;
  }

  return 0;
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

    const [colleges, sports] = await Promise.all([
      getSheet<any>("Colleges"),
      getSheet<any>("Sports"),
    ]);

    // --------------------------------------------------------
    // Protected sheets
    // --------------------------------------------------------
    // These require an authenticated admin session.
    // Do not call getSheet() for them.
    // --------------------------------------------------------

    let players: any[] = [];
    let schedules: any[] = [];
    let notices: any[] = [];

    if (token) {
      [
        players,
        schedules,
        notices,
      ] = await Promise.all([
        adminGet<any>("Players"),
        adminGet<any>("Schedules"),
        adminGet<any>("Notices"),
      ]);
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

    console.log("Colleges:", colleges);
    console.log("Players:", players);
    console.log("Schedules:", schedules);
    console.log("Notices:", notices);
    console.log("Sports:", sports);

    console.log(
      "========================================"
    );

    // --------------------------------------------------------
    // Stats
    // --------------------------------------------------------

    return {
      colleges: countRecords(colleges),
      players: countRecords(players),
      schedules: countRecords(schedules),
      notices: countRecords(notices),
      sports: countRecords(sports),
    };
  },
};

export default dashboardService;