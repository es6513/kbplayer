import axios from "axios";

const instance = axios.create({
  baseURL: `https:${process.env.VUE_APP_PODCAST_URL}`,
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
