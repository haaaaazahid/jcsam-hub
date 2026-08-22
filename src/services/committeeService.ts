// ============================================================
// JCSAM HUB - COMMITTEE SERVICE
// ============================================================

import {
  getSheet,
  adminGet,
  createRecord,
  updateRecord,
  deleteRecord,
  getAdminToken,
} from "@/services/api";

const SHEET =
  "CommitteeMembers";

// ============================================================
// NORMALIZE
// ============================================================

function normalizeMember(
  raw: any
) {
  return {
    ...raw,

    id:
      raw.id ||
      raw.memberId ||
      "",

    image:
      raw.image ||
      raw.image_url ||
      "",

    image_url:
      raw.image_url ||
      raw.image ||
      "",

    role:
      raw.role ||
      raw.designation ||
      "",

    designation:
      raw.designation ||
      raw.role ||
      "",

    institution:
      raw.institution ||
      "",

    display_order:
      raw.display_order ??
      raw.displayOrder ??
      0,
  };
}

// ============================================================
// SERVICE
// ============================================================

export const committeeService = {
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
      .map(normalizeMember)
      .sort(
        (a, b) =>
          Number(
            a.display_order ?? 0
          ) -
          Number(
            b.display_order ?? 0
          )
      );
  },

  async create(item: any) {
    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      image,
      role,
      institution,
      ...payload
    } = item;

    return createRecord(
      SHEET,
      {
        ...payload,
        image_url:
          item.image ||
          item.image_url ||
          "",
        role:
          item.role ||
          item.designation ||
          "",
        institution:
          item.institution ||
          "",
      }
    );
  },

  async update(item: any) {
    if (!item.id) {
      throw new Error(
        "Committee member ID is required."
      );
    }

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      image,
      role,
      institution,
      ...payload
    } = item;

    return updateRecord(
      SHEET,
      String(id),
      {
        ...payload,
        image_url:
          item.image ||
          item.image_url ||
          "",
        role:
          item.role ||
          item.designation ||
          "",
        institution:
          item.institution ||
          "",
      }
    );
  },

  async remove(id: string) {
    return deleteRecord(
      SHEET,
      String(id)
    );
  },
};