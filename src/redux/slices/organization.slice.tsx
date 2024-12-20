import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface organizationResponseState {
  loading: boolean;
  error: string | null;
  success: string | null;
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
  assignAssessmentLoading: boolean;
  assignAssessmentError: string | null;
  assignAssessmentSuccess: string | null;
  assignAssessmentData: any[];
  organizationAssessmentAssign: any;
  leaderFeedback: any;
  leaderFeedbackSuccess: string | null;
  leaderFeedbackError: any | null;
  removeEmployeeSuccess: any | null;
  addEmployeeSuccess: any | null;
  addEmployeeError: any | null;
  removeEmployeeError: any | null;
  employeeApprovalData: any | null;
  employeeApprovalLoading: boolean;
  employeeApprovalSuccess: any | null;
  employeeApprovalError: any | null;
  employeeDeletion: any | null;
  employeeDeletionLoading: boolean;
  employeeDeletionSuccess: any | null;
  employeeDeletionError: any | null;
  departmentDeletion: any | null;
  departmentDeletionsuccess: any | null;
  departmentDeletionerror: any | null;
  departmentDeletionLoading: boolean;
  organizationscount: number; 
  allOrganizations: any[];
  allOrganizationsLoading: boolean;
  allOrganizationsError: string | null;
}

const initialState: organizationResponseState = {
  loading: false,
  error: null,
  success: null,
  responseLoading: false,
  responseError: null,
  responseSuccess: null,
  organizationResponse: [],
  employee: [],
  assignCoursesLoading: false,
  assignCoursesError: null,
  assignCoursesSuccess: null,
  assignAssessmentData: [],
  organizationAssessmentAssign: [],
  assignAssessmentLoading: false,
  assignAssessmentError: null,
  assignAssessmentSuccess: null,
  addDepartmentSuccess: null,
  addDepartmentError: null,
  departments: [],
  leaderFeedback: null,
  leaderFeedbackSuccess: null,
  leaderFeedbackError: null,
  removeEmployeeSuccess: null,
  removeEmployeeError: null,
  addEmployeeSuccess: null,
  addEmployeeError: null,
  employeeApprovalData: null,
  employeeApprovalLoading: false,
  employeeApprovalSuccess: null,
  employeeApprovalError: null,
  employeeDeletion: null,
  employeeDeletionLoading: false,
  employeeDeletionSuccess: null,
  employeeDeletionError: null,
  departmentDeletion: null,
  departmentDeletionsuccess: null,
  departmentDeletionerror: null,
  departmentDeletionLoading: false,
  allOrganizations: [],
  organizationscount: 0,
  allOrganizationsLoading: false,
  allOrganizationsError: null,
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


// Fetch all Organizations
export const fetchAllOrganizations = createAsyncThunk<any, void, { rejectValue: string }>(
  "organization/fetchAllOrganizations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/auth/organization_register`);
      return response.data.data; // Adjust according to your API response structure
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to fetch all organizations";
      return rejectWithValue(errorMessage);
    }
  }
);


