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

export const fetchedPurchaseAssessment = createAsyncThunk<
  any, // Replace `any` with a proper type for the response data
  { user_Id: number }, // Replace `number` with the expected type if different
  { rejectValue: string }
>(
  "purchaseAssessment/fetchedPurchaseAssessment",
  async ({ user_Id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/purchaseAssessments", {
        params: { userId: user_Id }, // Sending userId as a query parameter
      });

      // Ensure response is properly returned
      if (response.status !== 200 || !response.data) {
        throw new Error("Invalid response from the server");
      }

      return response.data; // Data fetched successfully
    } catch (error: any) {
      console.error("Error fetching purchase assessments:", error);

      const errorMessage =
        error?.response?.data?.message || "Failed to fetch purchase assessments";
      return rejectWithValue(errorMessage); // Reject with a clear error message
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
      // Purchasing Assessment Cases
      .addCase(purchasingAssessment.pending, (state) => {
        state.purchaseAssessmentLoader = true;
        state.purchaseAssessmentError = null;
      })
      .addCase(purchasingAssessment.fulfilled, (state, action) => {
        state.purchaseAssessmentLoader = false;
        state.purchaseAssessmentSuccess =
          action.payload.message || "You have Purchased this Assessment Successfully";
        state.purchaseAssessment = action.payload.data;
        state.purchaseAssessmentError = null;
      })
      .addCase(purchasingAssessment.rejected, (state, action) => {
        state.purchaseAssessmentLoader = false;
        state.purchaseAssessmentError = action.payload as string;
      })

      // Fetched Purchase Assessment Cases
      .addCase(fetchedPurchaseAssessment.pending, (state) => {
        state.purchasedAssessmentDataLoader = true;
        state.purchasedAssessmentDataError = null;
      })
      .addCase(fetchedPurchaseAssessment.fulfilled, (state, action) => {
        state.purchasedAssessmentDataLoader = false;
        state.purchasedAssessmentDataSuccess =
          action.payload.message || "Fetched purchase assessment data successfully.";
        state.purchasedAssessmentData = action.payload.data;
        state.purchasedAssessmentDataError = null;
      })
      .addCase(fetchedPurchaseAssessment.rejected, (state, action) => {
        state.purchasedAssessmentDataLoader = false;
        state.purchasedAssessmentDataError = action.payload as string;
      });
  },
});

export const {
  resetSuccess,
  resetError,
  setPurchaseAssessment,
  setPurchaseAssessmentSuccess,
  setPurchaseAssessmentError,
  setPurchasedAssessmentData,
} = purchasingAssessmentSlice.actions;

export default purchasingAssessmentSlice.reducer;
