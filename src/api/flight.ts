import flightsResp from "../data/flights.json";

type ResponseDataType = {
  flights: FlightType[];
};

const RawData = flightsResp as unknown as ResponseDataType;

// mock
const API_DELAY = 1000;
const SHOULD_FAIL = false;

export async function getFlights() {
  return new Promise<FlightType[]>((resolve, reject) => {
    setTimeout(() => {
      if (SHOULD_FAIL) {
        reject(new Error("Something went wrong"));
      }
      const { flights: flightsArr } = RawData;
      resolve(flightsArr);
    }, API_DELAY);
  });
}
