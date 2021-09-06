import axios from "axios";

const errorHandle = (status, message) => {
  switch (status) {
    case 400:
      console.error(message);
      break;
    case 401:
      console.error(message);
      break;
    case 403:
      console.error(message);
      break;
    case 404:
      console.error(message);
      break;
    case 500:
      console.error(message);
      break;
    case 503:
      console.error(message);
      break;
    default:
      console.error(`Unexpected error:${status}`);
  }
};

const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (reponse) => reponse,
  (error) => {
    const { response } = error;
    const { data, status } = response || {};
    if (response) {
      errorHandle(status, data);
    }
    return Promise.reject(error);
  }
);

export const apiGetRequest = ({ url, config }) => instance.get(url, config);
