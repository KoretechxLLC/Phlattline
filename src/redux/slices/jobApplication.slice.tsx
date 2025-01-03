import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface JobApplicationsState {
  jobApplications: any[] | null;
  jobApplicationsLoader: boolean | null;
  jobApplicationsError: string | null;
  jobApplicationsSuccess: string | null;

  submittedApplication: any | null;
  submittedApplicationLoader: boolean | null;
  submittedApplicationError: string | null;
  submittedApplicationSuccess: string | null;

  deletedApplicationSuccess: string | null;
  deletedApplicationError: string | null;

  interviewSchedulingLoader: boolean | null;
  interviewSchedulingSuccess: string | null;
  interviewSchedulingError: string | null;

  JobbyOrganization: any[] | null;
  JobbyOrganizationLoader: boolean;
  JobbyOrganizationError: string | null;

}

const initialState: JobApplicationsState = {
  jobApplications: null,
  jobApplicationsLoader: false,
  jobApplicationsError: null,
  jobApplicationsSuccess: null,

  submittedApplication: null,
  submittedApplicationLoader: false,
  submittedApplicationError: null,
  submittedApplicationSuccess: null,

  deletedApplicationSuccess: null,
  deletedApplicationError: null,

  // Initializing the interview scheduling state
  interviewSchedulingLoader: false,
  interviewSchedulingSuccess: null,
  interviewSchedulingError: null,


  JobbyOrganization: null,
  JobbyOrganizationLoader: false,
  JobbyOrganizationError: null,

};


// Fetch All Jobs
export const fetchjoborganization = createAsyncThunk(
  "jobApplications/fetchjoborganization",
  async ({ organizationId }:any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/getAllJobs`, {
        params: { organizationId },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch jobs");
    }
  }
);


// Fetch Job Applications
export const fetchJobApplications = createAsyncThunk<any, { organizationId: number }>(
  "jobApplications/fetchJobApplications",
  async ({ organizationId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/jobApplication", {
        params: { organization_id: organizationId },
      });
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to fetch job applications";
      return rejectWithValue(errorMessage);
    }
  }
);

// Submit Job Application
export const submitJobApplication = createAsyncThunk<any, FormData>(
  "jobApplications/submitJobApplication",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/jobApplication", formData);
      return response.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to submit job application";
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete Job Application
export const deleteJobApplication = createAsyncThunk<any, { applicationId: number }>(
  "jobApplications/deleteJobApplication",
  async ({ applicationId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/api/jobApplication", {
        params: { application_Id: applicationId },
      });
      return applicationId;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to delete job application";
      return rejectWithValue(errorMessage);
    }
  }
);


export const scheduleInterview = createAsyncThunk<any, {
  organization_id: number;
  application_id: number;
  interview_date: string;
  interview_time: string;
  candidate_id: number;
  message: string;
}>(
  "jobApplications/scheduleInterview",
  async (
    { organization_id, application_id, interview_date, interview_time, candidate_id, message },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/api/organization/interviewScheduling", {
        organization_id,
        application_id,
        interview_date,
        interview_time,
        candidate_id,
        message,
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to schedule interview";

      // Handle specific message for "Interview already scheduled"
      if (errorMessage === "Interview already scheduled!") {
        return rejectWithValue("Interview already scheduled!");
      }

      return rejectWithValue(errorMessage);
    }
  }
);



// Slice Definition
const jobApplicationsSlice = createSlice({
  name: "jobApplications",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.jobApplicationsSuccess = null;
      state.submittedApplicationSuccess = null;
      state.deletedApplicationSuccess = null;
    },
    resetError(state) {
      state.jobApplicationsError = null;
      state.submittedApplicationError = null;
      state.deletedApplicationError = null;
    },
    resetApplications(state) {
      state.jobApplications = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Job Applications
    builder
      .addCase(fetchJobApplications.pending, (state) => {
        state.jobApplicationsLoader = true;
        state.jobApplicationsError = null;
      })
      .addCase(fetchJobApplications.fulfilled, (state, action) => {
        state.jobApplicationsLoader = false;
        state.jobApplications = action.payload;
        state.jobApplicationsSuccess = "Job applications fetched successfully!";
      })
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.jobApplicationsLoader = false;
        state.jobApplicationsError = action.payload as string;
      })

      // Submit Job Application
      .addCase(submitJobApplication.pending, (state) => {
        state.submittedApplicationLoader = true;
        state.submittedApplicationError = null;
      })
      .addCase(submitJobApplication.fulfilled, (state, action) => {
        state.submittedApplicationLoader = false;
        state.submittedApplication = action.payload.data;
        state.submittedApplicationSuccess =
          action.payload.message || "Job application submitted successfully!";
      })
      .addCase(submitJobApplication.rejected, (state, action) => {
        state.submittedApplicationLoader = false;
        state.submittedApplicationError = action.payload as string;
      })

      // Delete Job Application
      .addCase(deleteJobApplication.pending, (state) => {
        state.deletedApplicationError = null;
      })
      .addCase(deleteJobApplication.fulfilled, (state, action) => {
        state.deletedApplicationSuccess = "Job application deleted successfully!";
        state.jobApplications = state.jobApplications?.filter(
          (app) => app.id !== action.payload
        ) || []; // Reset to empty array if null
      })
      .addCase(deleteJobApplication.rejected, (state, action) => {
        state.deletedApplicationError = action.payload as string;
      })


      .addCase(scheduleInterview.pending, (state) => {
        state.interviewSchedulingLoader = true;
        state.interviewSchedulingError = null;
      })
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.interviewSchedulingLoader = false;
        state.interviewSchedulingSuccess = "Interview scheduled successfully!";
      })
      .addCase(scheduleInterview.rejected, (state, action) => {
        state.interviewSchedulingLoader = false;
      
        // Check for "Interview already scheduled!" message
        if (action.payload === "Interview already scheduled!") {
          state.interviewSchedulingError = "Interview already scheduled!";
        } else {
          state.interviewSchedulingError = action.payload as string;
        }
      })

      //Jobs By Organizations
      .addCase(fetchjoborganization.pending, (state) => {
        state.JobbyOrganizationLoader = true;
        state.JobbyOrganizationError = null;
      })
      .addCase(fetchjoborganization.fulfilled, (state, action) => {
        state.JobbyOrganizationLoader = false;
        state.JobbyOrganization = action.payload;
      })
      .addCase(fetchjoborganization.rejected, (state, action) => {
        state.JobbyOrganizationLoader = false;
        state.JobbyOrganizationError = action.payload as string;
      });
      
  },
});

export const { resetSuccess, resetError, resetApplications } = jobApplicationsSlice.actions;

export default jobApplicationsSlice.reducer;
