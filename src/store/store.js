import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlices";
import businessReducer from "../features/businessSlices";
import salesReducer from "../features/salesSlices";
import expensesReducer from "../features/expensesSlices";
import publicBusinessReducer from "../features/publicBusinessSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    business: businessReducer,
    sales: salesReducer,
    expenses: expensesReducer,
    publicBusiness: publicBusinessReducer,
  },
});
