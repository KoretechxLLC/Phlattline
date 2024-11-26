import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface organizationResponseState {
  responseLoading: boolean;
  responseError: string | null;
  organizationResponse: any[];
  responseSuccess: any | null;
  employee: any[];
  assignCoursesLoading: boolean;
  assignCoursesError: string | null;
  assignCoursesSuccess: string | null;
}

const initialState: organizationResponseState = {
  responseLoading: false,
  responseError: null,
  responseSuccess: null,
  organizationResponse: [],
  employee: [],
  assignCoursesLoading: false,
  assignCoursesError: null,
  assignCoursesSuccess: null,
};

export const fetchAllEmployee = createAsyncThunk<any, any>(
  "organization/fetchAllEmployee",
  async ({ organizationId }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/auth/employee_register/?organization_id=${organizationId}`
      );

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

export const assignCourses = createAsyncThunk<any, any>(
  "organization/assignCourses",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `api/organization/AssignCourse`,
        data
      );

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

const organizationSlice = createSlice({
  name: "organizationResponse",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.responseSuccess = false;
      state.assignCoursesSuccess = null;
    },
    resetError(state) {
      state.responseError = null;
      state.assignCoursesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assessments
      .addCase(fetchAllEmployee.pending, (state) => {
        state.responseLoading = true;
        state.responseError = null;
        state.responseSuccess = false;
      })
      .addCase(fetchAllEmployee.fulfilled, (state, action) => {
        state.responseLoading = false;
        state.employee = action.payload;
        state.responseSuccess = true;
      })
      .addCase(fetchAllEmployee.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.responseError = action.payload as string;
      })
      .addCase(assignCourses.pending, (state) => {
        state.assignCoursesLoading = true;
      })
      .addCase(assignCourses.fulfilled, (state, action) => {
        state.assignCoursesLoading = false;
        state.assignCoursesSuccess = "Assign Course Successfully";
      })
      .addCase(assignCourses.rejected, (state, action) => {
        state.assignCoursesLoading = false;
        state.assignCoursesError =
          "Courses are already assigned to these employees.";
      });
  },
});

export const { resetSuccess, resetError } = organizationSlice.actions;

export default organizationSlice.reducer;
