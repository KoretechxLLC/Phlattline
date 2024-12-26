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
  resignationssucess: string | null;
  resignationserror : string | null;
  departmentCounts: any[] | null; // Add this for storing department counts
  resignationsuccess: string | null;
  resignations: any[] | null;
  usersbyorganization: any[] | null;
}

const initialState: EmployeeReviewState = {
  allreviews: null,
  review: null,
  loading: false,
  error: null,
  assigngoal: null,
  success: null,
  resignationssucess: null,
  resignationserror: null,
  departmentCounts: null, // Initialize as null
  resignationsuccess: null,
  resignations: null,
  usersbyorganization : null,
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

// Async thunk for fetching users by organization_id
export const fetchUsersByOrganizationId = createAsyncThunk(
  "employee/fetchUsersByOrganizationId",
  async (organization_id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/getusersorganization?organization_id=${organization_id}`
      );
      return response.data.data; // Extract the users data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Async thunk for Submit Resignation of employee
export const submitResignation = createAsyncThunk(
  "employee/submitResignation",
  async ({ employee_id, organization_id, reason }: { employee_id: number; organization_id: number; reason: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/resignation`, {
        employee_id,
        organization_id,
        reason,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit resignation"
      );
    }
  }
);


// Async thunk for fetching resignations
export const fetchResignations = createAsyncThunk(
  "resignation/fetchResignations",
  async (
    {
      organization_id,employee_id,id,page = 1,size = 10,}: {
      organization_id: number;employee_id?: number;id?: number;page?: number;size?: number;},
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/api/resignation`, {
        params: { organization_id, employee_id, id, page, size },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch resignations"
      );
    }
  }
);



export const assigngoalemployee = createAsyncThunk(
  "employee/assigngoalemployee",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/organization/assignGoal`, payload);
      return response.data; // Return the API response if successful
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign goal to employees"
      );
    }
  }
);


//Fetch Department in Organziation
export const fetchDepartmentsWithCounts = createAsyncThunk(
  "employee/fetchDepartmentsWithCounts",
  async (organization_id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/organization/deptPositionCount?organization_id=${organization_id}`
      );
      return response.data.data; // Extract the relevant data from the response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch department counts"
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

    // Fetech Department Count
    builder.addCase(fetchDepartmentsWithCounts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDepartmentsWithCounts.fulfilled, (state, action) => {
      state.loading = false;
      state.departmentCounts = action.payload; // Store fetched data
    });
    builder.addCase(fetchDepartmentsWithCounts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Store error message
    });

    //Submit Resigination
    builder.addCase(submitResignation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(submitResignation.fulfilled, (state, action) => {
      state.loading = false;
      state.resignationsuccess = action.payload.message; // Capture success message
    });

    builder.addCase(submitResignation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Capture error message
    });

    //Fetch Resignation Data

    // Fetch Resignations - Pending
    builder.addCase(fetchResignations.pending, (state) => {
      state.loading = true;
      state.resignationserror = null;
    });

    // Fetch Resignations - Fulfilled
    builder.addCase(fetchResignations.fulfilled, (state, action) => {
      state.loading = false;
      state.resignations = action.payload.data;
      state.resignationssucess = action.payload.message;
    });

    // Fetch Resignations - Rejected
    builder.addCase(fetchResignations.rejected, (state, action) => {
      state.loading = false;
      state.resignationserror = action.payload as string;
    });

     // Fetch users by organization_id
     builder.addCase(fetchUsersByOrganizationId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsersByOrganizationId.fulfilled, (state, action) => {
      state.loading = false;
      state.usersbyorganization = action.payload; // Store fetched users data
    });
    builder.addCase(fetchUsersByOrganizationId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Store error message
    });


  },
});

export const { resetError, resetSuccess } = employeeSlice.actions;
export default employeeSlice.reducer;
