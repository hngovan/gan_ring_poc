import { useRoutes } from "react-router-dom";
import ErrorPage from "../error-page";
import Login from "../components/login.jsx";
import PrivateRoutes from "../utils/PrivateRoutes";

function Root() {
  const router = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <PrivateRoutes />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <div className="App">{router}</div>;
}
export default Root;
