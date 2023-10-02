import { Card } from "@mantine/core";
import { FareCategoryCol } from "./FareCategoryCol";

export function FlightRow({ flight }: { flight: FlightType }) {
  return (
    <Card
      key={flight.arrivalDateTimeDisplay}
      shadow="sm"
      style={{
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <p>
        {flight.arrivalDateTimeDisplay} - {flight.departureDateTimeDisplay}
      </p>
      <p>Uçuş Süresi: {flight.flightDuration}</p>
      <FareCategoryCol name="Ekonomi" fareCategory={flight.fareCategories.ECONOMY} />
      <FareCategoryCol name="Business" fareCategory={flight.fareCategories.BUSINESS} />
    </Card>
  );
}
