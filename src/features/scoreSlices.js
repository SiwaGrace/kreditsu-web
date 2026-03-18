import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchScoreRequest } from "../api/score.api";

export const fetchScore = createAsyncThunk(
  "score/fetchScore",
  async (_, thunkAPI) => {
    try {
      const data = await fetchScoreRequest();
      return data;
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) return thunkAPI.rejectWithValue(null);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch Kreditsu score",
      );
    }
  },
);

const initialState = {
  score: null,
  breakdown: null,
  message: null,
  loading: false,
  error: null,
  lastFetchedAt: null,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    clearScoreError: (state) => {
      state.error = null;
    },
    clearScore: (state) => {
      state.score = null;
      state.breakdown = null;
      state.message = null;
      state.error = null;
      state.loading = false;
      state.lastFetchedAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScore.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message ?? null;
        state.score = action.payload?.score ?? null;
        state.breakdown = action.payload?.breakdown ?? null;
        state.lastFetchedAt = Date.now();
      })
      .addCase(fetchScore.rejected, (state, action) => {
        state.loading = false;
        state.score = null;
        state.breakdown = null;
        state.lastFetchedAt = Date.now();
        state.error = action.payload ?? null;
      });
  },
});

export const { clearScoreError, clearScore } = scoreSlice.actions;

export default scoreSlice.reducer;

