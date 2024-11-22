import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  isLoading: boolean;
  error: any | null;
  success: string | null;
  userCategories: any | null;
  userSubCategories: any | null;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  success: null,
  userCategories: null,
  userSubCategories: null,
};

// Thunk for fetching video progress
export const getCategories = createAsyncThunk<any, any>(
  "auth/getCategories",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/categories`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch video progress";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getSubCategories = createAsyncThunk<
  any,
  { subCategories: number }
>("auth/getSubCategories", async ({ subCategories }, { rejectWithValue }) => {
  try {
    // Build the URL with the subCategories ID
    const response = await axios.get(
      `/api/subCategories?subCategories=${subCategories}`
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch subCategories";
    return rejectWithValue(errorMessage);
  }
});

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCategories = action.payload;
        state.success = "Successfully profile updated";
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(getSubCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userSubCategories = action.payload;
        state.success = "Successfully profile updated";
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const {} = categories.actions;
export default categories.reducer;
