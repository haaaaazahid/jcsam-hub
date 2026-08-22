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
  data?: T;
  message?: string;
  error?: string;
  token?: string;
  admin?: any;
}

// ============================================================
// GET PUBLIC SHEET
// ============================================================

export async function getSheet<T = any>(
  sheet: string
): Promise<T[]> {
  const url =
    `${API_URL}?action=get&sheet=${encodeURIComponent(sheet)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  const result: ApiResponse<T[]> =
    await response.json();

  if (!result.success) {
    throw new Error(
      result.error || "Failed to fetch data"
    );
  }

  return result.data || [];
}

// ============================================================
// ADMIN GET
// ============================================================

export async function adminGet<T = any>(
  sheet: string,
  token: string
): Promise<T[]> {
  const url =
    `${API_URL}?action=adminGet` +
    `&sheet=${encodeURIComponent(sheet)}` +
    `&token=${encodeURIComponent(token)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  const result: ApiResponse<T[]> =
    await response.json();

  if (!result.success) {
    throw new Error(
      result.error || "Failed to fetch data"
    );
  }

  return result.data || [];
}

// ============================================================
// POST REQUEST
// ============================================================

export async function postApi<T = any>(
  body: Record<string, any>
): Promise<ApiResponse<T>> {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  const result: ApiResponse<T> =
    await response.json();

  if (!result.success) {
    throw new Error(
      result.error || "API request failed"
    );
  }

  return result;
}

// ============================================================
// CREATE
// ============================================================

export async function createRecord<T = any>(
  sheet: string,
  data: Record<string, any>,
  token: string
): Promise<T> {

  const result =
    await postApi<T>({
      action: "create",
      sheet,
      data,
      token,
    });

  return result.data as T;
}

// ============================================================
// UPDATE
// ============================================================

export async function updateRecord(
  sheet: string,
  id: string,
  data: Record<string, any>,
  token: string
): Promise<void> {

  await postApi({
    action: "update",
    sheet,
    id,
    data,
    token,
  });
}

// ============================================================
// DELETE
// ============================================================

export async function deleteRecord(
  sheet: string,
  id: string,
  token: string
): Promise<void> {

  await postApi({
    action: "delete",
    sheet,
    id,
    token,
  });
}

// ============================================================
// PLAYER REGISTRATION
// ============================================================

export async function registerPlayer(
  data: Record<string, any>
) {
  return postApi({
    action: "registerPlayer",
    data,
  });
}

// ============================================================
// COLLEGE REGISTRATION
// ============================================================

export async function registerCollege(
  data: Record<string, any>
) {
  return postApi({
    action: "registerCollege",
    data,
  });
}

// ============================================================
// ADMIN LOGIN
// ============================================================

export async function loginAdmin(
  email: string,
  password: string
) {

  return postApi({
    action: "login",
    email,
    password,
  });

}

// ============================================================
// ADMIN LOGOUT
// ============================================================

export async function logoutAdmin(
  token: string
) {

  return postApi({
    action: "logout",
    token,
  });

}

// ============================================================
// IMAGE UPLOAD
// ============================================================

export async function uploadImage(
  base64: string,
  fileName: string,
  mimeType: string,
  bucket: string,
  token: string
) {

  return postApi({
    action: "uploadImage",
    data: base64,
    fileName,
    mimeType,
    bucket,
    token,
  });

}

// ============================================================
// CONNECTION TEST
// ============================================================

export async function testApi() {

  const response =
    await fetch(
      `${API_URL}?action=test`
    );

  return response.json();

}

// ============================================================
// DEFAULT API OBJECT
// ============================================================

export const api = {
  getSheet,
  adminGet,
  postApi,
  createRecord,
  updateRecord,
  deleteRecord,
  registerPlayer,
  registerCollege,
  loginAdmin,
  logoutAdmin,
  uploadImage,
  testApi,
};

export default api;