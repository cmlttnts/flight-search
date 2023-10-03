import { Alert } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

export function FlightPurchase() {
  const [params] = useSearchParams();

  const success = params.get("success");

  if (success === "true") {
    return <Alert color="green">Flight Purchase Successful</Alert>;
  } else {
    return <Alert color="red">Flight Purchase Failed</Alert>;
  }
}
