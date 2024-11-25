import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/privateAxios";

interface EmployeeMyAssessmentState {
    loading: boolean;
    error: string | null;
    getemployeeaseesments: any[]; // Adjust type based on the API response structure
    success: string | null;
}

const initialState: EmployeeMyAssessmentState = {
    loading: false,
    error: null,
    success: null,
    getemployeeaseesments: [],
};

// Thunk for fetching Employee Assessments
export const fetchEmployeeAssessments = createAsyncThunk<
    any[],
    { employee_id: number },
    { rejectValue: string }>
    ("employeemyassessment/fetchEmployeeAssessments",
        async ({ employee_id }, { rejectWithValue }) => {
            try {
                const response = await axiosInstance.get(
                    `/api/organization/assignAssessment/?employee_id=${employee_id}`
                );
                return response.data.data; // Assuming the API returns this structure
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.error ||
                    error.message ||
                    "Failed to fetch employee assessments";
                return rejectWithValue(errorMessage);
            }
        }
    );

// Employee My Assessment slice
const employeemyassessmentSlice = createSlice({
    name: "employeemyassessment",
    initialState,
    reducers: {
        // Optional: Add custom reducers to clear state
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Pending state
            .addCase(fetchEmployeeAssessments.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            // Fulfilled state
            .addCase(fetchEmployeeAssessments.fulfilled, (state, action) => {
                state.loading = false;
                state.getemployeeaseesments = action.payload;
                state.success = "Employee assessments fetched successfully!";
            })
            // Rejected state
            .addCase(fetchEmployeeAssessments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred.";
            });
    },
});

export const { clearError, clearSuccess } = employeemyassessmentSlice.actions;

export default employeemyassessmentSlice.reducer;
