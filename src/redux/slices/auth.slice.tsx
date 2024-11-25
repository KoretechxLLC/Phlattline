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
  updateUserData: any | null;
  organizationIsLoading: boolean;
  organizationError: any | null;
  organizationSuccess: string | null;
  updateOrganizationIsLoading: boolean;
  updateOrganizationError: any | null;
  updateOrganizationSuccess: string | null;
  updatedOrganization: any;
  deleteProfileIsLoading: boolean;
  deleteProfileError: any | null;
  deleteProfileSuccess: string | null;
  deleteUserProfileSuccess: string | null;
  deleteUserProfileError: any | null;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  userData: null,
  accessToken: null,
  refreshToken: null,
  success: null,
  updateUserData: null,
  organizationIsLoading: false,
  organizationError: null,
  organizationSuccess: null,
  updateOrganizationIsLoading: false,
  updateOrganizationError: null,
  updateOrganizationSuccess: null,
  updatedOrganization: null,
  deleteProfileIsLoading: false,
  deleteProfileError: null,
  deleteProfileSuccess: null,
  deleteUserProfileError: null,
  deleteUserProfileSuccess: null,
};

export const login = createAsyncThunk<any, any>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
        provider: "app",
      });

      const { accessToken } = response.data;

      // Set the access token in a cookie
      if (typeof window !== "undefined") {
        document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/api/auth/logout?id=${userId}`
      );

      // Perform token removal and clear local storage, cookies
      await localforage.removeItem("access_token");
      await localforage.removeItem("refresh_Token");

      if (typeof window !== "undefined") {
        document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        document.cookie = `refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      }

      return { message: response.data?.message || "Logout successful" };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

export const Register = createAsyncThunk<any, FormData>(
  "auth/Register",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/register`, formData, {
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

//Employee Register Slice
export const Employeeregister = createAsyncThunk<any, FormData>(
  "auth/Employeeregister",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/auth/employeeregister`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);
export const organizationRegister = createAsyncThunk<any, FormData>(
  "auth/organizationRegister",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/auth/organization_register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

export const updateOrganization = createAsyncThunk<any, FormData>(
  "auth/updateOrganization",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.put(
        `/api/auth/organization_register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
      const response = await axiosInstance.put(`/api/user`, formData, {
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

export const fetchPurchaseCourses = createAsyncThunk<any, any>(
  "auth/fetchPurchaseCourses",
  async (userId: any, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/purchaseCourse/?userId=${userId}`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

export const fetchPurchaseAssessment = createAsyncThunk<any, any>(
  "auth/fetchPurchaseAssessment",
  async (userId: any, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/purchaseAssessments/?userId=${userId}`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

export const DeleteUserProfile = createAsyncThunk<any, any>(
  "auth/DeleteUserProfile",
  async (userId: any, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/api/auth/remove_image?id=${userId}`
      );
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
    setOrganizationSuccess: (state) => {
      state.organizationSuccess = null;
    },
    setOrganizationError: (state) => {
      state.organizationError = null;
    },
    setUpdateOrganizationSuccess: (state) => {
      state.updateOrganizationSuccess = null;
    },
    setUpdateOrganizationError: (state) => {
      state.updateOrganizationError = null;
    },

    setDeleteUserProfileSuccess: (state) => {
      state.deleteUserProfileSuccess = null;
    },
    setDeleteUserProfileError: (state) => {
      state.deleteUserProfileError = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state) => {
      state.error = null;
    },

    setUpdateUserData: (state, action) => {
    
      state.userData = action.payload;
      // if (typeof window !== "undefined") {
      //   window.location.href = "/Portal/Assessments";
      // }
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

        window.location.href = "/Portal/Dashboard";
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
      .addCase(organizationRegister.pending, (state) => {
        state.organizationIsLoading = true;
        state.organizationError = null;
      })
      .addCase(organizationRegister.fulfilled, (state, action) => {
        state.organizationIsLoading = false;
        state.organizationSuccess = action.payload.message;
      })
      .addCase(organizationRegister.rejected, (state, action) => {
        state.organizationIsLoading = false;
        state.organizationError = action.payload ?? "Unknown error";
      })

      .addCase(updateOrganization.pending, (state) => {
        state.updateOrganizationIsLoading = true;
        state.updateOrganizationError = null;
        state.updateOrganizationSuccess = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.updateOrganizationIsLoading = false;
        state.updatedOrganization = action.payload.data;
        state.updateOrganizationSuccess = "Organization Update Successfully";
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.updateOrganizationIsLoading = false;
        state.updateOrganizationError = action.payload ?? "Unknown error";
      })

      //Employee Register
      .addCase(Employeeregister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Employeeregister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(Employeeregister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
      //---//

      //Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.success = "Logout successful";
        if (typeof window !== "undefined" && window)
          window.location.href = "/Login";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Logout failed";
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
      })
      .addCase(fetchPurchaseCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        // Create `purchasedCourses` if it doesn't exist
        if (!state.userData) {
          state.userData = {}; // Ensure userData exists
        }
        state.userData.user_courses = action.payload.data;
        state.success = "Successfully profile updated";
      })
      .addCase(fetchPurchaseCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(fetchPurchaseAssessment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseAssessment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Create `purchasedCourses` if it doesn't exist
        if (!state.userData) {
          state.userData = {}; // Ensure userData exists
        }
        state.userData.purchased_assessments = action.payload.data;
        state.success = "Successfully profile updated";
      })
      .addCase(fetchPurchaseAssessment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(DeleteUserProfile.pending, (state) => {
        state.deleteProfileIsLoading = true;
        state.deleteProfileError = null;
      })
      .addCase(DeleteUserProfile.fulfilled, (state, action) => {
        state.deleteProfileIsLoading = false;
        state.userData = action.payload.data;
        state.deleteProfileSuccess = "Successfully profile deleted";
      })
      .addCase(DeleteUserProfile.rejected, (state, action) => {
        state.deleteProfileIsLoading = false;
        state.deleteProfileError = action.payload ?? "Unknown error";
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
  setOrganizationSuccess,
  setOrganizationError,
  setUpdateOrganizationSuccess,
  setUpdateOrganizationError,
  setDeleteUserProfileSuccess,
  setDeleteUserProfileError,
  setUpdateUserData,
} = authSlice.actions;
export default authSlice.reducer;