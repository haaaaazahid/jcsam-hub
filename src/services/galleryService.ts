// ============================================================
// JCSAM HUB - GALLERY SERVICE
// ============================================================

import {
  getSheet,
  adminGet,
  createRecord,
  updateRecord,
  deleteRecord,
  getAdminToken,
} from "@/services/api";

const SHEET = "Gallery";

// ============================================================
// NORMALIZE
// ============================================================

function normalizeGalleryItem(
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
      raw.galleryId ||
      "",

    url:
      raw.url ||
      raw.imageUrl ||
      raw.image_url ||
      "",

    imageUrl:
      raw.imageUrl ||
      raw.image_url ||
      raw.url ||
      "",

    caption:
      raw.caption ||
      raw.title ||
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

    date,

    category:
      raw.category ||
      "",
  };
}

// ============================================================
// SERVICE
// ============================================================

export const galleryService = {
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
      .map(normalizeGalleryItem)
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
      sports,
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
        "Gallery item ID is required."
      );
    }

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      sports,
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