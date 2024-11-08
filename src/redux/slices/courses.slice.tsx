import axiosInstance from "@/app/utils/privateAxios";
import { identity } from "@fullcalendar/core/internal";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import { any } from "zod";

interface CoursesState {
  loading: boolean;
  error: string | null;
  courses: any[];
  success: string | null;
  videoProgressLoading: boolean;
  videoProgressError: string | null;
  videoProgressSuccess: string | null;
  videoProgress: any; // Assuming you want to store video progress
  usercourses : any;
  responses: any;
  purchaseCourse: any | null;
  purchaseCourseLoader: boolean | null;
  purchaseCourseError: any | null;
  purchaseCourseSuccess: any | null;
}

interface VideoProgressParams {
  courseId: number; // Change here to match the expected property names
  userId: number;
}

const initialState: CoursesState = {
  loading: false,
  error: null,
  success: null,
  courses: [],
  videoProgressLoading: false,
  videoProgressError: null,
  videoProgressSuccess: null,
  videoProgress: [],
  usercourses: [],
  responses: null,
  purchaseCourse: null,
  purchaseCourseLoader: false,
  purchaseCourseError: null,
  purchaseCourseSuccess: null,
};

// Thunk for fetching courses
export const fetchcourses = createAsyncThunk<any, void>(
  "courses/fetchcourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/courses");
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch courses";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for fetching video progress
export const fetchvideoprogress = createAsyncThunk<any, VideoProgressParams>(
  "courses/fetchvideoprogress",
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/videoprogress?course_id=${courseId}&user_id=${userId}`
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch video progress";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for fetching user-specific courses
export const fetchusercourses = createAsyncThunk<any, number>(
  "courses/fetchusercourses",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/usercourses?userId=${userId}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch user courses";
      return rejectWithValue(errorMessage);
    }
  }
);


export const coursesAssessmentResponses = createAsyncThunk<
  any,
  { userId: string; courseId: string; responses: any[] }
>(
  "assessment/submitAssessmentResponses",
  async ({ userId, courseId, responses }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "api/coursesassessmentresponse",
        {
          userId,
          courseId,
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

export const updateVideoProgress = createAsyncThunk(
  "courses/updateVideoProgress",
  async (
    progressData: {
      user_id: number;
      video_id: number;
      progressDuration: number;
      totalDuration: number;
      course_id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        "/api/videoprogress",
        progressData
      );

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to update video progress";
      return rejectWithValue(errorMessage);
    }
  }
);

export const purchasingCourse = createAsyncThunk<any, any>(
  "courses/purchasingCourse",
  async ({ user_Id, course_id }, { rejectWithValue }) => {
    try {
      const data = { user_Id, course_id };
      const response = await axiosInstance.post("/api/purchaseCourse", data);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to purchase this course";

      return rejectWithValue(errorMessage);
    }
  }
);
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = null;
    },
    resetError(state) {
      state.error = null;
    },
    resetVideoProgressStatus(state) {
      state.videoProgressSuccess = null;
      state.videoProgressError = null;
    },
    setPurchaseCourse(state) {
      state.purchaseCourse = null;
    },
    setPurchaseCourseSuccess(state) {
      state.purchaseCourseSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchcourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchcourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //Submit Courses Response
      .addCase(coursesAssessmentResponses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(coursesAssessmentResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = action.payload.data;
        state.success = action.payload.message; // Set success message
      })
      .addCase(coursesAssessmentResponses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Video Progress
      .addCase(fetchvideoprogress.pending, (state) => {
        state.videoProgressLoading = true;
        state.videoProgressError = null;
      })
      .addCase(fetchvideoprogress.fulfilled, (state, action) => {
        state.videoProgressLoading = false;
        state.videoProgress = action.payload;
      })
      .addCase(fetchvideoprogress.rejected, (state, action) => {
        state.videoProgressLoading = false;
        state.videoProgressError = action.payload as string;
      })

      // Fetch User Courses
      .addCase(fetchusercourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchusercourses.fulfilled, (state, action) => {
        state.loading = false;
        state.usercourses = action.payload;
      })
      .addCase(fetchusercourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Video Progress
      .addCase(updateVideoProgress.pending, (state) => {
        state.videoProgressLoading = true;
        state.videoProgressError = null;
        state.videoProgressSuccess = null;
      })
      .addCase(updateVideoProgress.fulfilled, (state, action) => {
        state.videoProgressLoading = false;
        state.videoProgressSuccess = "Video progress updated successfully!";

        const {
          user_id = null,
          video_id = null,
          progressDuration = null,
          totalDuration = null,
          completed = null,
        } = action.payload.data || {}; // Use optional chaining

        if (
          video_id === null ||
          progressDuration === null ||
          totalDuration === null
        ) {
          console.error("Incomplete video progress data:", action.payload.data);
          state.videoProgressError =
            "Failed to update video progress due to incomplete data.";
          return;
        }

        // const progressEntry = { user_id, video_id, progressDuration, totalDuration, completed };

        // const existingProgressIndex = state.videoProgress.findIndex(
        //   (progress) => progress.video_id == video_id
        // );

        if (state.videoProgress && state.videoProgress?.length > 0) {
          let video = state?.videoProgress?.find(
            (video: any) => video?.video_id == video_id
          );

          if (video) {
            state.videoProgress = state.videoProgress?.map((e: any) => {
              if (e?.video_id == video_id) {
                return {
                  ...e,
                  totalDuration: totalDuration,
                  progressDuration: progressDuration,
                  completed: completed,
                };
              } else {
                return e;
              }
            });
          } else {
            state.videoProgress = [...state.videoProgress, action.payload.data];
          }
        } else {
          state.videoProgress = [...state.videoProgress, action.payload.data];
        }
      })
      .addCase(updateVideoProgress.rejected, (state, action) => {
        state.videoProgressLoading = false;
        state.videoProgressError = action.payload as string;
      })
      .addCase(purchasingCourse.pending, (state) => {
        state.purchaseCourseLoader = true;

        state.purchaseCourseError = null;
      })
      .addCase(purchasingCourse.fulfilled, (state, action) => {
        state.purchaseCourseLoader = false;
        state.purchaseCourseSuccess =
          action.payload.message ||
          "You have Purchased this Course Successfully";
        state.purchaseCourse = action.payload.data;
        state.purchaseCourseError = null;
      })
      .addCase(purchasingCourse.rejected, (state, action) => {
        state.purchaseCourseLoader = false;
        state.purchaseCourseError = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError, resetVideoProgressStatus } =
  coursesSlice.actions;

export default coursesSlice.reducer;
