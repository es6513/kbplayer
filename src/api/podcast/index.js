import { apiGetRequest } from "@/api/axiosBase";

export const apiGetXmlFile = (payload) => {
  const { endPoint } = payload;
  const requestPayload = {
    url: endPoint,
  };
  return apiGetRequest(requestPayload);
};
