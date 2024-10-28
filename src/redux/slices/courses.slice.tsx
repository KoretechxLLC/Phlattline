import axiosInstance from '@/app/utils/privateAxios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CoursesState {
  loading: boolean;
  error: string | null;
  courses: any[];
  success: string | null;
  videoProgressLoading: boolean;
  videoProgressError: string | null;
  videoProgressSuccess: string | null;
  videoProgress: any[]; // Assuming you want to store video progress
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
  videoProgress: [], // Initialize video progress as an empty array
};

// Thunk for fetching courses
export const fetchcourses = createAsyncThunk<any, void>(
  'courses/fetchcourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('api/courses');
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch courses';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for fetching video progress
export const fetchvideoprogress = createAsyncThunk<any, VideoProgressParams>(
  'courses/fetchvideoprogress',
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/videoprogress?course_id=${courseId}&user_id=${userId}`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch video progress';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateVideoProgress = createAsyncThunk(
  'courses/updateVideoProgress',
  async (
    progressData: { user_id: number; video_id: number; progressDuration: number; totalDuration: number, course_id: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put('/api/videoprogress', progressData);
      return response.data; // Ensure this matches your API response structure
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to update video progress';
      return rejectWithValue(errorMessage);
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
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

      // Update Video Progress
      .addCase(updateVideoProgress.pending, (state) => {
        state.videoProgressLoading = true;
        state.videoProgressError = null;
        state.videoProgressSuccess = null;
      })
      .addCase(updateVideoProgress.fulfilled, (state, action) => {
        state.videoProgressLoading = false;
        state.videoProgressSuccess = 'Video progress updated successfully!';

        const {
          user_id = null,
          video_id = null,
          progressDuration = null,
          totalDuration = null,
          completed = null,
        } = action.payload.data || {}; // Use optional chaining

        if (user_id === null || video_id === null || progressDuration === null || totalDuration === null) {
          console.error('Incomplete video progress data:', action.payload.data);
          state.videoProgressError = 'Failed to update video progress due to incomplete data.';
          return;
        }

        const progressEntry = { user_id, video_id, progressDuration, totalDuration, completed };

        const existingProgressIndex = state.videoProgress.findIndex(
          (progress) => progress.video_id === video_id && progress.user_id === user_id
        );
        console.error('completed video progress data:', action.payload.data);
        if (existingProgressIndex > -1) {
          // Update existing progress
          state.videoProgress[existingProgressIndex] = progressEntry;
        } else {
          // Add new progress entryd
          state.videoProgress.push(progressEntry);
        }
      })
      .addCase(updateVideoProgress.rejected, (state, action) => {
        state.videoProgressLoading = false;
        state.videoProgressError = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError, resetVideoProgressStatus } = coursesSlice.actions;

export default coursesSlice.reducer;
