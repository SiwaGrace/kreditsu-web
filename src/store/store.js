import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlices";
import businessReducer from "../features/businessSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    business: businessReducer,
  },
});
