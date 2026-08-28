// ============================================================
// JCSAM HUB - GOOGLE APPS SCRIPT API CLIENT
// ============================================================
// React/Vite
//      ↓
// services/api.ts
//      ↓
// Google Apps Script
//      ↓
// Google Sheets
//
// Authentication:
// localStorage admin session token
//
// No Supabase / Firebase authentication.
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

  // Allows additional Apps Script response properties.
  [key: string]: any;
}

type ApiRecord = Record<string, any>;

// ============================================================
// SESSION
// ============================================================

const TOKEN_KEY = "jcsam_admin_token";
const ADMIN_KEY = "jcsam_admin";

// ------------------------------------------------------------
// GET ADMIN TOKEN
// ------------------------------------------------------------

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

// ------------------------------------------------------------
// GET ADMIN
// ------------------------------------------------------------

export function getAdmin(): any | null {
  try {
    const value =
      localStorage.getItem(ADMIN_KEY);

    return value
      ? JSON.parse(value)
      : null;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------
// SET ADMIN SESSION
// ------------------------------------------------------------

export function setAdminSession(
  token: string,
  admin: any
): void {
  try {
    localStorage.setItem(
      TOKEN_KEY,
      token
    );

    localStorage.setItem(
      ADMIN_KEY,
      JSON.stringify(admin || {})
    );
  } catch (error) {
    console.error(
      "Failed to save admin session:",
      error
    );
  }
}

// ------------------------------------------------------------
// CLEAR ADMIN SESSION
// ------------------------------------------------------------

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(
      TOKEN_KEY
    );

    localStorage.removeItem(
      ADMIN_KEY
    );
  } catch {
    // Ignore storage errors.
  }
}

// ============================================================
// NORMALIZATION
// ============================================================

function normalizeDate(
  value: any
): any {
  return value;
}

// ------------------------------------------------------------
// NORMALIZE ONE RECORD
// ------------------------------------------------------------

export function normalizeRecord<
  T extends ApiRecord
>(
  record: T
): T {
  if (
    !record ||
    typeof record !== "object"
  ) {
    return record;
  }

  const result: ApiRecord = {
    ...record,
  };

  // ----------------------------------------------------------
  // COLLEGE ID
  // ----------------------------------------------------------

  if (
    result.collegeId === undefined &&
    result.college_id !== undefined
  ) {
    result.collegeId =
      result.college_id;
  }

  if (
    result.college_id === undefined &&
    result.collegeId !== undefined
  ) {
    result.college_id =
      result.collegeId;
  }

  // ----------------------------------------------------------
  // SPORT ID
  // ----------------------------------------------------------

  if (
    result.sportId === undefined &&
    result.sport_id !== undefined
  ) {
    result.sportId =
      result.sport_id;
  }

  if (
    result.sport_id === undefined &&
    result.sportId !== undefined
  ) {
    result.sport_id =
      result.sportId;
  }

  // ----------------------------------------------------------
  // PLAYER ID
  // ----------------------------------------------------------

  if (
    result.playerId === undefined &&
    result.player_id !== undefined
  ) {
    result.playerId =
      result.player_id;
  }

  if (
    result.player_id === undefined &&
    result.playerId !== undefined
  ) {
    result.player_id =
      result.playerId;
  }

  // ----------------------------------------------------------
  // SCHEDULE ID
  // ----------------------------------------------------------

  if (
    result.scheduleId === undefined &&
    result.schedule_id !== undefined
  ) {
    result.scheduleId =
      result.schedule_id;
  }

  if (
    result.schedule_id === undefined &&
    result.scheduleId !== undefined
  ) {
    result.schedule_id =
      result.scheduleId;
  }

  // ----------------------------------------------------------
  // RESULT ID
  // ----------------------------------------------------------

  if (
    result.resultId === undefined &&
    result.result_id !== undefined
  ) {
    result.resultId =
      result.result_id;
  }

  if (
    result.result_id === undefined &&
    result.resultId !== undefined
  ) {
    result.result_id =
      result.resultId;
  }

  // ----------------------------------------------------------
  // CONTACT PERSON
  // ----------------------------------------------------------

  if (
    result.contactPerson === undefined &&
    result.contact_person !== undefined
  ) {
    result.contactPerson =
      result.contact_person;
  }

  if (
    result.contact_person === undefined &&
    result.contactPerson !== undefined
  ) {
    result.contact_person =
      result.contactPerson;
  }

  // ----------------------------------------------------------
  // PHOTO URL
  // ----------------------------------------------------------

  if (
    result.photoUrl === undefined &&
    result.photo_url !== undefined
  ) {
    result.photoUrl =
      result.photo_url;
  }

  if (
    result.photo_url === undefined &&
    result.photoUrl !== undefined
  ) {
    result.photo_url =
      result.photoUrl;
  }

  // ----------------------------------------------------------
  // LOGO URL
  // ----------------------------------------------------------

  if (
    result.logoUrl === undefined &&
    result.logo_url !== undefined
  ) {
    result.logoUrl =
      result.logo_url;
  }

  if (
    result.logo_url === undefined &&
    result.logoUrl !== undefined
  ) {
    result.logo_url =
      result.logoUrl;
  }

  // ----------------------------------------------------------
  // IMAGE URL
  // ----------------------------------------------------------

  if (
    result.imageUrl === undefined &&
    result.image_url !== undefined
  ) {
    result.imageUrl =
      result.image_url;
  }

  if (
    result.image_url === undefined &&
    result.imageUrl !== undefined
  ) {
    result.image_url =
      result.imageUrl;
  }

  // ----------------------------------------------------------
  // CREATED AT
  // ----------------------------------------------------------

  if (
    result.createdAt === undefined &&
    result.created_at !== undefined
  ) {
    result.createdAt =
      normalizeDate(
        result.created_at
      );
  }

  if (
    result.created_at === undefined &&
    result.createdAt !== undefined
  ) {
    result.created_at =
      normalizeDate(
        result.createdAt
      );
  }

  // ----------------------------------------------------------
  // UPDATED AT
  // ----------------------------------------------------------

  if (
    result.updatedAt === undefined &&
    result.updated_at !== undefined
  ) {
    result.updatedAt =
      normalizeDate(
        result.updated_at
      );
  }

  if (
    result.updated_at === undefined &&
    result.updatedAt !== undefined
  ) {
    result.updated_at =
      normalizeDate(
        result.updatedAt
      );
  }

  return result as T;
}

