import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
