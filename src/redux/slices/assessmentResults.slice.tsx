import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AssessmentResult {
  resultLoading: boolean;
  result: any | null;
  resultSuccess: string | null;
  resultError: string | null;
  improvementResultLoading: boolean;
  improvementResult: any | null;
  improvementResultSuccess: string | null;
  improvementResultError: string | null;
}
// interface ImprovementResult {
//   ImprovementResultLoading: boolean;
//   ImprovementResult: any | null;
//   ImprovementresultSuccess: string | null;
//   ImprovementResultError: string | null;
// }
const initialState: AssessmentResult = {
  resultLoading: false,
  result: null,
  resultSuccess: null,
  resultError: null,
  improvementResultLoading: false,
  improvementResult: null,
  improvementResultSuccess: null,
  improvementResultError: null,
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

export const ImprovementAssessmentResult = createAsyncThunk<any, any>(
  "ImprovementResult/ImprovementAssessmentResult",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/getImprovementResult?userId=${userId}`
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
    builder.addCase(ImprovementAssessmentResult.pending, (state) => {
      state.improvementResultLoading = true;
      state.improvementResultError = null;
      state.improvementResultSuccess = null;
    }),
      builder.addCase(
        ImprovementAssessmentResult.fulfilled,
        (state, action) => {
          state.improvementResultLoading = false;
          state.improvementResult = action.payload;

          state.improvementResultSuccess =
            action.payload.message || "Data fetched Successfully!";
        }
      ),
      builder.addCase(
        ImprovementAssessmentResult.rejected,
        (state, action: any) => {
          state.improvementResultLoading = false;
          state.improvementResult = null;
          state.improvementResultError =
            action.payload.message || "Failed to fetched Successfully!";
          state.improvementResultSuccess = null;
        }
      );
  },
});

export default assessmnentResultSlice.reducer;
