// src/lib/axios.js
import axios from "axios";

const BASE_HOST = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${BASE_HOST}/api`,
  withCredentials: true, // needed if using cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const register = () => {};

export const login = () => {};

export const logout = () => {};

export const getCurrentUser = () => {};

export const forgotPassword = () => {};

export const resetPassword = () => {};

export default api;
