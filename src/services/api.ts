// ============================================================
// JCSAM HUB - GOOGLE SHEETS API CLIENT
// ============================================================

const API_URL =
  "https://script.google.com/macros/s/AKfycbw50MXjtqkQUbvRTCnAMEMickN6jKC6N1JytJdO8wfL0VXCthmkMtL9mPE6GjSqEHg/exec";

// ============================================================
// TYPES
// ============================================================

export interface ApiResponse<T = any> {
  success: boolean;
  sheet?: string;
  data?: T[];
  error?: string;
  message?: string;
  [key: string]: any;
}

// ============================================================
// GET
// ============================================================

export async function apiGet<T = any>(
  action: string,
  params: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  const searchParams = new URLSearchParams({
    action,
    ...params,
  });

  const response = await fetch(
    `${API_URL}?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "API request failed");
  }

  return result;
}

// ============================================================
// POST
// ============================================================

export async function apiPost<T = any>(
  action: string,
  data: Record<string, any> = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action,
      ...data,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "API request failed");
  }

  return result;
}

// ============================================================
// GET SHEET
// ============================================================

export async function getSheet<T = any>(
  sheetName: string
): Promise<T[]> {
  const result = await apiGet<T>("get", {
    sheet: sheetName,
  });

  return result.data || [];
}

// ============================================================
// PUBLIC DATA
// ============================================================

export async function getSports() {
  return getSheet("Sports");
}

export async function getColleges() {
  return getSheet("Colleges");
}

export async function getCommitteeMembers() {
  return getSheet("CommitteeMembers");
}

export async function getSchedules() {
  return getSheet("Schedules");
}

export async function getResults() {
  return getSheet("Results");
}

export async function getNotices() {
  return getSheet("Notices");
}

export async function getGallery() {
  return getSheet("Gallery");
}

export async function getSportImages() {
  return getSheet("SportImages");
}

export async function getSettings() {
  return getSheet("Settings");
}

// ============================================================
// PLAYER REGISTRATION
// ============================================================

export async function registerPlayer(data: Record<string, any>) {
  return apiPost("registerPlayer", {
    data,
  });
}

// ============================================================
// COLLEGE REGISTRATION
// ============================================================

export async function registerCollege(data: Record<string, any>) {
  return apiPost("registerCollege", {
    data,
  });
}

// ============================================================
// ADMIN LOGIN
// ============================================================

export async function adminLogin(
  email: string,
  password: string
) {
  return apiPost("login", {
    email,
    password,
  });
}

// ============================================================
// ADMIN LOGOUT
// ============================================================

export async function adminLogout(token: string) {
  return apiPost("logout", {
    token,
  });
}

// ============================================================
// ADMIN CRUD
// ============================================================

export async function createRecord(
  token: string,
  sheet: string,
  data: Record<string, any>
) {
  return apiPost("create", {
    token,
    sheet,
    data,
  });
}

export async function updateRecord(
  token: string,
  sheet: string,
  id: string,
  data: Record<string, any>
) {
  return apiPost("update", {
    token,
    sheet,
    id,
    data,
  });
}

export async function deleteRecord(
  token: string,
  sheet: string,
  id: string
) {
  return apiPost("delete", {
    token,
    sheet,
    id,
  });
}

// ============================================================
// ADMIN GET
// ============================================================

export async function adminGet<T = any>(
  token: string,
  sheet: string
): Promise<T[]> {
  const result = await apiGet<T>("adminGet", {
    token,
    sheet,
  });

  return result.data || [];
}

// ============================================================
// IMAGE UPLOAD
// ============================================================

export async function uploadImage(
  token: string,
  base64Data: string,
  fileName: string,
  mimeType: string,
  bucket = "general"
) {
  return apiPost("uploadImage", {
    token,
    data: base64Data,
    fileName,
    mimeType,
    bucket,
  });
}

// ============================================================
// TEST
// ============================================================

export async function testApi() {
  return apiGet("test");
}