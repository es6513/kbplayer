import { apiGetRequest } from "@/api/axiosBase";

export const apiGetXmlFile = (payload) => {
  console.log(payload);

  const { endPoint } = payload;
  const requestPayload = {
    url: endPoint,
  };
  return apiGetRequest(requestPayload);
};
