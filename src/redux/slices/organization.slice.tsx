import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { string } from "zod";

interface organizationResponseState {
  responseLoading: boolean;
  responseError: string | null;
  organizationResponse: any[];
  responseSuccess: any | null;
  addDepartmentSuccess: any | null;
  addDepartmentError: any | null;
  employee: any[];
  departments: any[];
  assignCoursesLoading: boolean;
  assignCoursesError: string | null;
  assignCoursesSuccess: string | null;
  leaderFeedback: any;
  leaderFeedbackSuccess: string | null;
  leaderFeedbackError: any | null;
}

const initialState: organizationResponseState = {
  responseLoading: false,
  responseError: null,
  responseSuccess: null,
  organizationResponse: [],
  employee: [],
  assignCoursesLoading: false,
  assignCoursesError: null,
  assignCoursesSuccess: null,
  addDepartmentSuccess: null,
  addDepartmentError: null,
  departments: [],
  leaderFeedback: null,
  leaderFeedbackSuccess: null,
  leaderFeedbackError: null,
};

export const fetchAllEmployee = createAsyncThunk<any, any>(
  "organization/fetchAllEmployee",
  async ({ organizationId }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/auth/employeeregister/?organization_id=${organizationId}`
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

export const assignCourses = createAsyncThunk<any, any>(
  "organization/assignCourses",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `api/organization/AssignCourse`,
        data
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAllDepartment = createAsyncThunk<any, any>(
  "organization/fetchAllDepartment",
  async ({ organizationId }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/organization/manageDepartments/?organization_id=${organizationId}`
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

export const addDepartment = createAsyncThunk<any, any>(
  "organization/addDepartment",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `api/organization/manageDepartments`,
        data
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchEmployeeByDepartment = createAsyncThunk<any, any>(
  "organization/fetchEmployeeByDepartment",
  async ({ departmentId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/auth/employeeregister/?departmentId=${departmentId}`
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

export const addReview = createAsyncThunk<any, any>(
  "organization/addReview",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `api/organization/employee_review`,
        data
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

export const submitFeedback = createAsyncThunk<any, any>(
  "organization/submitFeedback",
  async ({ filter }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/organization/leaderFeedback`,
        filter
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to Submit Feedback";
      return rejectWithValue(errorMessage); // Ensure this line is included
    }
  }
);

export const addEmployeesInDepartment = createAsyncThunk<any, any>(
  "organization/addEmployeesInDepartment",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/organization/employee_department`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeEmployeesInDepartment = createAsyncThunk<any, any>(
  "organization/removeEmployeesInDepartment",
  async (employeeId: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/organization/removeEmployeeFromDepartment",
        {
          employeeId,
        }
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

const organizationSlice = createSlice({
  name: "organizationResponse",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.responseSuccess = false;
      state.assignCoursesSuccess = null;
      state.addDepartmentSuccess = null;
      state.leaderFeedbackSuccess = null;
    },
    resetError(state) {
      state.responseError = null;
      state.assignCoursesError = null;
      state.addDepartmentError = null;
      state.leaderFeedbackError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assessments
      .addCase(fetchAllEmployee.pending, (state) => {
        state.responseLoading = true;
      })
      .addCase(fetchAllEmployee.fulfilled, (state, action) => {
        state.responseLoading = false;
        state.employee = action.payload;
        state.responseSuccess = true;
      })
      .addCase(fetchAllEmployee.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.responseError = action.payload as string;
      })
      .addCase(assignCourses.pending, (state) => {
        state.assignCoursesLoading = true;
      })
      .addCase(assignCourses.fulfilled, (state, action) => {
        state.assignCoursesLoading = false;
        state.assignCoursesSuccess = "Assign Course Successfully";
      })
      .addCase(assignCourses.rejected, (state, action) => {
        state.assignCoursesLoading = false;
        state.assignCoursesError =
          "Courses are already assigned to these employees.";
      })
      .addCase(fetchAllDepartment.pending, (state) => {
        state.responseLoading = true;
      })
      .addCase(fetchAllDepartment.fulfilled, (state, action) => {
        state.responseLoading = false;
        state.departments = action.payload;
        state.responseSuccess = true;
      })
      .addCase(fetchAllDepartment.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.responseError = action.payload as string;
      })
      .addCase(addDepartment.pending, (state) => {
        state.responseLoading = true;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.responseLoading = false;
        state.departments = [...state.departments, action.payload];
        state.addDepartmentSuccess = "department created successfully";
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.responseLoading = false;
        state.addDepartmentSuccess = false;
        state.addDepartmentError = action.payload as string;
      })
      .addCase(fetchEmployeeByDepartment.pending, (state) => {
        state.responseLoading = true;
      })
      .addCase(fetchEmployeeByDepartment.fulfilled, (state, action) => {
        state.responseLoading = false;

        // Extract employees from the action payload
        const employees = action.payload;

        // Update state.departments by adding employees to the matching department
        state.departments = state.departments.map((department) => {
          // Filter employees whose departmentId matches the current department id
          const departmentEmployees = employees?.filter(
            (employee: any) => employee.departmentId === department.id
          );

          // Add an `employees` key to the department object
          return {
            ...department,
            employees: departmentEmployees, // Add employees as a new key
          };
        });

        state.responseSuccess = true;
      })

      .addCase(fetchEmployeeByDepartment.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.responseError = action.payload as string;
      })
      .addCase(addReview.pending, (state) => {
        state.responseLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.responseLoading = false;

        // Extract review data from action payload
        const reviewData = action.payload;

        // Update the state by mapping through departments and adding the review to the corresponding employee
        state.departments = state.departments.map((department) => {
          // Update each department's employees
          return {
            ...department,
            employees: department.employees.map((employee: any) => {
              // Check if the employee ID matches the review's employee ID
              if (employee.id === reviewData.employee_id) {
                // Check if the employee already has a review with the same review ID
                const existingReview = employee.employee_review;

                if (existingReview && existingReview.id === reviewData.id) {
                  // Update the existing review
                  return {
                    ...employee,
                    employee_review: {
                      ...existingReview,
                      review: reviewData.review, // Update the review text
                      no_of_stars: reviewData.no_of_stars, // Update the rating
                      updated_at: reviewData.updated_at, // Update the timestamp
                    },
                  };
                } else {
                  // If no existing review or different review ID, add the new review
                  return {
                    ...employee,
                    employee_review: {
                      id: reviewData.id,
                      review: reviewData.review,
                      no_of_stars: reviewData.no_of_stars,
                      created_at: reviewData.created_at,
                      updated_at: reviewData.updated_at,
                    },
                  };
                }
              }

              // If the employee doesn't match the review, return the employee as-is
              return employee;
            }),
          };
        });

        state.responseSuccess = true;
      })

      .addCase(addReview.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.responseError = action.payload as string;
      })
      .addCase(submitFeedback.pending, (state) => {
        state.leaderFeedbackError = null;
        state.leaderFeedback = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.leaderFeedback = action.payload;
        state.leaderFeedbackSuccess = action.payload.message;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.leaderFeedback = null;
        state.leaderFeedbackSuccess = null;
        state.leaderFeedbackError = action.payload;
      })
      .addCase(removeEmployeesInDepartment.pending, (state) => {
        state.responseLoading = true;
      })
      .addCase(removeEmployeesInDepartment.fulfilled, (state, action) => {
        state.responseLoading = false;

        // Ensure the payload contains the necessary data
        if (action.payload && action.payload.successes.employeeId) {
          const employeeId = action.payload.successes.employeeId;

          // Find the department that the employee belongs to
          let departmentId = null;
          let departmentToUpdate = null;

          // Loop through departments to find the employee's department
          for (const department of state.departments) {
            const employee = department.employees?.find(
              (e: any) => e.id === employeeId
            );
            if (employee) {
              departmentId = department.id;
              departmentToUpdate = department;
              break;
            }
          }

          // Update the department by removing the employee
          if (departmentId) {
            state.departments = state.departments.map((department) => {
              if (department.id === departmentId) {
                const updatedEmployees = departmentToUpdate?.employees?.filter(
                  (employee: any) => employee.id !== employeeId
                );

                return {
                  ...department,
                  employees: updatedEmployees,
                };
              }
              return department;
            });
          }

          // Update the global employee state to reflect the removal from the department

          let allEmployees = [...state.employee];

          allEmployees = allEmployees.map((employee) => {
            if (employee.id === employeeId) {
              return {
                ...employee,
                departmentId: null, // Or update with appropriate logic
              };
            }
            return employee;
          });

          state.employee = allEmployees;

          state.responseSuccess = true;
        }
      })
      .addCase(removeEmployeesInDepartment.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.responseError = action.payload as string;
      })
      .addCase(addEmployeesInDepartment.pending, (state) => {
        state.responseLoading = true;
      })
      .addCase(addEmployeesInDepartment.fulfilled, (state, action) => {
        state.responseLoading = false;
        const newEmployee = action.payload.successes;

        state.departments = state.departments.map((department) => {
          if (department.id === newEmployee.departmentId) {
            return {
              ...department,
              employees: [...(department.employees || []), newEmployee],
            };
          }
          return department;
        });

        let allEmployees = [...state.employee];

        allEmployees = [...allEmployees, newEmployee];

        state.employee = allEmployees;

        state.responseSuccess = true;
      })
      .addCase(addEmployeesInDepartment.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.responseError = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError } = organizationSlice.actions;

export default organizationSlice.reducer;
