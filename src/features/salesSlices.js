import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSale, listSales } from "../api/sales.api";

// ─── Thunks ────────────
export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async (_, thunkAPI) => {
    try {
      const data = await listSales();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch sales",
      );
    }
  },
);

export const addSale = createAsyncThunk(
  "sales/addSale",
  async (saleData, thunkAPI) => {
    try {
      const payload = {
        ...saleData,
        date: saleData.date || new Date().toISOString().slice(0, 10),
      };
      const data = await createSale(payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to create sale",
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
export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    clearSalesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.items =
          Array.isArray(action.payload?.sales) ?? action.payload?.sales
            ? action.payload.sales
            : action.payload ?? [];
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSale.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.createLoading = false;
        if (action.payload?.sale) {
          state.items.unshift(action.payload.sale);
        } else if (action.payload) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(addSale.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSalesError } = salesSlice.actions;

export default salesSlice.reducer;

