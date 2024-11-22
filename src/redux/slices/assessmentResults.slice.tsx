import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AssessmentResult {
  resultLoading: boolean;
  result: any | null;
  resultSuccess: string | null;
  resultError: string | null;
}
const initialState: AssessmentResult = {
  resultLoading: false,
  result: null,
  resultSuccess: null,
  resultError: null,
};

export const fetchAssessmentResult = createAsyncThunk<any, any>(
  "assessmnentResult/fetchAssessmentResult",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/getAssessmentResults?userId=${userId}`
      );
      return response?.data?.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to fetch assessments Count";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const assessmnentResultSlice = createSlice({
  name: "assessmnentResult",
  initialState,
  reducers: {
    setResult(state) {
      state.result = null;
    },
    setResultSuccess(state) {
      state.resultSuccess = null;
    },
    setResultError(state) {
      state.resultError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssessmentResult.pending, (state) => {
      state.resultLoading = true;
      state.resultError = null;
      state.resultSuccess = null;
    }),
      builder.addCase(fetchAssessmentResult.fulfilled, (state, action) => {
        state.resultLoading = false;
        state.result = action.payload;

        state.resultSuccess =
          action.payload.message || "Data fetched Successfully!";
      }),
      builder.addCase(fetchAssessmentResult.rejected, (state, action: any) => {
        state.resultLoading = false;
        state.result = null;
        state.resultError =
          action.payload.message || "Failed to fetched Successfully!";
        state.resultSuccess = null;
      });
  },
});

export default assessmnentResultSlice.reducer;
