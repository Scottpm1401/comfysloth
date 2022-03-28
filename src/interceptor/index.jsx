import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  //Handle Token
  if (localStorage.getItem("access_token") !== null) {
    config.headers = {
      access_token: `Bearer ${localStorage.getItem("access_token")}`,
    };
  }

  return config;
});

export default axiosClient;
