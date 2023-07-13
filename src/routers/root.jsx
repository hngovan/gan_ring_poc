import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorPage from "../error-page";
import Login from "../components/login.jsx";
import Home from "../components";
import PrivateRoutes from "../utils/PrivateRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} exact />
      </Route>
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
