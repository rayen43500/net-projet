import axios from "axios";
import { authStorage } from "../features/auth/authStorage";

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 15000
});

apiClient.interceptors.request.use((config) => {
  const snapshot = authStorage.load();
  if (snapshot.token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${snapshot.token}`;
  }
  return config;
});
