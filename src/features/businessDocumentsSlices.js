import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  listBusinessDocuments,
  uploadBusinessDocument,
  deleteBusinessDocument,
  updateBusinessDocument,
} from "../api/businessDocuments.api";

export const fetchBusinessDocuments = createAsyncThunk(
  "businessDocuments/fetch",
  async (_, thunkAPI) => {
    try {
      const data = await listBusinessDocuments();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch documents",
      );
    }
  },
);

export const addBusinessDocument = createAsyncThunk(
  "businessDocuments/add",
  async (payload, thunkAPI) => {
    try {
      const data = await uploadBusinessDocument(payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to upload document",
      );
    }
  },
);

export const removeBusinessDocument = createAsyncThunk(
  "businessDocuments/remove",
  async (id, thunkAPI) => {
    try {
      const data = await deleteBusinessDocument(id);
      return { id, ...data };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to delete document",
      );
    }
  },
);

export const setBusinessDocumentVerified = createAsyncThunk(
  "businessDocuments/setVerified",
  async ({ id, verified_at }, thunkAPI) => {
    try {
      const data = await updateBusinessDocument(id, { verified_at });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ?? "Failed to update document",
      );
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: null,
};

export const businessDocumentsSlice = createSlice({
  name: "businessDocuments",
  initialState,
  reducers: {
    clearBusinessDocumentsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessDocuments.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload.business_documents ?? [];
        state.items = Array.isArray(payload.documents)
          ? payload.documents
          : Array.isArray(payload)
            ? payload
            : [];
      })
      .addCase(fetchBusinessDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addBusinessDocument.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(addBusinessDocument.fulfilled, (state, action) => {
        state.createLoading = false;
        if (action.payload?.document) {
          state.items.unshift(action.payload.document);
        } else if (action.payload) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(addBusinessDocument.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      .addCase(removeBusinessDocument.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(removeBusinessDocument.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.items = state.items.filter((doc) => doc.id !== action.payload.id);
      })
      .addCase(removeBusinessDocument.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      .addCase(setBusinessDocumentVerified.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(setBusinessDocumentVerified.fulfilled, (state, action) => {
        state.updateLoading = false;
        const updated = action.payload?.document ?? action.payload;
        if (!updated) return;
        state.items = state.items.map((doc) =>
          doc.id === updated.id ? updated : doc,
        );
      })
      .addCase(setBusinessDocumentVerified.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBusinessDocumentsError } = businessDocumentsSlice.actions;

export default businessDocumentsSlice.reducer;
