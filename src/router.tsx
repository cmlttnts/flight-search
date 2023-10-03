import { Navigate, createBrowserRouter } from "react-router-dom";
import { FlightSearch } from "./routes/FlightSearch";
import { FlightList } from "./routes/FlightList";
import { FlightPurchase } from "./routes/FlightPurchase";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/flight/search" replace />, errorElement: <div>404</div> },
  { path: "/flight/search", element: <FlightSearch /> },
  { path: "/flight/list", element: <FlightList /> },
  { path: "/flight/purchase", element: <FlightPurchase /> },
]);

export default router;
