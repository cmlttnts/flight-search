import { useNavigate } from "react-router-dom";
import { Button, NumberInput, Radio, Select } from "@mantine/core";
import { CITIES, FARE_CATEGORY_LOCAL_STORAGE_KEY } from "../constants";
import { DatePickerInput } from "@mantine/dates";
import { setLocalStorageItem } from "../utils";
import { useFlightSearchParams } from "../hooks/useFlightSearchParams";

export function FlightSearch() {
  const { origin, dest, category, numOfPassengers, setParams, params } = useFlightSearchParams();

  const navigate = useNavigate();

  const onOriginChange = (value: string) => {
    setParams(
      (prev) => {
        prev.set("origin", value || "");
        return prev;
      },
      { replace: true }
    );
  };

  const onDestChange = (value: string) => {
    setParams(
      (prev) => {
        prev.set("dest", value || "");
        return prev;
      },
      { replace: true }
    );
  };

  const onCategoryChange = (value: string) => {
    setParams(
      (prev) => {
        prev.set("category", value || "");
        setLocalStorageItem(FARE_CATEGORY_LOCAL_STORAGE_KEY, value);
        return prev;
      },
      { replace: true }
    );
  };

  const onNumOfPassengersChange = (value: number) => {
    setParams(
      (prev) => {
        prev.set("count", value.toString());
        return prev;
      },
      { replace: true }
    );
  };

  const onSubmit = () => {
    const url = "/flight/list?" + new URLSearchParams(params).toString();
    navigate(url);
  };

  return (
    <div style={{ backgroundColor: "#063048", color: "white", height: "100%", width: "100%", padding: "1rem 2rem" }}>
      <header>
        <h1>
          <span role="img" aria-label="plane">
            ✈️
          </span>{" "}
          Uçak Bileti Arama
        </h1>
      </header>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
        <Select
          label="Nereden"
          placeholder="Nereden"
          data={[...CITIES].filter((city) => city !== dest)}
          value={origin}
          onChange={onOriginChange}
          searchable
        />
        <Select
          searchable
          label="Nereye"
          placeholder="Nereye"
          data={[...CITIES].filter((city) => city !== origin)}
          value={dest}
          onChange={onDestChange}
        />
        <DatePickerInput label="Tarih" placeholder="Tarih" />

        <Radio.Group value={category} onChange={onCategoryChange} name="category" label="Kabin">
          <Radio value="ECONOMY" label="Economy Class" />
          <Radio value="BUSINESS" label="Business Class" />
        </Radio.Group>

        <NumberInput
          label="Yolcu Sayısı"
          placeholder="Yolcu Sayısı"
          value={numOfPassengers}
          onChange={onNumOfPassengersChange}
          min={1}
        />
        <Button variant="filled" onClick={onSubmit} color="red">
          Ara
        </Button>
      </div>
    </div>
  );
}
