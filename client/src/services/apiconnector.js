import axios from "axios";

export const axiosInstance = axios.create();

export const apiConnector = (method, url, bodyData = null, headers = null, params = null, responseType = 'json') => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
    responseType, // Pass responseType to ensure Axios treats it as a Blob
  });
};
