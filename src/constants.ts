export const CITIES = ["İstanbul", "Ankara", "Antalya"] as const;

export const CITIES_TO_CODES = {
  İstanbul: "IST",
  Ankara: "ANK",
  Antalya: "AYT",
} as Readonly<Record<string, string>>;

export const FARE_CATEGORY = {
  ECONOMY: "ECONOMY",
  BUSINESS: "BUSINESS",
} as const;

export type FareCategoryNameType = (typeof FARE_CATEGORY)[keyof typeof FARE_CATEGORY];

export const FARE_CATEGORY_LOCAL_STORAGE_KEY = "fareCategory";

export const BRAND_CODE = {
  ECO_FLY: "ecoFly",
  EXTRA_FLY: "extraFly",
  PRIME_FLY: "primeFly",
};