// ------------------------------------------------------------
// NORMALIZE RECORDS
// ------------------------------------------------------------

export function normalizeRecords<
  T extends ApiRecord
>(
  records: T[]
): T[] {
  if (!Array.isArray(records)) {
    return [];
  }

  return records
    .filter(
      (record) =>
        record !== null &&
        typeof record === "object"
    )
    .map(
      (record) =>
        normalizeRecord<T>(
          record
        )
    );
}

// ============================================================
// RESPONSE DATA EXTRACTION
// ============================================================
//
// Supports all common Apps Script response formats:
//
// 1. { success: true, data: [...] }
//
// 2. { success: true, data: { data: [...] } }
//
// 3. { success: true, data: { rows: [...] } }
//
// 4. { success: true, data: { records: [...] } }
//
// 5. { success: true, data: { items: [...] } }
//
// 6. { success: true, data: { results: [...] } }
//
// 7. { success: true, rows: [...] }
//
// 8. { success: true, records: [...] }
// ============================================================

function extractData<T = any>(
  response: ApiResponse<any>
): T[] {
  const value =
    response?.data;

  // ----------------------------------------------------------
  // Direct array
  // ----------------------------------------------------------

  if (
    Array.isArray(value)
  ) {
    return value as T[];
  }

  // ----------------------------------------------------------
  // Nested data array
  // ----------------------------------------------------------

  if (
    value &&
    Array.isArray(
      value.data
    )
  ) {
    return value.data as T[];
  }

  // ----------------------------------------------------------
  // Rows
  // ----------------------------------------------------------

  if (
    value &&
    Array.isArray(
      value.rows
    )
  ) {
    return value.rows as T[];
  }

  // ----------------------------------------------------------
  // Records
  // ----------------------------------------------------------

  if (
    value &&
    Array.isArray(
      value.records
    )
  ) {
    return value.records as T[];
  }

  // ----------------------------------------------------------
  // Items
  // ----------------------------------------------------------

  if (
    value &&
    Array.isArray(
      value.items
    )
  ) {
    return value.items as T[];
  }

  // ----------------------------------------------------------
  // Results
  // ----------------------------------------------------------

  if (
    value &&
    Array.isArray(
      value.results
    )
  ) {
    return value.results as T[];
  }

  // ----------------------------------------------------------
  // Response-level rows
  // ----------------------------------------------------------

  if (
    Array.isArray(
      (response as any).rows
    )
  ) {
    return (
      (response as any).rows
    ) as T[];
  }

  // ----------------------------------------------------------
  // Response-level records
  // ----------------------------------------------------------

  if (
    Array.isArray(
      (response as any).records
    )
  ) {
    return (
      (response as any).records
    ) as T[];
  }

  // ----------------------------------------------------------
  // Nothing found
  // ----------------------------------------------------------

  return [];
}

