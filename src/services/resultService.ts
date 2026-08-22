// ============================================================
// JCSAM HUB - RESULT SERVICE
// ============================================================

import {
  getSheet,
  adminGet,
  createRecord,
  updateRecord,
  deleteRecord,
  getAdminToken,
} from "@/services/api";

const SHEET = "Results";

// ============================================================
// NORMALIZE
// ============================================================

function normalizeResult(
  raw: any
) {
  const eventName =
    raw.eventName ||
    raw.event_name ||
    "";

  const studentName =
    raw.studentName ||
    raw.student_name ||
    "";

  const collegeName =
    raw.collegeName ||
    raw.college_name ||
    "";

  const date =
    raw.date ||
    raw.createdAt ||
    raw.created_at ||
    "";

  return {
    ...raw,

    id:
      raw.id ||
      raw.resultId ||
      "",

    eventName,

    studentName,

    collegeName,

    position:
      raw.position ||
      "",

    medal:
      raw.medal ||
      "",

    score:
      raw.score ||
      "",

    winner:
      studentName,

    summary:
      eventName,

    date,
  };
}

// ============================================================
// SERVICE
// ============================================================

export const resultService = {
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
      .map(normalizeResult)
      .sort(
        (a, b) =>
          new Date(
            b.date || 0
          ).getTime() -
          new Date(
            a.date || 0
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
      winner,
      summary,
      date,
      schedule_id,
      scheduleId,
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
        "Result ID is required."
      );
    }

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      winner,
      summary,
      date,
      schedule_id,
      scheduleId,
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