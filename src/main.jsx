import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Root from "./routers/root";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
