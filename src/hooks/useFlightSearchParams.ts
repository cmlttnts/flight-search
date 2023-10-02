import { useSearchParams } from "react-router-dom";
import { getLocalStorageItem } from "../utils";
import { FARE_CATEGORY, FARE_CATEGORY_LOCAL_STORAGE_KEY } from "../constants";

export function useFlightSearchParams() {
  const [params, setParams] = useSearchParams({
    origin: "",
    dest: "",
    count: "1",
    // get initial from localStorage
    category: getLocalStorageItem(FARE_CATEGORY_LOCAL_STORAGE_KEY) || FARE_CATEGORY.ECONOMY,
  });
  const origin = params.get("origin") || "";
  const dest = params.get("dest") || "";
  const category = params.get("category") || "";
  const numOfPassengers = parseInt(params.get("count") || "1") || 1;

  return {
    setParams,
    params,
    origin,
    dest,
    category,
    numOfPassengers,
  };
}
