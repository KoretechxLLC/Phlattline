import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GoalState {
  loading: boolean;
  error: string | null;
  goals: any[];
  success: string | null;
  data?: any;
  timeLogs?: any[];
  EmployeeGoals: any[];
  logSuccess: any;
  taskUpdate: any;
  taskUpdateSuccess: any;
  taskUpdateError: any;
  taskUpdateLoader: boolean;
}

const initialState: GoalState = {
  loading: false,
  error: null,
  success: null,
  logSuccess: null,
  EmployeeGoals: [],
  goals: [],
  timeLogs: [],
  taskUpdate: null,
  taskUpdateSuccess: null,
  taskUpdateError: null,
  taskUpdateLoader: false,
};

export const fetchGoals = createAsyncThunk<any, any>(
  "performanceManagement/fetchGoals",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/usergoal?id=${id}`);
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


//Employee Fetch Goals Assigned By Organztion
export const EmployeefetchGoals = createAsyncThunk<any, number>(
  "performanceManagement/EmployeefetchGoals",
  async (assignee_id, { rejectWithValue }) => {
    try {
      // Constructing the API URL with only assignee_id
      const response = await axiosInstance.get(`/api/organization/assignGoal?assignee_id=${assignee_id}`);
      return response.data.data; // Return the fetched data
    } catch (error: any) {
      // Handle and return error message properly
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch goals assigned by the organization.";
      return rejectWithValue(errorMessage);
    }
  }
);



export const updateTimemanagement = createAsyncThunk(
  "timeLog/updateTimemanagement",
  async (
    timeData: { user_id: number; timeSpent: number },
    { rejectWithValue }
  ) => {
    // Change string to number
    try {
      const response = await axiosInstance.put("/api/timeManagement", timeData);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to update clock-out time";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchtimelog = createAsyncThunk(
  "timeLog/fetchtimelog",
  async ({ userId, duration }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/timeManagement?id=${userId}&duration=${duration}`
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch time log";
      return rejectWithValue(errorMessage);
    }
  }
);

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

export const completeGoal = createAsyncThunk<any, any>(
  "performanceManagement/completeGoal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/usergoal`, { id: id });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to submit goal";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteGoal = createAsyncThunk<any, any>(
  "performanceManagement/deleteGoal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/usergoal?id=${id}`);
      return id;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to submit goal";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTask = createAsyncThunk<any, any>(
  "performanceManagement/updateTask",
  async ({ goalId, updatedTasks }, { rejectWithValue }) => {
    let dataToSend = {
      goalId: goalId,
      goal_tasks: updatedTasks,
    };


    try {
      const response = await axiosInstance.put(
        `/api/complete_goal_task`,
        dataToSend
      );
      return response.data;
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
    setUpdateGoals(state,action) {
      state.goals = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
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

      //Employee Assign Goals Cases
      .addCase(EmployeefetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EmployeefetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.EmployeeGoals = action.payload;
      })
      .addCase(EmployeefetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


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
      //Fetch Time Logs
      .addCase(fetchtimelog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.logSuccess = null;
      })
      .addCase(fetchtimelog.fulfilled, (state, action) => {
        state.loading = false;
        state.timeLogs = action.payload.data; // Store fetched timelogs
        state.logSuccess = "Fetch timelogs successfully";
      })
      .addCase(fetchtimelog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
      //Updated Time Managment
      .addCase(updateTimemanagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTimemanagement.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateTimemanagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
      })

      .addCase(updateTask.pending, (state) => {
        state.taskUpdateLoader = true;
        state.taskUpdateError = null;
        state.taskUpdateSuccess = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.taskUpdateLoader = false;
        state.taskUpdateSuccess = "Task Updated Successfully!";
        state.taskUpdate = action.payload.data;
        state.taskUpdateError = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.taskUpdateLoader = false;
        state.taskUpdateError = action.payload as string;
        state.taskUpdateSuccess = null;
      });
  },
});

export const { resetSuccess, resetError,setUpdateGoals } = performanceManagement.actions;

export default performanceManagement.reducer;
