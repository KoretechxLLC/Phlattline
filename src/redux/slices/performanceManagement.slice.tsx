import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GoalState {
  loading: boolean;
  error: string | null;
  goals: any[]; // Replace with specific type if you have it
  success: string | null;
}

const initialState: GoalState = {
  loading: false,
  error: null,
  success: null,
  goals: [],
};

// Thunk for fetching goals
export const fetchGoals = createAsyncThunk<any, any>(
  "performanceManagement/fetchGoals",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/usergoal?id=${id}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for submitting goals responses
export const submitGoal = createAsyncThunk<any, any>(
  "performanceManagement/submitGoal",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/usergoal", data); // Send data as JSON
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to submit goal";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for completing goals
export const completeGoal = createAsyncThunk<any, any>(
  "performanceManagement/completeGoal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`api/usergoal`, { id: id });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to submit goal";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for delete goals
export const deleteGoal = createAsyncThunk<any, any>(
  "performanceManagement/deleteGoal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`api/usergoal?id=${id}`);
      return id;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to submit goal";
      return rejectWithValue(errorMessage);
    }
  }
);

const performanceManagement = createSlice({
  name: "performanceManagement",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Goal
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Submit Goal Responses
      .addCase(submitGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Goal Create Successfully!";
        state.goals = [...state.goals, action.payload.data];
        state.error = null;
      })
      .addCase(submitGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = null;
      })
      // Submit Goal Responses
      .addCase(completeGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(completeGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Goal Completed Successfully!";
        const { id } = action.payload.data;
        const index = state.goals?.findIndex((goal) => goal?.id === id);
        if (index !== -1) {
          state.goals[index] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(completeGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = null;
      })
      // delete Goal Responses
      .addCase(deleteGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Goal Deleted Successfully!";
        const id = action.payload;
        state.goals = state.goals?.filter((goal) => goal?.id !== id);
        state.error = null;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = null;
      });
  },
});

export const { resetSuccess, resetError } = performanceManagement.actions;

export default performanceManagement.reducer;
