// ============================================================
// JCSAM HUB - GOOGLE APPS SCRIPT API CLIENT
// ============================================================
// Single frontend API client for:
// React/Vite → Google Apps Script → Google Sheets
//
// Authentication:
// localStorage admin session token
//
// IMPORTANT:
// No Supabase / Firebase authentication is used here.
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
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
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
  try {
    localStorage.setItem(TOKEN_KEY, token);
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

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  } catch {
    // Ignore storage errors
  }
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

  const result: ApiRecord = {
    ...record,
  };

  // ----------------------------------------------------------
  // ID ALIASES
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
  // CONTACT ALIASES
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
  // IMAGE ALIASES
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
  // DATE ALIASES
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

  return records
    .filter(
      (record) =>
        record !== null &&
        typeof record === "object"
    )
    .map(normalizeRecord);
}

// ============================================================
// RESPONSE DATA EXTRACTION
// ============================================================
//
// Apps Script responses can arrive in several shapes:
//
// { success: true, data: [...] }
//
// { success: true, data: { rows: [...] } }
//
// { success: true, data: { records: [...] } }
//
// { success: true, rows: [...] }
//
// { success: true, records: [...] }
//
// This function handles all of them.
// ============================================================

function extractArray<T = any>(
  value: any
): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  if (Array.isArray(value.data)) {
    return value.data;
  }

  if (Array.isArray(value.rows)) {
    return value.rows;
  }

  if (Array.isArray(value.records)) {
    return value.records;
  }

  if (Array.isArray(value.items)) {
    return value.items;
  }

  if (Array.isArray(value.results)) {
    return value.results;
  }

  return [];
}

function extractData<T = any>(
  response: ApiResponse<T>
): T[] {
  // First check response.data
  const fromData = extractArray<T>(
    response?.data
  );

  if (fromData.length > 0) {
    return fromData;
  }

  // Then check wrapper itself
  return extractArray<T>(response);
}

// ============================================================
// RESPONSE PARSER
// ============================================================

async function parseResponse(
  response: Response
): Promise<ApiResponse> {
  const text = await response.text();

  if (!text) {
    throw new Error(
      `Empty API response (${response.status})`
    );
  }

  let json: ApiResponse;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `Invalid API response (${response.status}): ${text.slice(
        0,
        500
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
  if (!API_URL) {
    throw new Error(
      "Google Apps Script API URL is not configured."
    );
  }

  const url = new URL(API_URL);

  url.searchParams.set(
    "action",
    action
  );

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
      headers: {
        Accept: "application/json",
      },
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
  if (!API_URL) {
    throw new Error(
      "Google Apps Script API URL is not configured."
    );
  }

  const response = await fetch(
    API_URL,
    {
      method: "POST",
      headers: {
        // Prevents unnecessary CORS preflight
        // for Google Apps Script Web Apps.
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
// TEST CONNECTION
// ============================================================

export async function testConnection(): Promise<
  ApiResponse
> {
  return apiGet("test");
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

  const result =
    await apiGet<T[]>(
      "get",
      { sheet }
    );

  const records =
    extractData<T>(result);

  return normalizeRecords(
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

  const result =
    await apiGet<T[]>(
      "adminGet",
      {
        sheet,
        token,
      }
    );

  const records =
    extractData<T>(result);

  return normalizeRecords(
    records
  );
}

// ============================================================
// CREATE
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

  if (
    result.data &&
    typeof result.data === "object" &&
    !Array.isArray(result.data)
  ) {
    return normalizeRecord(
      result.data as T
    );
  }

  return normalizeRecord({
    ...data,
  } as T);
}

// ============================================================
// UPDATE
// ============================================================

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

  if (
    result.data &&
    typeof result.data === "object" &&
    !Array.isArray(result.data)
  ) {
    return normalizeRecord(
      result.data as T
    );
  }

  return normalizeRecord({
    id,
    ...data,
  } as T);
}

// ============================================================
// DELETE
// ============================================================

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

  return result.data || result;
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

  return result.data || result;
}

// ============================================================
// AUTHENTICATION
// ============================================================

export async function login(
  email: string,
  password: string
) {
  const cleanEmail =
    String(email || "").trim();

  const cleanPassword =
    String(password || "");

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
        email: cleanEmail,
        password: cleanPassword,
      }
    );

  if (!result.token) {
    throw new Error(
      result.error ||
        result.message ||
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

// ============================================================
// LOGOUT
// ============================================================

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
  } catch (error) {
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
  updatePassword,

  uploadImage,
  testConnection,

  getAdminToken,
  getAdmin,
  setAdminSession,
  clearAdminSession,
};