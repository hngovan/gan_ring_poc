import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import Login from "../components/login.jsx";
import Home from "../components";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
