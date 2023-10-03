import { useEffect, useMemo, useState } from "react";
import { useFlightSearchParams } from "../hooks/useFlightSearchParams";
import { getFlights } from "../api/flight";
import { filterFlights } from "../utils";
import { Alert, Loader, Modal, Radio } from "@mantine/core";
import { FlightRow } from "../components/FlightRow";
import { Link, useNavigate } from "react-router-dom";
import { BRAND_CODE, FARE_CATEGORY, FareCategoryNameType, SUB_CATEGORY_STATUS } from "../constants";

const SORT_TYPE = {
  PRICE: "price",
  START_TIME: "startTime",
};

export function FlightList() {
  const { origin, dest, category, numOfPassengers, params } = useFlightSearchParams();
  const navigate = useNavigate();

  const [flights, setFlights] = useState<FlightType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const [sortType, setSortType] = useState(SORT_TYPE.PRICE);

  const [selectedFlightIndex, setSelectedFlightIndex] = useState<number | null>(null);
  const [selectedFareCategoryName, setSelectedFareCategoryName] = useState<FareCategoryNameType | null>(null);

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

  const sortedFlights = useMemo(() => {
    if (category !== FARE_CATEGORY.BUSINESS && category !== FARE_CATEGORY.ECONOMY) {
      return flights;
    }

    type KEYS_TYPE = keyof typeof FARE_CATEGORY;
    const newcategory = category as (typeof FARE_CATEGORY)[KEYS_TYPE];

    if (sortType === SORT_TYPE.PRICE) {
      return [...flights].sort((a, b) => {
        const ecoFlyPriceA = a.fareCategories[newcategory].subcategories.find((x) => x.brandCode === BRAND_CODE.ECO_FLY)
          ?.price.amount;
        const ecoFlyPriceB = b.fareCategories[newcategory].subcategories.find((x) => x.brandCode === BRAND_CODE.ECO_FLY)
          ?.price.amount;
        if (ecoFlyPriceA == null) {
          return 1;
        }

        if (ecoFlyPriceB == null) {
          return -1;
        }

        return ecoFlyPriceA - ecoFlyPriceB;
      });
    }

    return [...flights].sort((a, b) => {
      const aDate = new Date(a.arrivalDateTimeDisplay);
      const bDate = new Date(b.arrivalDateTimeDisplay);

      return aDate.getTime() - bDate.getTime();
    });
  }, [flights, sortType, category]);

  const onPurchaseButtonClick = async (flight: FlightType, categoryName: FareCategoryNameType, brandCode: string) => {
    if (
      flight.fareCategories[categoryName].subcategories.find((x) => x.brandCode === brandCode)?.status ===
      SUB_CATEGORY_STATUS.AVAILABLE
    ) {
      navigate("/flight/purchase?success=true");
    } else {
      navigate("/flight/purchase?success=false");
    }
  };

  return (
    <div>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem" }}>
        <h1>Uçuş Seferleri Listesi</h1>
        <Link to={`/flight/search?${params.toString()}`}>Arama Sayfasına Geri Dön &rarr;</Link>
      </header>
      <div>
        <Radio.Group
          value={sortType}
          onChange={(x) => setSortType(x)}
          name="category"
          label="Sıralama Ölçütü"
          style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "1rem" }}
        >
          <Radio value="price" label="Ücrete Göre" />
          <Radio value="BUSINESS" label="Kalkış Saatine Göre" />
        </Radio.Group>
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
          <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            {sortedFlights.map((flight, index) => {
              return (
                <FlightRow
                  onPurchaseButtonClick={onPurchaseButtonClick}
                  flight={flight}
                  key={flight.arrivalDateTimeDisplay}
                  onSelect={(categoryTypeName: FareCategoryNameType) => {
                    if (selectedFlightIndex === index && selectedFareCategoryName === categoryTypeName) {
                      setSelectedFlightIndex(null);
                      setSelectedFareCategoryName(null);
                    } else if (selectedFlightIndex === index && selectedFareCategoryName !== categoryTypeName) {
                      setSelectedFareCategoryName(categoryTypeName);
                    } else if (selectedFlightIndex !== index && selectedFareCategoryName === categoryTypeName) {
                      setSelectedFlightIndex(index);
                    } else {
                      setSelectedFlightIndex(index);
                      setSelectedFareCategoryName(categoryTypeName);
                    }
                  }}
                  activeFareCategoryName={selectedFlightIndex === index ? selectedFareCategoryName : null}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