// ============================================================
// RESPONSE PARSER
// ============================================================

async function parseResponse(
  response: Response
): Promise<ApiResponse> {
  const text =
    await response.text();

  if (!text) {
    throw new Error(
      `Empty API response (${response.status})`
    );
  }

  let json: ApiResponse;

  try {
    json =
      JSON.parse(text);
  } catch {
    throw new Error(
      `Invalid API response (${response.status}): ${text.slice(
        0,
        500
      )}`
    );
  }

  // ----------------------------------------------------------
  // HTTP ERROR
  // ----------------------------------------------------------

  if (!response.ok) {
    throw new Error(
      json.error ||
        json.message ||
        `API request failed with status ${response.status}`
    );
  }

  // ----------------------------------------------------------
  // APPLICATION ERROR
  // ----------------------------------------------------------

  if (
    json.success === false
  ) {
    throw new Error(
      json.error ||
        json.message ||
        "API request failed"
    );
  }

  return json;
}

// ============================================================
// GET REQUEST
// ============================================================

export async function apiGet<
  T = any
>(
  action: string,
  params: Record<
    string,
    string |
      number |
      boolean |
      undefined
  > = {}
): Promise<
  ApiResponse<T>
> {
  if (!API_URL) {
    throw new Error(
      "Google Apps Script API URL is not configured."
    );
  }

  const url =
    new URL(API_URL);

  url.searchParams.set(
    "action",
    action
  );

  Object.entries(
    params
  ).forEach(
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

  const response =
    await fetch(
      url.toString(),
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept:
            "application/json",
        },
      }
    );

  return (
    (await parseResponse(
      response
    )) as ApiResponse<T>
  );
}

// ============================================================
// POST REQUEST
// ============================================================

export async function apiPost<
  T = any
>(
  action: string,
  body: Record<
    string,
    any
  > = {}
): Promise<
  ApiResponse<T>
> {
  if (!API_URL) {
    throw new Error(
      "Google Apps Script API URL is not configured."
    );
  }

  const response =
    await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          // text/plain avoids unnecessary
          // CORS preflight with Google Apps Script.
          "Content-Type":
            "text/plain;charset=utf-8",
        },

        body: JSON.stringify({
          action,
          ...body,
        }),
      }
    );

  return (
    (await parseResponse(
      response
    )) as ApiResponse<T>
  );
}

// ============================================================
// TEST CONNECTION
// ============================================================

export async function testConnection(): Promise<
  ApiResponse
> {
  return apiGet(
    "test"
  );
}

// ============================================================
// PUBLIC SHEETS
// ============================================================

export async function getSheet<
  T extends ApiRecord = ApiRecord
>(
  sheet: string
): Promise<T[]> {
  if (!sheet) {
    throw new Error(
      "Sheet name is required."
    );
  }

  // IMPORTANT:
  // Do not use apiGet<T[]> here.
  //
  // Apps Script returns an ApiResponse object.
  // The array is extracted separately by extractData().
  const result =
    await apiGet(
      "get",
      {
        sheet,
      }
    );

  const records =
    extractData<T>(
      result
    );

  return normalizeRecords<T>(
    records
  );
}

// ============================================================
// ADMIN SHEETS
// ============================================================

export async function adminGet<
  T extends ApiRecord = ApiRecord
>(
  sheet: string
): Promise<T[]> {
  if (!sheet) {
    throw new Error(
      "Sheet name is required."
    );
  }

  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  // IMPORTANT:
  // Same reason as getSheet().
  // Do not use apiGet<T[]>.
  const result =
    await apiGet(
      "adminGet",
      {
        sheet,
        token,
      }
    );

  const records =
    extractData<T>(
      result
    );

  return normalizeRecords<T>(
    records
  );
}

// ============================================================
// CREATE RECORD
// ============================================================

export async function createRecord<
  T extends ApiRecord = ApiRecord
>(
  sheet: string,
  data: ApiRecord
): Promise<T> {
  if (!sheet) {
    throw new Error(
      "Sheet name is required."
    );
  }

  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  const result =
    await apiPost(
      "create",
      {
        token,
        sheet,
        data,
      }
    );

  const record =
    result.data &&
    typeof result.data ===
      "object" &&
    !Array.isArray(
      result.data
    )
      ? result.data
      : data;

  return normalizeRecord<T>(
    record as unknown as T
  );
}

