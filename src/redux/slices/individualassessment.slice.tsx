import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AssessmentState {
  loading: boolean;
  error: string | null;
  assessments: any[]; // Replace with specific type if you have it
  success: any | null;
  assessmentsSuccess: any | null;
}

const initialState: AssessmentState = {
  loading: false,
  error: null,
  success: "",
  assessments: [],
  assessmentsSuccess: false,
};

export const fetchAssessments = createAsyncThunk<any, { size?: number }>(
  "assessment/fetchAssessments",
  async ({ size }, { rejectWithValue }) => {
    try {
      const url = size
        ? `api/initialassessmentform?size=${size}`
        : "api/initialassessmentform";

      const response = await axiosInstance.get(url);

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

// Thunk for submitting assessment responses
export const submitAssessmentResponses = createAsyncThunk<
  any,
  { userId: string; assessmentId: string; responses: any[] }
>(
  "assessment/submitAssessmentResponses",
  async ({ userId, assessmentId, responses }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "api/initialassessmentformresponse",
        {
          userId,
          assessmentId,
          responses,
        }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to submit assessment";
      return rejectWithValue(errorMessage);
    }
  }
);

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = null;
    },
    resetError(state) {
      state.error = null;
    },
    setSuccess(state) {
      state.success = false;
    },
    setAssessmentsSuccess(state) {
      state.assessmentsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assessments
      .addCase(fetchAssessments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.assessmentsSuccess = false;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments = action.payload;
        state.assessmentsSuccess = true;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.assessmentsSuccess = false;
      })
      // Submit Assessment Responses
      .addCase(submitAssessmentResponses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitAssessmentResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Assessment submitted successfully!";
        state.error = null;
      })
      .addCase(submitAssessmentResponses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = null;
      });
  },
});

export const { resetSuccess, resetError } = assessmentSlice.actions;

export default assessmentSlice.reducer;
