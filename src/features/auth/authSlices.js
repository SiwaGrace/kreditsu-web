import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCsrfCookie,
  registerRequest,
  loginRequest,
  logoutRequest,
  fetchUserRequest,
  updateUserRequest,
} from "../../api/auth.api";

// ─── Thunks ────────────
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      await getCsrfCookie();
      const data = await fetchUserRequest();
      return data;
    } catch {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const data = await registerRequest(userData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Registration failed",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await loginRequest(credentials);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Login failed",
      );
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutRequest();
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message ?? "Logout failed",
    );
  }
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const data = await updateUserRequest(userData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to update profile",
      );
    }
  },
);

// ─── Initial State ──────────
const initialState = {
  user: null,
  isAuthenticated: false,
  authChecked: false, // have we checked the session yet, so user doesn't flash between logged out and logged in states on page load
  message: null,
  error: null,
  loading: false, // for fetchUser only
  loginLoading: false,
  registerLoading: false,
  logoutLoading: false,
  updateLoading: false,
};

// ─── Slice ──────────
export const authSlice = createSlice({
  name: "auth",
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
    // ── fetchUser ──────────────────────────────────────────────────────────
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true; // checked but no session
        state.loading = false;
      });

    // ── register ───────────────────────────────────────────────────────────
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.registerLoading = false;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload;
      });

    // ── login ──────────────────────────────────────────────────────────────
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loginLoading = false;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload;
      });

    // ── logout ─────────────────────────────────────────────────────────────
    builder
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.logoutLoading = false;
        state.message = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.error = action.payload;
      });

    // ── updateUser ──────────────────────────────────────────────────────────
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? action.payload ?? state.user;
        state.updateLoading = false;
        state.message = action.payload?.message ?? null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage } = authSlice.actions;

export default authSlice.reducer;
