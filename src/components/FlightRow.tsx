import { Button, Card, Collapse } from "@mantine/core";
import { FareCategoryCol } from "./FareCategoryCol";
import { FARE_CATEGORY, FareCategoryNameType } from "../constants";

export function FlightRow({
  flight,
  onSelect,
  activeFareCategoryName,
  onPurchaseButtonClick,
}: {
  flight: FlightType;
  onSelect: (x: FareCategoryNameType) => void;
  activeFareCategoryName: FareCategoryNameType | null;
  onPurchaseButtonClick: (flight: FlightType, categoryName: FareCategoryNameType, brandCode: string) => void;
}) {
  return (
    <>
      <Card
        key={flight.arrivalDateTimeDisplay}
        shadow="sm"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          margin: "0.5rem 0.5rem",
          alignItems: "center",
          backgroundColor: "rgb(235, 235, 235)",
          width: "50%",
        }}
      >
        <p>
          {flight.arrivalDateTimeDisplay} - {flight.departureDateTimeDisplay}
        </p>
        <p>Uçuş Süresi: {flight.flightDuration}</p>
        <FareCategoryCol
          type={FARE_CATEGORY.ECONOMY}
          fareCategory={flight.fareCategories.ECONOMY}
          isActive={activeFareCategoryName === FARE_CATEGORY.ECONOMY}
          onSelect={onSelect}
        />
        <FareCategoryCol
          type={FARE_CATEGORY.BUSINESS}
          fareCategory={flight.fareCategories.BUSINESS}
          isActive={activeFareCategoryName === FARE_CATEGORY.BUSINESS}
          onSelect={onSelect}
        />
      </Card>
      <Collapse in={!!activeFareCategoryName} style={{ width: "50%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            width: "100%",
            height: "max-content",
            border: "1px solid black",
          }}
        >
          {flight.fareCategories[activeFareCategoryName!]?.subcategories.map((subCategory) => (
            <Card style={{ width: "33%", border: "1px solid gray" }} key={subCategory.brandCode}>
              <h3 style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{subCategory.brandCode}</span>
                <span>{subCategory.price.amount} TRY</span>
              </h3>
              {subCategory.rights.map((x) => (
                <p key={x} style={{ padding: "0.1rem 0.2rem", backgroundColor: "rgb(235, 235, 235)" }}>
                  {x}
                </p>
              ))}
              <Button
                style={{ marginTop: "auto" }}
                color="#E81932"
                onClick={() => onPurchaseButtonClick(flight, activeFareCategoryName!, subCategory.brandCode)}
              >
                Uçuş Seç
              </Button>
            </Card>
          ))}
        </div>
      </Collapse>
    </>
  );
}
