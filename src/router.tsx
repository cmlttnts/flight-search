import { Navigate, createBrowserRouter } from "react-router-dom";
import { FlightSearch } from "./routes/FlightSearch";
import { FlightList } from "./routes/FlightList";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/flight/search" replace />, errorElement: <div>404</div> },
  { path: "/flight/search", element: <FlightSearch /> },
  { path: "/flight/list", element: <FlightList /> },
]);

export default router;
