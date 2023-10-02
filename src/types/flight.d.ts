type FlightSearchParamsType = {
  origin: string;
  dest: string;
  count: string;
};

type AirportType = {
  name: string;
  code: string;
  city: {
    name: string;
    code: string;
  };
  country: {
    name: string;
    code: string;
  };
};

type SubCategoryType = {
  brandCode: string;
  price: {
    amount: number;
    currency: string;
  };
  order: number;
  status: "AVAILABLE" | "ERROR";
  rights: string[];
};

type FareCategoryType = {
  subcategories: SubCategoryType[];
};

type FlightType = {
  originAirport: AirportType;
  destinationAirport: AirportType;
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  fareCategories: {
    BUSINESS: FareCategoryType;
    ECONOMY: FareCategoryType;
  };
};
