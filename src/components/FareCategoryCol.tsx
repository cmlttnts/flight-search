export function FareCategoryCol({ fareCategory, name }: { fareCategory: FareCategoryType; name: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
      {name}:
      <span style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
        <span>Yolcu Başına</span>
        <span>
          TRY {[...fareCategory.subcategories].sort((a, b) => a.price.amount - b.price.amount)[0].price.amount}
        </span>
      </span>
    </div>
  );
}
