import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AssessmentResponseState {
  responseLoading: boolean;
  responseError: string | null;
  assessmentsResponse: any[];
  responseSuccess: any | null;
}

const initialState: AssessmentResponseState = {
  responseLoading: false,
  responseError: null,
  responseSuccess: null,
  assessmentsResponse: [],
};

export const fetchAssessmentsResponse = createAsyncThunk<any, any>(
  "assessment/fetchAssessmentsResponse",
  async ({ userId }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/getAssessmentResponse?userId=${userId}`
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

const assessmentSlice = createSlice({
  name: "assessmentResponse",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.responseSuccess = false;
    },
    resetError(state) {
      state.responseError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assessments
      .addCase(fetchAssessmentsResponse.pending, (state) => {
        state.responseLoading = true;
        state.responseError = null;
        state.responseSuccess = false;
      })
      .addCase(fetchAssessmentsResponse.fulfilled, (state, action) => {
        state.responseLoading = false;
        state.assessmentsResponse = action.payload;
        state.responseSuccess = true;
      })
      .addCase(fetchAssessmentsResponse.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.responseError = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError } = assessmentSlice.actions;

export default assessmentSlice.reducer;
