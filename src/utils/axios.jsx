import axios from "axios";
import { ADMIN_AUTH_TOKEN_KEY } from "../constants/authentication";
import * as httpCode from "../constants/httpStatusCode";

const token = localStorage.getItem(ADMIN_AUTH_TOKEN_KEY);
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete client.defaults.headers.common.Authorization;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      let {
        data: { message },
      } = error.response;

      if (message && Array.isArray(message)) {
        message = message.join(",");
      }

      if (message && typeof message === "object") {
        return Promise.reject(error);
      }

      if (error.response.status === httpCode.UNAUTHENTICATED) {
        localStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
        window.location.href = "/login";
      }

      if (
        error.response.status === httpCode.FORBIDDEN &&
        error.response.subString(0, 9) === "FORBIDDEN"
      ) {
        console.log("Access denied");
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      if (axios.isCancel(error)) {
        console.warn("Request is canceled");
      }

      return Promise.reject(error);
    }
    return Promise.reject(error.response);
  }
);

export default client;
