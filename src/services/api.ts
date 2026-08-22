// ============================================================
// JCSAM HUB - GOOGLE APPS SCRIPT API CLIENT
// ============================================================

const API_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbw50MXjtqkQUbvRTCnAMEMickN6jKC6N1JytJdO8wfL0VXCthmkMtL9mPE6GjSqEHg/exec";

// ============================================================
// TYPES
// ============================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  token?: string;
  admin?: any;
  [key: string]: any;
}

type ApiRecord = Record<string, any>;

// ============================================================
// SESSION
// ============================================================

const TOKEN_KEY = "jcsam_admin_token";
const ADMIN_KEY = "jcsam_admin";

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAdmin(): any | null {
  try {
    const value = localStorage.getItem(ADMIN_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function setAdminSession(
  token: string,
  admin: any
): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(
    ADMIN_KEY,
    JSON.stringify(admin || {})
  );
}

export function clearAdminSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

// ============================================================
// NORMALIZATION
// ============================================================

function normalizeDate(value: any): any {
  return value;
}

export function normalizeRecord<T extends ApiRecord>(
  record: T
): T {
  if (!record || typeof record !== "object") {
    return record;
  }

  const result: ApiRecord = { ...record };

  // ----------------------------------------------------------
  // ID aliases
  // ----------------------------------------------------------

  if (
    result.collegeId === undefined &&
    result.college_id !== undefined
  ) {
    result.collegeId = result.college_id;
  }

  if (
    result.college_id === undefined &&
    result.collegeId !== undefined
  ) {
    result.college_id = result.collegeId;
  }

  if (
    result.sportId === undefined &&
    result.sport_id !== undefined
  ) {
    result.sportId = result.sport_id;
  }

  if (
    result.sport_id === undefined &&
    result.sportId !== undefined
  ) {
    result.sport_id = result.sportId;
  }

  if (
    result.playerId === undefined &&
    result.player_id !== undefined
  ) {
    result.playerId = result.player_id;
  }

  if (
    result.player_id === undefined &&
    result.playerId !== undefined
  ) {
    result.player_id = result.playerId;
  }

  if (
    result.scheduleId === undefined &&
    result.schedule_id !== undefined
  ) {
    result.scheduleId = result.schedule_id;
  }

  if (
    result.schedule_id === undefined &&
    result.scheduleId !== undefined
  ) {
    result.schedule_id = result.scheduleId;
  }

  if (
    result.resultId === undefined &&
    result.result_id !== undefined
  ) {
    result.resultId = result.result_id;
  }

  if (
    result.result_id === undefined &&
    result.resultId !== undefined
  ) {
    result.result_id = result.resultId;
  }

  // ----------------------------------------------------------
  // Contact aliases
  // ----------------------------------------------------------

  if (
    result.contactPerson === undefined &&
    result.contact_person !== undefined
  ) {
    result.contactPerson = result.contact_person;
  }

  if (
    result.contact_person === undefined &&
    result.contactPerson !== undefined
  ) {
    result.contact_person = result.contactPerson;
  }

  // ----------------------------------------------------------
  // Image aliases
  // ----------------------------------------------------------

  if (
    result.photoUrl === undefined &&
    result.photo_url !== undefined
  ) {
    result.photoUrl = result.photo_url;
  }

  if (
    result.photo_url === undefined &&
    result.photoUrl !== undefined
  ) {
    result.photo_url = result.photoUrl;
  }

  if (
    result.logoUrl === undefined &&
    result.logo_url !== undefined
  ) {
    result.logoUrl = result.logo_url;
  }

  if (
    result.logo_url === undefined &&
    result.logoUrl !== undefined
  ) {
    result.logo_url = result.logoUrl;
  }

  if (
    result.imageUrl === undefined &&
    result.image_url !== undefined
  ) {
    result.imageUrl = result.image_url;
  }

  if (
    result.image_url === undefined &&
    result.imageUrl !== undefined
  ) {
    result.image_url = result.imageUrl;
  }

  // ----------------------------------------------------------
  // Date aliases
  // ----------------------------------------------------------

  if (
    result.createdAt === undefined &&
    result.created_at !== undefined
  ) {
    result.createdAt = normalizeDate(
      result.created_at
    );
  }

  if (
    result.created_at === undefined &&
    result.createdAt !== undefined
  ) {
    result.created_at = normalizeDate(
      result.createdAt
    );
  }

  if (
    result.updatedAt === undefined &&
    result.updated_at !== undefined
  ) {
    result.updatedAt = normalizeDate(
      result.updated_at
    );
  }

  if (
    result.updated_at === undefined &&
    result.updatedAt !== undefined
  ) {
    result.updated_at = normalizeDate(
      result.updatedAt
    );
  }

  return result as T;
}

export function normalizeRecords<
  T extends ApiRecord
>(
  records: T[]
): T[] {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.map(normalizeRecord);
}

// ============================================================
// RESPONSE PARSER
// ============================================================

async function parseResponse(
  response: Response
): Promise<ApiResponse> {
  const text = await response.text();

  let json: ApiResponse;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `Invalid API response (${response.status}): ${text.slice(
        0,
        300
      )}`
    );
  }

  if (!response.ok) {
    throw new Error(
      json.error ||
        json.message ||
        `API request failed with status ${response.status}`
    );
  }

  if (json.success === false) {
    throw new Error(
      json.error ||
        json.message ||
        "API request failed"
    );
  }

  return json;
}

