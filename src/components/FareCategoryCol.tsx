import { Button } from "@mantine/core";
import { FARE_CATEGORY, FareCategoryNameType } from "../constants";

const TYPE_TO_NAME = {
  [FARE_CATEGORY.ECONOMY]: "Economy",
  [FARE_CATEGORY.BUSINESS]: "Business",
};

export function FareCategoryCol({
  fareCategory,
  type,
  isActive,
  onSelect,
}: {
  fareCategory: FareCategoryType;
  type: (typeof FARE_CATEGORY)[keyof typeof FARE_CATEGORY];
  isActive: boolean;
  onSelect: (x: FareCategoryNameType) => void;
}) {
  const variant = isActive ? "filled" : "default";

  return (
    <Button
      variant={variant}
      onClick={() => {
        onSelect(type);
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1.5rem" }}>
        <span>{TYPE_TO_NAME[type]}</span>
        <span style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
          <span>Yolcu Başına</span>
          <span>
            TRY {[...fareCategory.subcategories].sort((a, b) => a.price.amount - b.price.amount)[0].price.amount}
          </span>
        </span>
      </div>
    </Button>
  );
}
