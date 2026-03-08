import axios from "axios";

// const API_BASE =
//   import.meta.env.VITE_API_BASE_URL ?? "http://kreditsu-api.test";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// Laravel expects the CSRF token in X-XSRF-TOKEN header (from the XSRF-TOKEN cookie)
// automatically attach XSRF-TOKEN to every request
// api.interceptors.request.use((config) => {
//   const token = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("XSRF-TOKEN="))
//     ?.split("=")[1];

//   if (token) {
//     config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
//   }
//   return config;
// });

export default api;
export const API_BASE = "/";
