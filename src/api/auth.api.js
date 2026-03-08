import api, { API_BASE } from "./axios";

/** Call before first state-changing request so Laravel sets the CSRF cookie. */
export const getCsrfCookie = () =>
  api.get("/sanctum/csrf-cookie", {
    baseURL: "/",
  });

export const registerRequest = async (userData) => {
  await getCsrfCookie();
  const res = await api.post("/register", userData);
  return res.data;
};

export const loginRequest = async (credentials) => {
  await getCsrfCookie();
  const res = await api.post("/login", credentials);
  return res.data;
};

export const logoutRequest = async () => {
  const res = await api.post("/logout");
  return res.data;
};

export const fetchUserRequest = async () => {
  const res = await api.get("/user");
  return res.data;
};

// not done yet, just placeholders for now
export const forgotPasswordRequest = async () => {};

export const resetPasswordRequest = async () => {};

export default api;
