import flightsResp from "../data/flights.json";

type ResponseDataType = {
  flights: FlightType[];
};

const RawData = flightsResp as unknown as ResponseDataType;

export async function getFlights() {
  return new Promise<FlightType[]>((resolve) => {
    setTimeout(() => {
      const { flights: flightsArr } = RawData;
      resolve(flightsArr);
    }, 1000);
  });
}
