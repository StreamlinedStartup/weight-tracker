import type { WeightEntry, BaserowFile, NewEntryData } from "../types";

const API_TOKEN = import.meta.env.VITE_BASEROW_API_TOKEN;
const TABLE_ID = import.meta.env.VITE_BASEROW_TABLE_ID;
const BASE_URL = (import.meta.env.VITE_BASEROW_BASE_URL || "https://api.baserow.io").replace(/\/$/, "");
const API_URL = `${BASE_URL}/api/database/rows/table/${TABLE_ID}/`;
const UPLOAD_URL = `${BASE_URL}/api/user-files/upload-file/`;

async function apiRequest(url: string, options: RequestInit = {}) {
  const headers: HeadersInit = {
    Authorization: `Token ${API_TOKEN}`,
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Baserow API Error:", errorData);
    throw new Error(errorData.error || "An unknown API error occurred");
  }

  return response.json();
}

export async function getEntries(): Promise<WeightEntry[]> {
  if (!API_TOKEN || !TABLE_ID) {
    throw new Error("Baserow environment variables (VITE_BASEROW_API_TOKEN, VITE_BASEROW_TABLE_ID) are not set in your .env file.");
  }
  const data = await apiRequest(`${API_URL}?user_field_names=true`);
  return data.results;
}

export async function uploadFile(file: File): Promise<BaserowFile> {
  if (!API_TOKEN) {
    throw new Error("Baserow API token is not set.");
  }
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(UPLOAD_URL, {
    method: 'POST',
    headers: {
      Authorization: `Token ${API_TOKEN}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Baserow File Upload Error:", errorData);
    throw new Error(errorData.detail?.[0] || "File upload failed");
  }

  return response.json();
}

export async function createEntry(entryData: NewEntryData): Promise<WeightEntry> {
  if (!API_TOKEN || !TABLE_ID) {
    throw new Error("Baserow environment variables are not set.");
  }
  
  const body = JSON.stringify(entryData);

  return apiRequest(`${API_URL}?user_field_names=true`, {
    method: "POST",
    body: body,
  });
}