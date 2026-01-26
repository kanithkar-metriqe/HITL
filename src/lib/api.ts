import xior from "xior";
import type { XiorInstance } from "xior";
import { ENV } from "./env";

// ========== TYPE DEFINITIONS ==========
interface ApiConfig {
  baseURL: string;
  timeout?: number;
}

type ApiInstanceName =
  | "HITL_API"
  | "HITL_FILE_STATUS_API"

// ========== API CONFIGURATION MAP ==========
const API_CONFIGS: Record<ApiInstanceName, ApiConfig> = {
  HITL_API: {
    baseURL: ENV.HITL_API_URL,
    timeout: 30000,
  },
  HITL_FILE_STATUS_API: {
    baseURL: ENV.HITL_FILE_STATUS_API_URL,
    timeout: 30000,
  },
};

// ========== SHARED INTERCEPTOR LOGIC ==========
const addAuthToken = (config: any): any => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
const handleAuthError = (error: any): Promise<any> => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    // window.location.href = "/login";
  }
  return Promise.reject(error);
};

// ========== API FACTORY FUNCTION ==========
const createApiInstance = (configName: ApiInstanceName): XiorInstance => {
  const config = API_CONFIGS[configName];

  if (!config) {
    throw new Error(`API config not found for: ${configName}`);
  }

  const instance = xior.create({
    baseURL: config.baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: config.timeout || 30000,
  });

  // Add request interceptor
  instance.interceptors.request.use(addAuthToken);

  // Add response interceptor
  instance.interceptors.response.use(
    (response) => response,
    handleAuthError
  );

  return instance;
};

// ========== EXPORT API INSTANCES ==========
export const HITL_API = createApiInstance("HITL_API");
export const HITL_FILE_STATUS_API = createApiInstance("HITL_FILE_STATUS_API");

// ========== OPTIONAL: API REGISTRY FOR DYNAMIC ACCESS ==========
const apiInstances: Record<ApiInstanceName, XiorInstance> = {
  HITL_API,
  HITL_FILE_STATUS_API,
};

export const getApiInstance = (name: ApiInstanceName): XiorInstance => {
  const instance = apiInstances[name];
  if (!instance) {
    throw new Error(`API instance not found: ${name}`);
  }
  return instance;
};
