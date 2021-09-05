import axios from "axios";

const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (reponse) => reponse,
  (error) => Promise.reject(error)
);

export const apiGetRequest = ({ url, config }) => instance.get(url, config);
