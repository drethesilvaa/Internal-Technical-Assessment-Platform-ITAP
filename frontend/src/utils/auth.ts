import axios from "axios";

const API = "http://localhost:3001";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export const authApi = axios.create({
  baseURL: API,
});

authApi.interceptors.request.use((config: any) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
