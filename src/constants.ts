export const CITIES = ["İstanbul", "Ankara", "Antalya"] as const;

export const CITIES_TO_CODES = {
  İstanbul: "IST",
  Ankara: "ANK",
  Antalya: "AYT",
} as Readonly<Record<string, string>>;

export const FARE_CATEGORY = {
  ECONOMY: "ECONOMY",
  BUSINESS: "BUSINESS",
} as Readonly<Record<string, string>>;

export const FARE_CATEGORY_LOCAL_STORAGE_KEY = "fareCategory";
