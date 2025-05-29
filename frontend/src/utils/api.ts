import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

const getCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1] ?? null;

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refreshToken = getCookie("refreshToken");

      if (refreshToken) {
        try {
          await api.post("/auth/refresh", { token: refreshToken });
          return api.request(err.config);
        } catch {}
      }
    }

    return Promise.reject(err);
  }
);
