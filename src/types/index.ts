export interface BaserowFile {
  url: string;
  thumbnails: {
    small: { url: string; width: number; height: number };
    tiny: { url: string; width: number; height: number };
  };
  name: string;
  size: number;
  mime_type: string;
  is_image: boolean;
  image_width: number;
  image_height: number;
  uploaded_at: string;
}

export interface WeightEntry {
  id: number;
  order: string;
  Date: string; // ISO 8601 date string
  "Week #": number;
  "Dose (MG)": number;
  weight: number;
  Notes: string;
  Photos: BaserowFile[];
}

export type NewEntryData = {
  "Date": string;
  "Week #": number;
  "Dose (MG)": number;
  "weight": number;
  "Notes": string;
  "Photos": { name: string }[];
}