// ============================================================
// GET
// ============================================================

export async function apiGet<T = any>(
  action: string,
  params: Record<
    string,
    string | number | boolean | undefined
  > = {}
): Promise<ApiResponse<T>> {
  const url = new URL(API_URL);

  url.searchParams.set("action", action);

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null
      ) {
        url.searchParams.set(
          key,
          String(value)
        );
      }
    }
  );

  const response = await fetch(
    url.toString(),
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return (await parseResponse(
    response
  )) as ApiResponse<T>;
}

// ============================================================
// POST
// ============================================================

export async function apiPost<T = any>(
  action: string,
  body: Record<string, any> = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(
    API_URL,
    {
      method: "POST",
      headers: {
        // text/plain avoids unnecessary CORS preflight
        // with Google Apps Script Web Apps.
        "Content-Type":
          "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action,
        ...body,
      }),
    }
  );

  return (await parseResponse(
    response
  )) as ApiResponse<T>;
}

// ============================================================
// TEST
// ============================================================

export async function testConnection(): Promise<
  ApiResponse
> {
  return apiGet("test");
}

// ============================================================
// SHEETS
// ============================================================

export async function getSheet<
  T extends ApiRecord = ApiRecord
>(
  sheet: string
): Promise<T[]> {
  const result =
    await apiGet<T[]>(
      "get",
      { sheet }
    );

  const records = Array.isArray(result.data)
    ? result.data
    : [];

  return normalizeRecords(
    records as T[]
  );
}

export async function adminGet<
  T extends ApiRecord = ApiRecord
>(
  sheet: string
): Promise<T[]> {
  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  const result =
    await apiGet<T[]>(
      "adminGet",
      {
        sheet,
        token,
      }
    );

  const records = Array.isArray(result.data)
    ? result.data
    : [];

  return normalizeRecords(
    records as T[]
  );
}

// ============================================================
// CRUD
// ============================================================

export async function createRecord<
  T extends ApiRecord = ApiRecord
>(
  sheet: string,
  data: ApiRecord
): Promise<T> {
  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  const result =
    await apiPost<T>(
      "create",
      {
        token,
        sheet,
        data,
      }
    );

  const record =
    result.data || data;

  return normalizeRecord(
    record as T
  );
}

export async function updateRecord<
  T extends ApiRecord = ApiRecord
>(
  sheet: string,
  id: string,
  data: ApiRecord
): Promise<T> {
  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  const result =
    await apiPost<T>(
      "update",
      {
        token,
        sheet,
        id,
        data,
      }
    );

  const record =
    result.data || {
      id,
      ...data,
    };

  return normalizeRecord(
    record as T
  );
}

export async function deleteRecord(
  sheet: string,
  id: string
): Promise<ApiResponse> {
  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  return apiPost(
    "delete",
    {
      token,
      sheet,
      id,
    }
  );
}

// ============================================================
// REGISTRATION
// ============================================================

export async function registerPlayer(
  data: ApiRecord
) {
  const result =
    await apiPost(
      "registerPlayer",
      {
        data: {
          ...data,

          college_id:
            data.college_id ??
            data.collegeId ??
            data.college ??
            "",

          sport_id:
            data.sport_id ??
            data.sportId ??
            data.sport ??
            "",
        },
      }
    );

  return result.data || result;
}

export async function registerCollege(
  data: ApiRecord
) {
  const result =
    await apiPost(
      "registerCollege",
      {
        data: {
          ...data,

          contact_person:
            data.contact_person ??
            data.contactPerson ??
            "",
        },
      }
    );

  return result.data || result;
}

// ============================================================
// AUTH
// ============================================================

export async function login(
  email: string,
  password: string
) {
  const result =
    await apiPost(
      "login",
      {
        email,
        password,
      }
    );

  if (!result.token) {
    throw new Error(
      result.error ||
        "Login failed. No session token received."
    );
  }

  setAdminSession(
    result.token,
    result.admin || {}
  );

  return {
    token: result.token,
    admin: result.admin || {},
  };
}

export async function logout() {
  const token =
    getAdminToken();

  try {
    if (token) {
      await apiPost(
        "logout",
        { token }
      );
    }
  } finally {
    clearAdminSession();
  }
}

// ============================================================
// IMAGE UPLOAD
// ============================================================

export async function uploadImage(
  file: File,
  bucket = "general"
) {
  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  const base64 =
    await fileToBase64(file);

  return apiPost(
    "uploadImage",
    {
      token,
      data: base64,
      fileName: file.name,
      mimeType:
        file.type || "image/jpeg",
      bucket,
    }
  );
}

function fileToBase64(
  file: File
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        const result =
          String(
            reader.result || ""
          );

        const commaIndex =
          result.indexOf(",");

        resolve(
          commaIndex >= 0
            ? result.slice(
                commaIndex + 1
              )
            : result
        );
      };

      reader.onerror = () => {
        reject(
          new Error(
            "Unable to read image file"
          )
        );
      };

      reader.readAsDataURL(file);
    }
  );
}

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  apiGet,
  apiPost,

  getSheet,
  adminGet,

  createRecord,
  updateRecord,
  deleteRecord,

  registerPlayer,
  registerCollege,

  login,
  logout,

  uploadImage,
  testConnection,

  getAdminToken,
  getAdmin,
  setAdminSession,
  clearAdminSession,
};