// ============================================================
// JCSAM HUB - NOTICE SERVICE
// ============================================================

import {
  getSheet,
  adminGet,
  createRecord,
  updateRecord,
  deleteRecord,
  getAdminToken,
} from "@/services/api";

const SHEET = "Notices";

// ============================================================
// NORMALIZE
// ============================================================

function normalizeNotice(
  raw: any
) {
  const date =
    raw.date ||
    raw.createdAt ||
    raw.created_at ||
    "";

  return {
    ...raw,

    id:
      raw.id ||
      raw.noticeId ||
      "",

    content:
      raw.content ||
      raw.description ||
      "",

    sport_id:
      raw.sport_id ||
      raw.sportId ||
      "",

    sportId:
      raw.sportId ||
      raw.sport_id ||
      "",

    priority:
      raw.priority ||
      "normal",

    date,

    image:
      raw.image ||
      raw.image_url ||
      "",

    pdf_url:
      raw.pdf_url ||
      raw.pdfUrl ||
      "",

    category:
      raw.category ||
      "",
  };
}

// ============================================================
// SERVICE
// ============================================================

export const noticeService = {
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
      .map(normalizeNotice)
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
        "Notice ID is required."
      );
    }

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
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