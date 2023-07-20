import axios from "axios";
import { assign } from "lodash";
import { ADMIN_AUTH_TOKEN_KEY } from "../constants/authentication";
import * as httpCode from "../constants/httpStatusCode";

const singletonEnforcer = Symbol();

class AxiosClient {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot initialize Axios client single instance");
    }

    this.axiosClient = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const token = localStorage.getItem(ADMIN_AUTH_TOKEN_KEY);

    if (token) {
      this.setHeader(token);
    }

    this.axiosClient.interceptors.response.use(
      (response) => {
        /**
         * issue transform all response
         *
         * Not all response data need to transform data
         * This inefficiently increases the system's resources.
         * and reduces system performance
         *
         */
        return response;
      },
      (error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          const message = error.response;

          if (
            error.response.status === httpCode.UNAUTHENTICATED &&
            localStorage.getItem(ADMIN_AUTH_TOKEN_KEY)
          ) {
            localStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
            // router.push({ name: "AdminLogin" });
            console.log("Token expired");
          }

          if (
            error.response.status === httpCode.FORBIDDEN &&
            message.subString(0, 9) === "FORBIDDEN"
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
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient(singletonEnforcer);
    }

    return this.axiosClientInstance;
  }

  async setHeader(userToken = null) {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  }

  getRequestUrl(resource) {
    return this.axiosClient.defaults.baseURL + resource;
  }

  get(resource, slug = "", config = {}) {
    return this.axiosClient.get(
      this.getRequestUrl(resource),
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  post(resource, data, config = {}) {
    return this.axiosClient.post(
      this.getRequestUrl(resource),
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  update(resource, data, config = {}) {
    return this.axiosClient.put(
      this.getRequestUrl(resource),
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  put(resource, data, config = {}) {
    return this.axiosClient.put(
      this.getRequestUrl(resource),
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  patch(resource, data, config = {}) {
    return this.axiosClient.patch(
      this.getRequestUrl(resource),
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  delete(resource, data, config = {}) {
    return this.axiosClient.delete(this.getRequestUrl(resource), {
      params: data,
      ...assign(config, { headers: this.axiosClient.defaults.headers }),
    });
  }
}

export default AxiosClient.instance;
