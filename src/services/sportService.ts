// ============================================================
// JCSAM HUB - SPORT SERVICE
// ============================================================

import {
  getSheet,
  adminGet,
  createRecord,
  updateRecord,
  deleteRecord,
  getAdminToken,
} from "@/services/api";

const SHEET = "Sports";
const IMAGES_SHEET =
  "SportImages";

// ============================================================
// HELPERS
// ============================================================

function slugify(
  name: string
): string {
  return String(
    name || ""
  )
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /(^-|-$)/g,
      ""
    );
}

function normalizeSport(
  raw: any
) {
  const name =
    raw.name ||
    raw.sportName ||
    "";

  return {
    ...raw,

    id:
      raw.id ||
      raw.sportId ||
      "",

    name,

    slug:
      raw.slug ||
      slugify(name),

    icon:
      raw.icon ||
      "🏅",

    rules:
      raw.rules ||
      "Rules coming soon.",

    banner_color:
      raw.banner_color ||
      raw.bannerColor ||
      "from-blue-600 to-blue-800",
  };
}

// ============================================================
// SERVICE
// ============================================================

export const sportService = {
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
      .map(normalizeSport)
      .sort(
        (a, b) =>
          String(
            a.name
          ).localeCompare(
            String(
              b.name
            )
          )
      );
  },

  async create(
    sport: any
  ) {
    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      ...payload
    } = sport;

    return createRecord(
      SHEET,
      payload
    );
  },

  async update(
    sport: any
  ) {
    if (!sport.id) {
      throw new Error(
        "Sport ID is required."
      );
    }

    const {
      id,
      created_at,
      updated_at,
      createdAt,
      updatedAt,
      ...payload
    } = sport;

    return updateRecord(
      SHEET,
      String(id),
      payload
    );
  },

  async remove(
    id: string
  ) {
    return deleteRecord(
      SHEET,
      String(id)
    );
  },

  // ==========================================================
  // SPORT IMAGES
  // ==========================================================

  async getImages(
    sportId: string
  ) {
    const data =
      await getSheet<any>(
        IMAGES_SHEET
      );

    return data
      .filter(
        (img) =>
          String(
            img.sport_id ||
            img.sportId ||
            ""
          ) ===
          String(sportId)
      )
      .map(
        (img) => ({
          ...img,

          id:
            img.id ||
            img.imageId ||
            "",

          sport_id:
            img.sport_id ||
            img.sportId ||
            "",

          url:
            img.url ||
            img.image_url ||
            img.imageUrl ||
            "",

          caption:
            img.caption ||
            img.alt_text ||
            "",
        })
      )
      .sort(
        (a, b) =>
          Number(
            a.display_order ??
              0
          ) -
          Number(
            b.display_order ??
              0
          )
      );
  },

  async addImage(
    img: {
      sport_id: string;
      url: string;
      caption: string;
      display_order?: number;
    }
  ) {
    return createRecord(
      IMAGES_SHEET,
      {
        sport_id:
          img.sport_id,

        image_url:
          img.url,

        alt_text:
          img.caption,

        display_order:
          img.display_order ??
          0,
      }
    );
  },

  async deleteImage(
    id: string
  ) {
    return deleteRecord(
      IMAGES_SHEET,
      String(id)
    );
  },
};