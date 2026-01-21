import xior from "xior";
import { ENV } from "./env";

export const HITL_API = xior.create({
  baseURL: ENV.HITL_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

HITL_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

HITL_API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const HITL_FILE_STATUS_API_URL = xior.create({
  baseURL: ENV.HITL_FILE_STATUS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

HITL_FILE_STATUS_API_URL.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

HITL_FILE_STATUS_API_URL.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
