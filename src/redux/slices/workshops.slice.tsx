import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/privateAxios";

// Define the state interface
interface WorkshopState {
  workshops: any[];
  loading: boolean;
  error: string | null;
  success: string | null;
  totalCount: number | null;
  enrollmentLoading: boolean;
  enrollmentSuccess: string | null;
  enrollmentError: string | null;
}

const initialState: WorkshopState = {
  workshops: [],
  loading: false,
  error: null,
  success: null,
  totalCount: null,
  enrollmentLoading: false,
  enrollmentSuccess: null,
  enrollmentError: null,
};

// Thunk for fetching workshops
export const fetchWorkshops = createAsyncThunk<any, { page: number; size: number }>(
  "workshop/fetchWorkshops",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/workShops?page=${page}&size=${size}`);
      return response.data.data; // Assuming the API response structure has data in this format
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch workshops";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for fetching total workshop count
export const fetchWorkshopCount = createAsyncThunk<any>(
  "workshop/fetchWorkshopCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/workshopCount`);
      return response.data.totalCount; // Assuming the API response structure has totalCount in this format
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch workshop count";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for creating a new workshop
export const createWorkshop = createAsyncThunk<any, FormData>(
  "workshop/createWorkshop",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/workshops", formData);
      return response.data.data; // Returning created workshop data
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to create workshop";
      return thunkAPI.rejectWithValue(errorMessage); // Handle errors
    }
  }
);

// Thunk for deleting a workshop
export const deleteWorkshop = createAsyncThunk<any, number>(
  "workshop/deleteWorkshop",
  async (workshopId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/api/workshops?workShopId=${workshopId}`);
      return response.data.message; // Returning success message
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to delete workshop";
      return thunkAPI.rejectWithValue(errorMessage); // Handle errors
    }
  }
);

// Thunk for enrolling a user in a workshop
export const enrollUserInWorkshop = createAsyncThunk<
  any,
  { userId: number; workshopId: number },
  { rejectValue: string }
>(
  "workshop/enrollUser",
  async ({ userId, workshopId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/workshopEnrollment", { userId, workshopId });
      return response.data; // Assuming the API response contains success and message
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to enroll in workshop";
      return rejectWithValue(errorMessage);
    }
  }
);


const workshopSlice = createSlice({
  name: "workshop",
  initialState,
  reducers: {
    // Action to clear success and error messages
    clearMessages(state) {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch workshops
      .addCase(fetchWorkshops.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.loading = false;
        state.workshops = action.payload;
        state.success = "Workshops fetched successfully!";
      })
      .addCase(fetchWorkshops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch workshop count
      .addCase(fetchWorkshopCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkshopCount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCount = action.payload;
        state.success = "Workshop count fetched successfully!";
      })
      .addCase(fetchWorkshopCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create a new workshop
      .addCase(createWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.workshops.push(action.payload);
        state.success = "Workshop created successfully!";
      })
      .addCase(createWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete a workshop
      .addCase(deleteWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.workshops = state.workshops.filter(
          (workshop) => workshop.id !== action.meta.arg
        );
      })
      .addCase(deleteWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Enroll a user in a workshop
      .addCase(enrollUserInWorkshop.pending, (state) => {
        state.enrollmentLoading = true;
        state.enrollmentError = null;
        state.enrollmentSuccess = null;
      })
      .addCase(enrollUserInWorkshop.fulfilled, (state, action) => {
        state.enrollmentLoading = false;
        state.enrollmentSuccess = action.payload.message || "Enrollment successful!";
      })
      .addCase(enrollUserInWorkshop.rejected, (state, action) => {
        state.enrollmentLoading = false;
        state.enrollmentError = action.payload as string;
      });


  },
});

export const { clearMessages } = workshopSlice.actions;

export default workshopSlice.reducer;