// Fetch all Organizations
export const fetchAllOrganizationsCount = createAsyncThunk(
  'organization/fetchAllOrganizationsCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/allcompanycount');
      return response.data.count; // Adjust based on actual structure
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to fetch all organizations count';
      console.error('Error in API call:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);




export const assignCourses = createAsyncThunk<any, any>(
  "organization/assignCourses",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/organization/AssignCourse`,
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

export const fetchAssignAssessment = createAsyncThunk<
  any,
  { organization_id?: number },
  { rejectValue: string }
>(
  "organization/fetchAssignAssessment",
  async ({ organization_id }, { rejectWithValue }) => {
    try {
      // Construct query parameters based on provided IDs
      const params = new URLSearchParams();
      if (organization_id)
        params.append("organization_id", organization_id.toString());

      const response = await axiosInstance.get(
        `/api/organization/assignAssessment?${params.toString()}`
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

export const assignAssessment = createAsyncThunk<any, any>(
  "organization/assignAssessment",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/organization/assignAssessment`,
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
        `/api/organization/manageDepartments/?organization_id=${organizationId}&`
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
        `/api/organization/manageDepartments`,
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
export const deleteDepartment = createAsyncThunk<any, any>(
  "organization/deleteDepartment",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/organization/manageDepartments?organization_id=${data.organization_id}&department_id=${data.department_id}`,
        data
      );

      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
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
        `/api/organization/employee_review`,
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

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch assessments";
      return rejectWithValue(errorMessage);
    }
  }
);

export const employeesApproval = createAsyncThunk<any, any>(
  "organization/employeesApproval",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/auth/user-approval", data);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to Change User Status";
      return rejectWithValue(errorMessage);
    }
  }
);
export const employeesDelete = createAsyncThunk<any, any>(
  "organization/employeesDelete",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/auth/employeeregister?organization_id=${data.organization_id}&employee_id=${data.employee_id}&user_id=${data.user_id}`,
        {
          data,
        }
      );

      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to Change User Status";
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
      state.assignAssessmentSuccess = null;
      state.addDepartmentSuccess = null;
      state.leaderFeedbackSuccess = null;
      state.removeEmployeeSuccess = null;
      state.addEmployeeSuccess = null;
      state.employeeApprovalSuccess = null;
      state.employeeDeletionSuccess = null;
      state.departmentDeletionsuccess = null;
    },
    resetError(state) {
      state.responseError = null;
      state.assignCoursesError = null;
      state.assignAssessmentError = null;
      state.addDepartmentError = null;
      state.leaderFeedbackError = null;
      state.removeEmployeeError = null;
      state.addEmployeeError = null;
      state.employeeApprovalError = null;
      state.employeeDeletionError = null;
      state.departmentDeletionerror = null;
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
      // This is Assign Courses POST
      .addCase(assignCourses.pending, (state) => {
        state.assignCoursesLoading = true;
      })
      .addCase(assignCourses.fulfilled, (state, action) => {
        state.assignCoursesLoading = false;
        state.assignCoursesSuccess = "Successfully Proceed";
      })
      .addCase(assignCourses.rejected, (state, action) => {
        state.assignCoursesLoading = false;
        state.assignCoursesError =
          "Courses are already assigned to these employees.";
      })
      // This is Assign Courses POST

      .addCase(assignAssessment.pending, (state) => {
        state.assignAssessmentLoading = true;
      })
      .addCase(assignAssessment.fulfilled, (state, action) => {
        state.assignAssessmentLoading = false;
        state.assignAssessmentData = action.payload;

        state.assignAssessmentSuccess = "Successfully Proceed";
      })
      .addCase(assignAssessment.rejected, (state, action) => {
        state.assignAssessmentLoading = false;
        state.assignAssessmentError =
          "Assessment are already assigned to these employees.";
      })

      .addCase(fetchAssignAssessment.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchAssignAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationAssessmentAssign = action.payload; // Update state with fetched data

        state.success = "Assign Courses Successfully fetched";
      })
      .addCase(fetchAssignAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Update state with error message
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

        state.responseSuccess = null;
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

        const updatedEmployee = action.payload; // The updated employee object
        let AllEmployees = [...state.employee];
        AllEmployees = AllEmployees.map((employee, index) => {
          if (employee.id == updatedEmployee.id) {
            return {
              ...updatedEmployee,
              departmentId: null,
            };
          } else {
            return employee;
          }
        });
        state.removeEmployeeSuccess = "Successfully employees removed";
        state.employee = AllEmployees;
      })
      .addCase(removeEmployeesInDepartment.rejected, (state, action) => {
        state.responseLoading = false;
        state.removeEmployeeSuccess = false;
        state.removeEmployeeError = action.payload as string;
      })
      .addCase(addEmployeesInDepartment.pending, (state) => {
        state.responseLoading = true;
      })
      .addCase(addEmployeesInDepartment.fulfilled, (state, action) => {
        state.responseLoading = false;

        // Convert the indexed object to an array
        const newEmployees = Object.values(action.payload.Data);

        let AllEmployee = [...state.employee];

        AllEmployee = AllEmployee.map((employee: any) => {
          let updatedEmployee = newEmployees.find((emp: any, ind: number) => {
            if (employee.id === emp.id) {
              return emp;
            }
          });
          if (updatedEmployee) {
            return updatedEmployee;
          } else {
            return employee;
          }
        });
        state.employee = AllEmployee;
        state.addEmployeeSuccess = "Successfully employees added";
      })
      .addCase(addEmployeesInDepartment.rejected, (state, action) => {
        state.responseLoading = false;
        state.responseSuccess = false;
        state.addEmployeeError = action.payload as string;
      })
      .addCase(employeesApproval.pending, (state) => {
        state.employeeApprovalLoading = true;
        state.employeeApprovalData = null;
      })
      .addCase(employeesApproval.fulfilled, (state, action) => {
        state.employeeApprovalData = action.payload;

        const updatedEmployee = action.payload.data;

        state.departments = state.departments.map((department) => {
          return {
            ...department,
            employees: department.employees.map((employee: any) => {
              if (employee.id == updatedEmployee.id) {
                return {
                  ...employee,
                  status: updatedEmployee?.status,
                };
              } else {
                return employee;
              }
            }),
          };
        });

        state.employeeApprovalSuccess = action.payload.message;
        state.employeeApprovalLoading = false;
      })
      .addCase(employeesApproval.rejected, (state, action) => {
        state.employeeApprovalLoading = false;
        state.employeeApprovalData = null;
        state.employeeApprovalSuccess = null;
        state.employeeApprovalError = action.payload;
      })
      .addCase(employeesDelete.pending, (state) => {
        state.employeeDeletionLoading = true;
        state.employeeDeletion = null;
      })
      .addCase(employeesDelete.fulfilled, (state, action) => {
        state.employeeDeletion = action.payload;

        const deletedEmployee = action.payload;

        state.departments = state.departments.map((department) => {
          return {
            ...department,
            employees: department.employees.filter((employee: any) => {
              if (employee.id != deletedEmployee.employee_id) {
                return employee;
              }
            }),
          };
        });

        state.employeeDeletionSuccess = "Employee Deleted Successfully";
        state.employeeDeletionLoading = false;
      })
      .addCase(employeesDelete.rejected, (state, action) => {
        state.employeeDeletionLoading = false;
        state.employeeDeletion = null;
        state.employeeDeletionSuccess = null;
        state.employeeDeletionError = action.payload;
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.departmentDeletionLoading = true;
        state.departmentDeletion = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departmentDeletionLoading = false;
        state.departmentDeletion = action.payload;
        let departId = action?.payload?.department_id;

        state.departments = state.departments.filter((depart: any) => {
          if (depart.id != departId) {
            return depart;
          }
        });
        state.departmentDeletionsuccess = "Departments Deleted Successfully";
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.departmentDeletionLoading = false;
        state.departmentDeletionerror = action.payload || "unknown error";
      })
      .addCase(fetchAllOrganizations.pending, (state) => {
        state.allOrganizationsLoading = true;
        state.allOrganizationsError = null;
      })
      .addCase(fetchAllOrganizations.fulfilled, (state, action) => {
        state.allOrganizationsLoading = false;
        state.allOrganizations = action.payload; // Update with all organizations
      })
      .addCase(fetchAllOrganizations.rejected, (state, action) => {
        state.allOrganizationsLoading = false;
        state.allOrganizationsError = action.payload as string; // Store the error message
      })

      .addCase(fetchAllOrganizationsCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrganizationsCount.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationscount = action.payload; // Update with numeric count
      })
      .addCase(fetchAllOrganizationsCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess, resetError } = organizationSlice.actions;

export default organizationSlice.reducer;
