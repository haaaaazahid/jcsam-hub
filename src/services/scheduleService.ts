// ============================================================
// JCSAM HUB - SCHEDULE SERVICE
// ============================================================

import {
  getSheet,
  adminGet,
  createRecord,
  updateRecord,
  deleteRecord,
  getAdminToken,
} from "@/services/api";

const SHEET = "Schedules";

// ============================================================
// NORMALIZE
// ============================================================

function normalizeSchedule(
  raw: any
) {
  const start =
    raw.start_time ||
    raw.startTime ||
    "";

  const end =
    raw.end_time ||
    raw.endTime ||
    "";

  return {
    ...raw,

    id:
      raw.id ||
      raw.scheduleId ||
      "",

    sport_id:
      raw.sport_id ||
      raw.sportId ||
      "",

    sportId:
      raw.sportId ||
      raw.sport_id ||
      "",

    title:
      raw.title ||
      raw.description ||
      "Match",

    team1:
      raw.team1 ||
      "TBD",

    team2:
      raw.team2 ||
      "",

    venue:
      raw.venue ||
      "",

    date:
      raw.date ||
      "",

    time:
      raw.time ||
      (
        start && end
          ? `${start} - ${end}`
          : start || ""
      ),

    status:
      raw.status ||
      "upcoming",
  };
}

// ============================================================
// SERVICE
// ============================================================

export const scheduleService = {
  async getAll() {
    const token =
      getAdminToken();

    let data;

    if (token) {
      try {
        data =
          await adminGet<any>(
            SHEET
          );
      } catch {
        data =
          await getSheet<any>(
            SHEET
          );
      }
    } else {
      data =
        await getSheet<any>(
          SHEET
        );
    }

    return data
      .map(normalizeSchedule)
      .sort(
        (a, b) =>
          new Date(
            a.date || 0
          ).getTime() -
          new Date(
            b.date || 0
          ).getTime()
      );
  },

  async create(item: any) {
    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      time,
      ...payload
    } = item;

    return createRecord(
      SHEET,
      payload
    );
  },

  async update(item: any) {
    if (!item.id) {
      throw new Error(
        "Schedule ID is required."
      );
    }

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      time,
      ...payload
    } = item;

    return updateRecord(
      SHEET,
      String(id),
      payload
    );
  },

  async remove(id: string) {
    return deleteRecord(
      SHEET,
      String(id)
    );
  },
};