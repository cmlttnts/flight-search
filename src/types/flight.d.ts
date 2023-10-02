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

type FlightType = {
  originAirport: AirportType;
  destinationAirport: AirportType;
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  fareCategories: {
    BUSINESS: null;
    ECONOMY: null;
  };
};