// ============================================================
// UPDATE RECORD
// ============================================================

export async function updateRecord<
  T extends ApiRecord = ApiRecord
>(
  sheet: string,
  id: string,
  data: ApiRecord
): Promise<T> {
  if (!sheet) {
    throw new Error(
      "Sheet name is required."
    );
  }

  if (!id) {
    throw new Error(
      "Record ID is required."
    );
  }

  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  const result =
    await apiPost(
      "update",
      {
        token,
        sheet,
        id,
        data,
      }
    );

  const record =
    result.data &&
    typeof result.data ===
      "object" &&
    !Array.isArray(
      result.data
    )
      ? result.data
      : {
          id,
          ...data,
        };

  return normalizeRecord<T>(
    record as unknown as T
  );
}

// ============================================================
// DELETE RECORD
// ============================================================

export async function deleteRecord(
  sheet: string,
  id: string
): Promise<ApiResponse> {
  if (!sheet) {
    throw new Error(
      "Sheet name is required."
    );
  }

  if (!id) {
    throw new Error(
      "Record ID is required."
    );
  }

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
// PLAYER REGISTRATION
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

  return (
    result.data ||
    result
  );
}

// ============================================================
// COLLEGE REGISTRATION
// ============================================================

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

  return (
    result.data ||
    result
  );
}

// ============================================================
// ADMIN LOGIN
// ============================================================

export async function login(
  email: string,
  password: string
) {
  const cleanEmail =
    String(
      email || ""
    ).trim();

  const cleanPassword =
    String(
      password || ""
    );

  if (!cleanEmail) {
    throw new Error(
      "Email is required."
    );
  }

  if (!cleanPassword) {
    throw new Error(
      "Password is required."
    );
  }

  const result =
    await apiPost(
      "login",
      {
        email:
          cleanEmail,
        password:
          cleanPassword,
      }
    );

  if (!result.token) {
    throw new Error(
      result.error ||
        result.message ||
        "Login failed. No session token received."
    );
  }

  // Save session immediately.
  setAdminSession(
    result.token,
    result.admin || {}
  );

  return {
    token:
      result.token,

    admin:
      result.admin || {},
  };
}

// ============================================================
// ADMIN LOGOUT
// ============================================================

export async function logout() {
  const token =
    getAdminToken();

  try {
    if (token) {
      await apiPost(
        "logout",
        {
          token,
        }
      );
    }
  } catch (error) {
    // Even if server logout fails,
    // local session must still be cleared.
    console.warn(
      "Server logout failed:",
      error
    );
  } finally {
    clearAdminSession();
  }
}

// ============================================================
// UPDATE PASSWORD
// ============================================================

export async function updatePassword(
  newPassword: string
) {
  const token =
    getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  if (!newPassword) {
    throw new Error(
      "New password is required."
    );
  }

  return apiPost(
    "updatePassword",
    {
      token,
      newPassword,
    }
  );
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

  if (!file) {
    throw new Error(
      "Image file is required."
    );
  }

  const base64 =
    await fileToBase64(
      file
    );

  return apiPost(
    "uploadImage",
    {
      token,

      data:
        base64,

      fileName:
        file.name,

      mimeType:
        file.type ||
        "image/jpeg",

      bucket,
    }
  );
}

// ============================================================
// FILE → BASE64
// ============================================================

function fileToBase64(
  file: File
): Promise<string> {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const reader =
        new FileReader();

      reader.onload =
        () => {
          const result =
            String(
              reader.result ||
                ""
            );

          const commaIndex =
            result.indexOf(
              ","
            );

          resolve(
            commaIndex >= 0
              ? result.slice(
                  commaIndex + 1
                )
              : result
          );
        };

      reader.onerror =
        () => {
          reject(
            new Error(
              "Unable to read image file"
            )
          );
        };

      reader.readAsDataURL(
        file
      );
    }
  );
}

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  // Generic API
  apiGet,
  apiPost,

  // Sheets
  getSheet,
  adminGet,

  // CRUD
  createRecord,
  updateRecord,
  deleteRecord,

  // Registration
  registerPlayer,
  registerCollege,

  // Authentication
  login,
  logout,
  updatePassword,

  // Uploads
  uploadImage,

  // Testing
  testConnection,

  // Session
  getAdminToken,
  getAdmin,
  setAdminSession,
  clearAdminSession,
};