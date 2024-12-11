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
  coursesSuccess: any | null;
  coursesCount: any | null;
  coursesCountLoading: boolean | any;
  coursesCountSuccess: string | any;
  coursesCountError: string | any;
  videoProgressLoading: boolean;
  videoProgressError: string | null;
  videoProgressSuccess: string | null;
  videoProgress: any; // Assuming you want to store video progress
  usercourses: any;
  responses: any;
  count: number;
  coursesAssign: any;
  recommendedCourses: any | null;
  purchaseCourse: any | null;
  purchaseCourseLoader: boolean | null;
  purchaseCourseError: any | null;
  purchaseCourseSuccess: any | null;
  recomendedSuccess: any;
  courseAssessmentSuccess: any;
  fetchSingleCourse: any;
  fetchSingleCourseLoading: boolean;
  fetchSingleCourseError: any;
  fetchSingleCourseSuccess: any;
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
  count: 0,
  coursesSuccess: false,
  coursesCount: null,
  coursesCountLoading: false,
  coursesCountSuccess: null,
  coursesCountError: null,
  videoProgressLoading: false,
  videoProgressError: null,
  videoProgressSuccess: null,
  recommendedCourses: [],
  recomendedSuccess: null,
  videoProgress: [],
  coursesAssign: [],
  usercourses: [],
  responses: null,
  purchaseCourse: null,
  purchaseCourseLoader: false,
  purchaseCourseError: null,
  purchaseCourseSuccess: null,
  courseAssessmentSuccess: null,
  fetchSingleCourse: null,
  fetchSingleCourseLoading: false,
  fetchSingleCourseError: null,
  fetchSingleCourseSuccess: null,
};

// Thunk to fetch the course count
export const fetchcoursesCount = createAsyncThunk<
  number,
  { categoryId?: number }
>("courses/fetchcoursesCount", async ({ categoryId }, thunkAPI) => {
  try {
    // Add query parameters if categoryId is provided
    const queryParams = categoryId
      ? `?categoryId=${categoryId}&count=true`
      : "?count=true";
    const response = await axiosInstance.get(`/api/courses${queryParams}`);
    return response?.data?.totalCourses;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Failed to fetch courses count";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Thunk for fetching courses
export const fetchcourses = createAsyncThunk<any, any>(
  "courses/fetchcourses",
  async (filter, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/courses?page=${filter.page}&size=${filter.size}`
      );

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

// Add a new thunk for fetching recommended courses
export const getRecommendedCourses = createAsyncThunk<any, { userId: number }>(
  "courses/getRecommendedCourses",
  async ({ userId }, { rejectWithValue }) => {
    try {
      // Assuming you have an endpoint for recommended courses
      const response = await axiosInstance.get(
        `/api/getRecommendedCourses?userId=${userId}`
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch recommended courses";
      return rejectWithValue(errorMessage);
    }
  }
);


export const getCourseById = createAsyncThunk<any, { courseId: number }>(
  "courses/getCourseById",
  async ({ courseId }, { rejectWithValue }) => {
    try {
      // Assuming you have an endpoint for recommended courses
      const response = await axiosInstance.get(`/api/courses?id=${courseId}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch recommended courses";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchvideoprogress = createAsyncThunk<any, VideoProgressParams>(
  "courses/fetchvideoprogress",
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/videoprogress?course_id=${courseId}&user_id=${userId}`
      ); // Fixed query string
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

// Thunk for fetching user-specific assigned courses
export const fetchCoursesAssign = createAsyncThunk<
  any,
  { employee_id?: number; organization_id?: number },
  { rejectValue: string }
>(
  "courses/fetchCoursesAssign",
  async ({ employee_id, organization_id }, { rejectWithValue }) => {
    try {
      // Construct query parameters based on provided IDs
      const params = new URLSearchParams();
      if (employee_id) params.append("employee_id", employee_id.toString());
      if (organization_id)
        params.append("organization_id", organization_id.toString());

      const response = await axiosInstance.get(
        `/api/organization/AssignCourse?${params.toString()}`
      );
      return response.data.data; // Adjust according to the API response structure
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch assigned courses";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for fetching user-specific courses
export const fetchusercourses = createAsyncThunk<any, any>(
  "courses/fetchusercourses",
  async ({ userId, filter }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/usercourses?userId=${userId}&page=${filter?.page ?? 0}&size=${
          filter?.size ?? 0
        }`
      );
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
        "/api/coursesassessmentresponse",
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
      state.courseAssessmentSuccess = null;
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
      state.purchaseCourseSuccess = null;
    },
    setPurchaseCourseError(state) {
      state.purchaseCourseError = null;
    },
    setCoursesSuccess(state) {
      state.coursesSuccess = false;
    },
    setCoursesCount(state) {
      state.coursesCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchcourses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.coursesSuccess = false;
        state.success = null;
      })
      .addCase(fetchcourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.coursesSuccess = true;
        state.success = "Course Successfully fetched";
      })
      .addCase(fetchcourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.coursesSuccess = false;
      })

      //Assigned Courses Cases


      .addCase(fetchCoursesAssign.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchCoursesAssign.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesAssign = action.payload; // Update state with fetched data
        state.success = "Assign Courses Successfully fetched";
      })
      .addCase(fetchCoursesAssign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Update state with error message
      })

      //Submit Courses Responsegit
      .addCase(coursesAssessmentResponses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.courseAssessmentSuccess = null;
      })
      .addCase(coursesAssessmentResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = action.payload.data;
        state.courseAssessmentSuccess = action.payload.message; // Set success message
        // window.location.href = "/Portal/Courses";
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

      // Fetch Recommended Courses
      .addCase(getRecommendedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.recomendedSuccess = null;
      })
      .addCase(getRecommendedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedCourses = action.payload; // Assuming you want to store them here
        state.recomendedSuccess = "Recommended courses successfully fetched";
      })
      .addCase(getRecommendedCourses.rejected, (state, action) => {
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
      })

      //Fetch Courses Count
      .addCase(fetchcoursesCount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.coursesCountSuccess = false;
      })
      // Handle fulfilled state
      .addCase(fetchcoursesCount.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload;
        state.coursesCountSuccess = true;
      })
      // Handle rejected state
      .addCase(fetchcoursesCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCourseById.pending, (state) => {
        state.fetchSingleCourseLoading = true;
        state.fetchSingleCourseError = null;
        state.fetchSingleCourse = null;
      })
      // Handle fulfilled state
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.fetchSingleCourse = action.payload;
        state.fetchSingleCourseLoading = false;
        state.fetchSingleCourseSuccess = action.payload.message;
      })
      // Handle rejected state
      .addCase(getCourseById.rejected, (state, action) => {
        state.fetchSingleCourseLoading = false;
        state.fetchSingleCourseError = action.payload ?? "unknown Error";
      });
  },
});

export const {
  resetSuccess,
  resetError,
  resetVideoProgressStatus,
  setPurchaseCourseSuccess,
  setPurchaseCourseError,
} = coursesSlice.actions;

export default coursesSlice.reducer;
