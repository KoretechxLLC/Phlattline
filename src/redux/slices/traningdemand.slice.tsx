import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/privateAxios";
// Define the state interface
interface TrainingOnDemandState {
  trainingSessions: any[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: TrainingOnDemandState = {
    trainingSessions: [],
    loading: false,
    error: null,
    success: null,
  };
  

// Thunk for fetching training sessions for a specific user
export const fetchTrainingOnDemand = createAsyncThunk<any, number>(
  "trainingOnDemand/fetchTrainingOnDemand",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/trainingondemand?userId=${userId}`);
      return response.data.data; // Assuming the API response structure has data in this format
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch training sessions";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for creating a new training session
export const createTrainingOnDemand = createAsyncThunk<any, any>(
  "trainingOnDemand/createTrainingOnDemand",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/trainingondemand", formData);
      return response.data.data; // Returning created training session data
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to create training session";
        return thunkAPI.rejectWithValue(errorMessage);  // Handle errors
    }
  }
);

const trainingOnDemandSlice = createSlice({
  name: "trainingOnDemand",
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
      // Fetch training sessions
      .addCase(fetchTrainingOnDemand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchTrainingOnDemand.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingSessions = action.payload;
        state.success = "Training sessions fetched successfully!";
      })
      .addCase(fetchTrainingOnDemand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create a new training session
      .addCase(createTrainingOnDemand.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTrainingOnDemand.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingSessions.push(action.payload);
        state.success = "Training session created successfully!";
      })
      .addCase(createTrainingOnDemand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the action to clear messages
export const { clearMessages } = trainingOnDemandSlice.actions;

export default trainingOnDemandSlice.reducer;
