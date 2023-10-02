import { useEffect, useState } from "react";
import { useFlightSearchParams } from "../hooks/useFlightSearchParams";
import { getFlights } from "../api/flight";
import { filterFlights } from "../utils";
import { Alert, Loader, Modal } from "@mantine/core";
import { FlightRow } from "../components/FlightRow";

export function FlightList() {
  const { origin, dest, category, numOfPassengers } = useFlightSearchParams();

  const [flights, setFlights] = useState<FlightType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (!origin || !dest || !category || !numOfPassengers) {
      return;
    }

    setLoading(true);
    getFlights()
      .then((flights) => {
        setFlights(filterFlights(flights, origin, dest, category));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [origin, dest, category, numOfPassengers]);

  return (
    <div>
      <h1>Flight List</h1>
      <div>
        {loading && <Loader color="blue" />}
        {error && (
          <Modal opened={isModalOpen} title="Hata" onClose={() => setIsModalOpen(false)}>
            <Alert color="red" title="Hata">
              {error.message}
            </Alert>
          </Modal>
        )}
        {!loading && !error && flights.length === 0 && (
          <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Hata">
            Uçuş bulunamadı
          </Modal>
        )}
        {!loading && !error && (
          <div>
            {flights.map((flight) => (
              <FlightRow flight={flight} key={flight.arrivalDateTimeDisplay} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
