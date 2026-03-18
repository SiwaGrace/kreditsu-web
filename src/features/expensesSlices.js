import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createExpense, listExpenses } from "../api/expenses.api";
import { fetchBusiness } from "./businessSlices";
import { fetchScore } from "./scoreSlices";

// ─── Thunks ────────────
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (_, thunkAPI) => {
    try {
      const data = await listExpenses();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch expenses",
      );
    }
  },
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData, thunkAPI) => {
    try {
      const payload = {
        ...expenseData,
        date: expenseData.date || new Date().toISOString().slice(0, 10),
      };
      const data = await createExpense(payload);
      // Keep derived state in sync without reload.
      thunkAPI.dispatch(fetchExpenses());
      thunkAPI.dispatch(fetchBusiness());
      thunkAPI.dispatch(fetchScore());
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to create expense",
      );
    }
  },
);

// ─── Initial State ──────────
const initialState = {
  items: [],
  loading: false,
  createLoading: false,
  error: null,
};

// ─── Slice ──────────
export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    clearExpensesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload?.expenses)) {
          state.items = action.payload.expenses;
        } else if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else {
          state.items = [];
        }
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addExpense.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.createLoading = false;
        if (action.payload?.expense) {
          state.items.unshift(action.payload.expense);
        } else if (action.payload) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExpensesError } = expensesSlice.actions;

export default expensesSlice.reducer;

