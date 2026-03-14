import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBusinesses, getBusinessBySlug } from "../api/business.api";

// ─── Thunks ────────────
export const fetchPublicBusinesses = createAsyncThunk(
  "publicBusiness/fetchList",
  async (page = 1, thunkAPI) => {
    try {
      const data = await getBusinesses(page);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to load businesses",
      );
    }
  },
);

export const fetchPublicBusinessBySlug = createAsyncThunk(
  "publicBusiness/fetchBySlug",
  async (slug, thunkAPI) => {
    try {
      const data = await getBusinessBySlug(slug);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to load business profile",
      );
    }
  },
);

// ─── Initial State ──────────
const initialState = {
  list: [],
  listLoading: false,
  listError: null,
  page: 1,
  hasMore: false,

  business: null,
  businessLoading: false,
  businessError: null,
};

// ─── Slice ──────────
export const publicBusinessSlice = createSlice({
  name: "publicBusiness",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchPublicBusinesses.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchPublicBusinesses.fulfilled, (state, action) => {
        state.listLoading = false;
        const payload = action.payload ?? {};

        // Handle Laravel pagination response with "data" field
        if (Array.isArray(payload)) {
          state.list = payload;
          state.hasMore = false;
          state.page = 1;
        } else {
          state.list = Array.isArray(payload.data) ? payload.data : state.list;
          state.page = payload.current_page ?? state.page;
          const last = payload.last_page ?? payload.total_pages;
          state.hasMore = typeof last === "number" ? state.page < last : false;
        }
      })
      .addCase(fetchPublicBusinesses.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload;
      })

      // single business by slug
      .addCase(fetchPublicBusinessBySlug.pending, (state) => {
        state.businessLoading = true;
        state.businessError = null;
        state.business = null;
      })
      .addCase(fetchPublicBusinessBySlug.fulfilled, (state, action) => {
        state.businessLoading = false;
        const payload = action.payload ?? null;
        state.business = payload?.business ?? payload ?? null;
      })
      .addCase(fetchPublicBusinessBySlug.rejected, (state, action) => {
        state.businessLoading = false;
        state.businessError = action.payload;
        state.business = null;
      });
  },
});

export default publicBusinessSlice.reducer;
