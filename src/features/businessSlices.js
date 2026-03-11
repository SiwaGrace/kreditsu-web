import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBusiness,
  createBusiness,
  updateBusiness,
} from "../api/business.api";

// ─── Thunks ────────────
export const fetchBusiness = createAsyncThunk(
  "business/fetchBusiness",
  async (_, thunkAPI) => {
    try {
      const data = await getBusiness();
      return data;
    } catch (err) {
      const status = err.response?.status;

      // 404 just means no business yet — not a real error
      if (status === 404) {
        return thunkAPI.rejectWithValue(null);
      }

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch business",
      );
    }
  },
);

export const registerBusiness = createAsyncThunk(
  "business/registerBusiness",
  async (businessData, thunkAPI) => {
    try {
      const data = await createBusiness(businessData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to create business",
      );
    }
  },
);

export const editBusiness = createAsyncThunk(
  "business/editBusiness",
  async (businessData, thunkAPI) => {
    try {
      const data = await updateBusiness(businessData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to update business",
      );
    }
  },
);

// ─── Initial State ──────────
const initialState = {
  business: null,
  hasBusiness: false, //businessChecked is true. true means business exists, false means it doesn't.
  businessChecked: false, // have we checked if user has a business yet|have we made the API call yet?
  message: null,
  error: null,
  loading: false, // for fetchBusiness only
  createLoading: false,
  updateLoading: false,
};

// ─── Slice ──────────
export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchBusiness ──────────────────────────────────────────────────────
    builder
      .addCase(fetchBusiness.pending, (state) => {
        state.loading = true;
        state.businessChecked = false; // ← reset while re-fetching
      })
      .addCase(fetchBusiness.fulfilled, (state, action) => {
        if (!action.payload) return; // ← guard against undefined payload
        state.business = action.payload.business ?? null;
        state.hasBusiness = true;
        state.businessChecked = true;
        state.loading = false;
      })
      .addCase(fetchBusiness.rejected, (state, action) => {
        state.business = null;
        state.hasBusiness = false;
        state.businessChecked = true; // checked but no business found
        state.loading = false;
        // only store error if it's a real error, not a 404
        state.error = action.payload ?? null;
      });

    // ── registerBusiness ───────────────────────────────────────────────────
    builder
      .addCase(registerBusiness.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        state.business = action.payload.business;
        state.hasBusiness = true;
        state.createLoading = false;
        state.message = action.payload.message;
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });

    // ── editBusiness ───────────────────────────────────────────────────────
    builder
      .addCase(editBusiness.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(editBusiness.fulfilled, (state, action) => {
        state.business = action.payload.business;
        state.updateLoading = false;
        state.message = action.payload.message;
      })
      .addCase(editBusiness.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage } = businessSlice.actions;

export default businessSlice.reducer;
