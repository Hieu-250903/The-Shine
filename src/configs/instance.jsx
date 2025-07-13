import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
  baseURL: "https://api.nhannguyen.site/api",
  // baseURL: "https://localhost:7131/api",
});

instance.interceptors.request.use(
  function (config) {
    const token = Cookie.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
