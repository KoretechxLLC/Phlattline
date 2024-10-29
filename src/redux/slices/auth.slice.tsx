import axiosInstance from "@/app/utils/privateAxios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import localforage from "localforage";

interface AuthState {
  isLoading: boolean;
  error: any | null;
  userData: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  success: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  userData: null,
  accessToken: null,
  refreshToken: null,
  success: null,
};

export const login = createAsyncThunk<any, any>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`api/auth/login`, {
        email: email,
        password: password,
        provider: "app",
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Internal Server Error"
      );
    }
  }
);

export const Register = createAsyncThunk<any, FormData>(
  "auth/Register",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post(`api/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

export const UpdateUser = createAsyncThunk<any, any>(
  "auth/UpdateUser",
  async (formData: any, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`api/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{
        data: any;
        accessToken: string;
        refreshToken: string;
        message: string;
      }>
    ) => {
      state.isLoading = false;
      state.userData = action.payload.data;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.success = action.payload.message;
      localforage.setItem("access_token", action.payload.accessToken);
      localforage.setItem("refresh_Token", action.payload.refreshToken);
    },
    setLogOut: (state) => {
      state.userData = null;
      state.accessToken = null;
      state.refreshToken = null;
      localforage.removeItem("access_token");
      localforage.removeItem("refresh_Token");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    },
    setSuccess: (state) => {
      state.success = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state) => {
      state.error = null;
    },
    setAssessmentUpdate: (state) => {
      state.userData.assessment_status = true;
      if (typeof window !== "undefined") {
        window.location.href = "/Portal/Dashboard";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.success = action.payload.message;
        localforage.setItem("access_token", action.payload.accessToken);
        localforage.setItem("refresh_Token", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(Register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(Register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(UpdateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
        state.success = "Successfully profile updated";
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const {
  setLogin,
  setLogOut,
  setSuccess,
  setLoading,
  setError,
  setAssessmentUpdate,
} = authSlice.actions;
export default authSlice.reducer;
