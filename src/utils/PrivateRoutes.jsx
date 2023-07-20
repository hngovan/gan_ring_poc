import { Navigate } from "react-router-dom";
import { ADMIN_AUTH_TOKEN_KEY } from "../constants/authentication";
import Home from "../components";

const PrivateRoutes = () => {
  let auth = { token: false };
  const authLogin = localStorage.getItem(ADMIN_AUTH_TOKEN_KEY);
  if (authLogin) {
    auth.token = true;
  }

  return auth.token ? <Home /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
