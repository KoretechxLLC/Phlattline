import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AssessmentResponseState {
  responseLoading: boolean;
  responseError: string | null;
  assessmentsResponse: any[];
  responseSuccess: string | null;
}

const initialState: AssessmentResponseState = {
  responseLoading: false,
  responseError: null,
  responseSuccess: null,
  assessmentsResponse: [],
};

export const fetchAssessmentsResponse = createAsyncThunk<any, void>(
  "assessment/fetchAssessmentsResponse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/getAssessmentResponse");

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
      state.responseSuccess = null;
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
      })
      .addCase(fetchAssessmentsResponse.fulfilled, (state, action) => {
        state.responseLoading = false;
        state.assessmentsResponse = action.payload;
      })
      .addCase(fetchAssessmentsResponse.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseError = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError } = assessmentSlice.actions;

export default assessmentSlice.reducer;
