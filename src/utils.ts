import { CITIES_TO_CODES } from "./constants";

export function getLocalStorageItem(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem(key: string, item: unknown) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function filterFlights(flights: FlightType[], originCity: string, destCity: string, category: string) {
  return flights.filter((flight) => {
    return (
      flight.originAirport.city.code === CITIES_TO_CODES[originCity] &&
      flight.destinationAirport.city.code === CITIES_TO_CODES[destCity] &&
      !!flight.fareCategories[category as keyof typeof flight.fareCategories]
    );
  });
}
