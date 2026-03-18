import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  listBusinessSnapshots,
  getBusinessSnapshotByMonth,
  generateBusinessSnapshot,
} from "../api/businessSnapshots.api";

export const fetchBusinessSnapshots = createAsyncThunk(
  "businessSnapshots/fetch",
  async (_, thunkAPI) => {
    try {
      const data = await listBusinessSnapshots();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch snapshots",
      );
    }
  },
);

export const fetchBusinessSnapshotByMonth = createAsyncThunk(
  "businessSnapshots/fetchByMonth",
  async (month, thunkAPI) => {
    try {
      const data = await getBusinessSnapshotByMonth(month);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch snapshot",
      );
    }
  },
);

export const generateSnapshot = createAsyncThunk(
  "businessSnapshots/generate",
  async (month, thunkAPI) => {
    try {
      const data = await generateBusinessSnapshot(month);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to generate snapshot",
      );
    }
  },
);

const initialState = {
  items: [],
  selectedSnapshot: null,
  loading: false,
  generatingLoading: false,
  error: null,
};

export const businessSnapshotsSlice = createSlice({
  name: "businessSnapshots",
  initialState,
  reducers: {
    clearSnapshotsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessSnapshots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessSnapshots.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload ?? [];
        state.items = Array.isArray(payload.business_snapshots)
          ? payload.business_snapshots
          : Array.isArray(payload)
            ? payload
            : [];
      })
      .addCase(fetchBusinessSnapshots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBusinessSnapshotByMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedSnapshot = null;
      })
      .addCase(fetchBusinessSnapshotByMonth.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload ?? null;
        state.selectedSnapshot = payload?.business_snapshot ?? payload ?? null;
      })
      .addCase(fetchBusinessSnapshotByMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedSnapshot = null;
      })

      .addCase(generateSnapshot.pending, (state) => {
        state.generatingLoading = true;
        state.error = null;
      })
      .addCase(generateSnapshot.fulfilled, (state, action) => {
        state.generatingLoading = false;
        const snapshot = action.payload?.business_snapshot;
        if (!snapshot) return;

        // Update or add snapshot in items list
        const existingIndex = state.items.findIndex(
          (s) => s.month === snapshot.month,
        );
        if (existingIndex > -1) {
          state.items[existingIndex] = snapshot;
        } else {
          state.items.unshift(snapshot);
        }
      })
      .addCase(generateSnapshot.rejected, (state, action) => {
        state.generatingLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSnapshotsError } = businessSnapshotsSlice.actions;

export default businessSnapshotsSlice.reducer;
