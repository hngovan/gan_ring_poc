import { Navigate } from "react-router-dom";
import Home from "../components";

const PrivateRoutes = () => {
  let auth = { token: false };
  const authLogin = localStorage.getItem("auth");
  if (authLogin) {
    auth.token = true;
  }

  return auth.token ? <Home /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
