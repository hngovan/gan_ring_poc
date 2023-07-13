import { createBrowserRouter, Route  } from "react-router-dom";
import ErrorPage from "../error-page";
import Login from "../components/login.jsx";
import Home from "../components";
import PrivateRoutes from "../utils/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <Route path="/" element={<Home />} />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
