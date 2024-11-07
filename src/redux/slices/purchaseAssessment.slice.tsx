import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PurchaseAssessmentState {
  purchaseAssessment: any | null;
  purchaseAssessmentLoader: boolean | null;
  purchaseAssessmentError: any | null;
  purchaseAssessmentSuccess: any | null;
  purchasedAssessmentData: any | null;
  purchasedAssessmentDataLoader: boolean | null;
  purchasedAssessmentDataError: any | null;
  purchasedAssessmentDataSuccess: any | null;
}

const initialState: PurchaseAssessmentState = {
  purchaseAssessment: null,
  purchaseAssessmentLoader: false,
  purchaseAssessmentError: null,
  purchaseAssessmentSuccess: null,
  purchasedAssessmentData: null,
  purchasedAssessmentDataLoader: false,
  purchasedAssessmentDataError: null,
  purchasedAssessmentDataSuccess: null,
};

export const purchasingAssessment = createAsyncThunk<any, any>(
  "purchaseAssessment/purchasingAssessment",
  async ({ user_Id, individual_assessments_id }, { rejectWithValue }) => {
    try {
      const data = { user_Id, individual_assessments_id };
      const response = await axiosInstance.post(
        "/api/purchaseAssessments",
        data
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to purchase this course";

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchedPurchaseAssessment = createAsyncThunk<any, any>(
  "purchaseAssessment/purchasingAssessment",
  async ({ user_Id }, { rejectWithValue }) => {
    try {
      const data: any = { user_Id };
      const response = await axiosInstance.get(
        "/api/purchaseAssessments",
        data
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to purchase this course";

      return rejectWithValue(errorMessage);
    }
  }
);

const purchasingAssessmentSlice = createSlice({
  name: "purchaseAssessment",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.purchaseAssessmentSuccess = null;
    },
    resetError(state) {
      state.purchaseAssessmentError = null;
    },

    setPurchaseAssessment(state) {
      state.purchaseAssessment = null;
    },
    setPurchaseAssessmentSuccess(state) {
      state.purchaseAssessmentSuccess = null;
    },
    setPurchaseAssessmentError(state) {
      state.purchaseAssessmentError = null;
    },
    setPurchasedAssessmentData(state) {
      state.purchasedAssessmentData = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(purchasingAssessment.pending, (state) => {
        state.purchaseAssessmentLoader = true;

        state.purchaseAssessmentError = null;
      })
      .addCase(purchasingAssessment.fulfilled, (state, action) => {
        state.purchaseAssessmentLoader = false;
        state.purchaseAssessmentSuccess =
          action.payload.message ||
          "You have Purchased this Assessment Successfully";
        state.purchaseAssessment = action.payload.data;
        state.purchaseAssessmentError = null;
      })
      .addCase(purchasingAssessment.rejected, (state, action) => {
        state.purchaseAssessmentLoader = false;
        state.purchaseAssessmentError = action.payload as string;
      });
  },
});

export const {
  resetSuccess,
  resetError,
  setPurchaseAssessment,
  setPurchaseAssessmentSuccess,
  setPurchaseAssessmentError,
} = purchasingAssessmentSlice.actions;

export default purchasingAssessmentSlice.reducer;
