import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AssessmentState {
  loading: boolean;
  error: string | null;
  assessments: any[]; // Replace with specific type if you have it
  success: any | null;
  submitAssessment: any;
  assessmentsSuccess: any | null;
  assessmentsCount: any | null;
  assessmentsCountLoading: boolean | any;
  assessmentsCountSuccess: string | any;
  assessmentsCountError: string | any;

  recommendedAssessment: string | any;
  recommendedAssessmentLoading: boolean | any;
  recommendedAssessmentSuccess: string | any;
  recommendedAssessmentError: string | any;

  singleAssessment: string | any;
  singleAssessmentLoading: boolean | any;
  singleAssessmentSuccess: string | any;
  singleAssessmentError: string | any;
}

const initialState: AssessmentState = {
  loading: false,
  error: null,
  success: "",
  assessments: [],
  assessmentsSuccess: false,
  assessmentsCount: null,
  assessmentsCountLoading: false,
  assessmentsCountSuccess: null,
  assessmentsCountError: null,
  recommendedAssessment: null,
  recommendedAssessmentLoading: false,
  recommendedAssessmentSuccess: null,
  recommendedAssessmentError: null,
  submitAssessment: null,
  singleAssessment: null,
  singleAssessmentLoading: false,
  singleAssessmentSuccess: null,
  singleAssessmentError: null,
};

export const fetchassessmentsCount = createAsyncThunk<any, any>(
  "assessment/fetchassessmentsCount",
  async ({ filter = {} }, thunkAPI) => {
    try {
      const queryParams = filter.categoryId
        ? `?categoryId=${filter.categoryId}`
        : "";
      const response = await axiosInstance.get(
        `/api/assessmentsCount${queryParams}`
      );
      return response?.data?.count;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to fetch assessments Count";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const fetchAssessments = createAsyncThunk<any, any>(
  "assessment/fetchAssessments",
  async ({ filter, type }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/initialassessmentform?page=${filter.page}&size=${filter.size}${
          filter.categoryId ? `&categoryId=${filter.categoryId}` : ""
        }${type ? `&type=${type}` : ""}` // Added type query parameter
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchSingleAssessments = createAsyncThunk<any, any>(
  "assessment/fetchSingleAssessments",
  async ({ filter }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/paidAssessment?userId=${filter.userId}&assessmentId=${filter.assessmentId}&user_type_id=${filter.user_type_id}` // Added type query parameter
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchRecommendedAssessments = createAsyncThunk<any, any>(
  "assessment/fetchRecommendedAssessments",
  async ({ filter }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/initialassessmentform?page=${filter.page}&size=${filter.size}${
          filter.categoryId ? `&categoryId=${filter.categoryId}` : ""
        }`
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Thunk for submitting assessment responses
export const submitAssessmentResponses = createAsyncThunk<
  any,
  { userId: string; assessmentId: any[]; responses: any[]; user_type_id:any}
>(
  "assessment/submitAssessmentResponses",
  async ({ userId, assessmentId, responses, user_type_id }, { rejectWithValue }) => {
    try {
    const  data = user_type_id ? {  userId, assessmentId, responses, user_type_id} :
    {  userId, assessmentId, responses}
      const response = await axiosInstance.post(
        "/api/initialassessmentformresponse",
        data
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
    setAssessmentsCount(state) {
      state.assessmentsCount = 0;
    },
    setRecommendedAssessment(state) {
      state.recommendedAssessment = null;
    },
    setSingleAssessment(state) {
      state.singleAssessment = null;
    },
    setSingleAssessmentSuccess(state) {
      state.singleAssessmentSuccess = null;
    },
    setSingleAssessmentError(state) {
      state.singleAssessmentError = null;
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
        state.submitAssessment = null;
      })
      .addCase(submitAssessmentResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.submitAssessment = action.payload;
        state.success = "Assessment submitted successfully!";
        state.error = null;
      })
      .addCase(submitAssessmentResponses.rejected, (state, action) => {
        state.loading = false;
        state.submitAssessment = null;
        state.error = action.payload as string;
        state.success = null;
      })
      .addCase(fetchassessmentsCount.pending, (state) => {
        state.assessmentsCountLoading = true;
        state.assessmentsCountError = null;
        state.assessmentsCountSuccess = null;
      })
      .addCase(fetchassessmentsCount.fulfilled, (state, action) => {
        state.assessmentsCountLoading = false;
        state.assessmentsCountSuccess =
          action?.payload?.message || "Assessment Counts fetched successfully!";

        state.assessmentsCount = action.payload;

        state.error = null;
      })
      .addCase(fetchRecommendedAssessments.pending, (state) => {
        state.recommendedAssessmentLoading = true;
        state.recommendedAssessment = null;
        state.recommendedAssessmentError = false;
      })
      .addCase(fetchRecommendedAssessments.fulfilled, (state, action) => {
        state.recommendedAssessmentLoading = false;
        state.recommendedAssessment = action.payload;
        state.recommendedAssessmentError = null;
        state.recommendedAssessmentSuccess =
          action.payload.message ||
          "Recommended Assessments Fetched Successfully";
      })
      .addCase(fetchRecommendedAssessments.rejected, (state, action) => {
        state.recommendedAssessmentLoading = false;
        state.recommendedAssessment = null;
        state.recommendedAssessmentError = action.payload;
      })

      .addCase(fetchSingleAssessments.pending, (state) => {
        state.singleAssessmentLoading = true;
        state.singleAssessment = null;
        state.singleAssessmentError = null;
      })
      .addCase(fetchSingleAssessments.fulfilled, (state, action) => {
        state.singleAssessmentLoading = false;
        state.singleAssessment = action.payload;
        state.singleAssessmentError = null;
        state.singleAssessmentSuccess =
          action.payload.message || "Assessment fetched Fetched Successfully";
      })
      .addCase(fetchSingleAssessments.rejected, (state, action) => {
        state.singleAssessmentLoading = false;
        state.singleAssessment = null;
        state.singleAssessmentError = action.payload;
      });
  },
});

export const { resetSuccess, resetError } = assessmentSlice.actions;

export default assessmentSlice.reducer;
