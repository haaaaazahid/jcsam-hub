// ============================================================
// JCSAM HUB - PLAYER SERVICE
// ============================================================

import {
  getSheet,
  adminGet,
  createRecord,
  updateRecord,
  deleteRecord,
  registerPlayer as registerPlayerApi,
  getAdminToken,
} from "@/services/api";

const SHEET = "Players";

// ============================================================
// CLEAN PLAYER
// ============================================================

function cleanPlayer(
  item: any
) {
  const {
    id,
    created_at,
    updated_at,
    createdAt,
    updatedAt,
    colleges,
    sports,
    ...rest
  } = item;

  return rest;
}

// ============================================================
// SERVICE
// ============================================================

export const playerService = {
  async getAll() {
    const token =
      getAdminToken();

    const data = token
      ? await adminGet<any>(
          SHEET
        )
      : await getSheet<any>(
          SHEET
        );

    return data.sort(
      (a, b) =>
        String(
          a.name ?? ""
        ).localeCompare(
          String(
            b.name ?? ""
          )
        )
    );
  },

  async register(item: any) {
    return registerPlayerApi(
      cleanPlayer(item)
    );
  },

  async create(item: any) {
    return createRecord(
      SHEET,
      cleanPlayer(item)
    );
  },

  async update(item: any) {
    if (!item.id) {
      throw new Error(
        "Player ID is required."
      );
    }

    return updateRecord(
      SHEET,
      String(item.id),
      cleanPlayer(item)
    );
  },

  async remove(id: string) {
    if (!id) {
      throw new Error(
        "Player ID is required."
      );
    }

    return deleteRecord(
      SHEET,
      String(id)
    );
  },
};