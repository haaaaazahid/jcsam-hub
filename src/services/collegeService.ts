// ============================================================
// JCSAM HUB - COLLEGE SERVICE
// ============================================================

import {
  getSheet,
  adminGet,
  createRecord,
  updateRecord,
  deleteRecord,
  registerCollege as registerCollegeApi,
  getAdminToken,
} from "@/services/api";

const SHEET = "Colleges";

// ============================================================
// NORMALIZE
// ============================================================

function normalizeCollege(
  item: any
) {
  const contactPerson =
    item.contactPerson ||
    item.contact_person ||
    "";

  return {
    ...item,
    contactPerson,
    contact_person:
      item.contact_person ||
      contactPerson,
  };
}

// ============================================================
// SERVICE
// ============================================================

export const collegeService = {
  async getAll() {
    const token =
      getAdminToken();

    if (token) {
      try {
        return await adminGet<any>(
          SHEET
        );
      } catch {
        // Fall back to public data.
      }
    }

    return await getSheet<any>(
      SHEET
    );
  },

  // Public registration
  async register(item: any) {
    const normalized =
      normalizeCollege(item);

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      ...payload
    } = normalized;

    return registerCollegeApi(
      payload
    );
  },

  // Admin create
  async create(item: any) {
    const normalized =
      normalizeCollege(item);

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      ...payload
    } = normalized;

    return createRecord(
      SHEET,
      payload
    );
  },

  // Admin update
  async update(item: any) {
    const normalized =
      normalizeCollege(item);

    if (!normalized.id) {
      throw new Error(
        "College ID is required."
      );
    }

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      ...payload
    } = normalized;

    return updateRecord(
      SHEET,
      String(id),
      payload
    );
  },

  // Admin delete
  async remove(id: string) {
    if (!id) {
      throw new Error(
        "College ID is required."
      );
    }

    return deleteRecord(
      SHEET,
      String(id)
    );
  },
};