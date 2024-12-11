import axiosInstance from "@/app/utils/privateAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface EmployeeReviewState {
  allreviews: any[] | null;
  review: any | null;
  loading: boolean;
  error: string | null;
  assigngoal: any;
  success: string | null; 
}

const initialState: EmployeeReviewState = {
  allreviews: null,
  review: null,
  loading: false,
  error: null,
  assigngoal: null,
  success: null,
};

// Async thunk for fetching all employee reviews by organization_id
export const fetchEmployeeReviews = createAsyncThunk(
  "employee/fetchEmployeeReviews",
  async (organization_id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/organization/employee_review?organization_id=${organization_id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch reviews");
    }
  }
);


export const assigngoalemployee = createAsyncThunk(
  "employee/assigngoalemployee",
  async (payload:any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/organization/assignGoal`, payload);
      return response.data; // Return the API response if successful
    } catch (error:any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign goal to employees"
      );
    }
  }
);



//Update Assign Goals
export const updategoalemployee = createAsyncThunk(
  "employee/updategoalemployee",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/organization/assignGoal`, payload);
      return response.data; // Return the API response if successful
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update goal for employees"
      );
    }
  }
);


// Async thunk for fetching a specific employee review by employee_id and organization_id
export const fetchEmployeeReviewById = createAsyncThunk(
  "employee/fetchEmployeeReviewById",
  async ({ employee_id, organization_id }: { employee_id: number; organization_id: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/organization/employee_review?employee_id=${employee_id}&organization_id=${organization_id}`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch review");
    }
  }
);

// Employee slice
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.assigngoal = null;
    },
   
  },
  extraReducers: (builder) => {
    // Fetch all reviews
    builder.addCase(fetchEmployeeReviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployeeReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.allreviews = action.payload;
    });
    builder.addCase(fetchEmployeeReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    //Assign Goal API 
    .addCase(assigngoalemployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(assigngoalemployee.fulfilled, (state, action) => {
      state.loading = false;
      state.assigngoal = action.payload.message;
    })
    .addCase(assigngoalemployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })


    //Updated Assign Goal
    .addCase(updategoalemployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updategoalemployee.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    })
    .addCase(updategoalemployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });




    // Fetch a specific review
    builder.addCase(fetchEmployeeReviewById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployeeReviewById.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
    });
    builder.addCase(fetchEmployeeReviewById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetError,resetSuccess } = employeeSlice.actions;
export default employeeSlice.reducer;
