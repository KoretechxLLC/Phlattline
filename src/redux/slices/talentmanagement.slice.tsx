import axiosInstance from "@/app/utils/privateAxios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TalentState {
    createTalentLoader: boolean | null;
    createTalentError: any | null;
    createTalentSuccess: any | null;
    createdTalent: any | null;
    fetchTalentsLoader: boolean | null;
    fetchTalentsError: any | null;
    fetchTalentsSuccess: any | null;
    fetchedTalents: any | null;
    deleteTalentLoader: boolean | null; // For DELETE operation
    deleteTalentError: any | null; // For DELETE error
    deleteTalentSuccess: any | null; // For DELETE success message
}

const initialState: TalentState = {
    createTalentLoader: false,
    createTalentError: null,
    createTalentSuccess: null,
    createdTalent: null,
    fetchTalentsLoader: false,
    fetchTalentsError: null,
    fetchTalentsSuccess: null,
    fetchedTalents: null,
    deleteTalentLoader: false,
    deleteTalentError: null,
    deleteTalentSuccess: null,
};


//Async Thunk for Post talents (POST)
export const createTalent = createAsyncThunk(
    "talent/createTalent",
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/api/organization/talentManagement`, payload);
            return response.data; // Return the API response if successful
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create the position."
            );
        }
    }
);


// Async Thunk for updating talents (PUT)
export const updateTalent = createAsyncThunk<any, any>(
    "talent/updateTalent",
    async ({ id, updatedData }: { id: number; updatedData: any }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/api/organization/talentManagement`,
                { ...updatedData, talentId: id }
            );
            return { data: response.data, id }; // Return the updated data and ID
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update the talent."
            );
        }
    }
);


// Async Thunk for fetching talents (GET)
export const fetchTalents = createAsyncThunk<any, any>(
    "talent/fetchTalents",
    async (
        { organizationId, departmentId, talentId }: { organizationId?: number; departmentId?: number; talentId?: number },
        { rejectWithValue }
    ) => {
        try {
            // Build query string dynamically
            const queryParams = new URLSearchParams();
            if (organizationId) queryParams.append("organizationId", organizationId.toString());
            if (departmentId) queryParams.append("departmentId", departmentId.toString());
            if (talentId) queryParams.append("talentId", talentId.toString());

            const response = await axiosInstance.get(`/api/organization/talentManagement?${queryParams.toString()}`);
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message || "Failed to fetch talents.";
            return rejectWithValue(errorMessage);
        }
    }
);




// Async Thunk for fetching talents (GET)
export const fetchTalentsforindividuals = createAsyncThunk<any, any>(
    "talent/fetchTalentsforindividuals",
    async (
        { organizationId, departmentId, talentId }: { organizationId?: number; departmentId?: number; talentId?: number },
        { rejectWithValue }
    ) => {
        try {
            // Build query string dynamically
            const queryParams = new URLSearchParams();
            if (organizationId) queryParams.append("organizationId", organizationId.toString());
            if (departmentId) queryParams.append("departmentId", departmentId.toString());
            if (talentId) queryParams.append("talentId", talentId.toString());

            const response = await axiosInstance.get(`/api/jobsummaryfetchdetail?${queryParams.toString()}`);
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message || "Failed to fetch talents.";
            return rejectWithValue(errorMessage);
        }
    }
);




// Async Thunk for deleting talents (DELETE)
export const deleteTalent = createAsyncThunk<any, any>(
    "talent/deleteTalent",
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/organization/talentManagement?id=${id}`);
            return { data: response.data, id }; // Return response and ID of deleted talent
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete the position."
            );
        }
    }
);

const talentSlice = createSlice({
    name: "talent",
    initialState,
    reducers: {
        resetCreateTalentSuccess(state) {
            state.createTalentSuccess = null;
        },
        resetCreateTalentError(state) {
            state.createTalentError = null;
        },
        resetFetchTalentsSuccess(state) {
            state.fetchTalentsSuccess = null;
        },
        resetFetchTalentsError(state) {
            state.fetchTalentsError = null;
        },
        resetDeleteTalentSuccess(state) {
            state.deleteTalentSuccess = null;
        },
        resetDeleteTalentError(state) {
            state.deleteTalentError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Talent
            .addCase(createTalent.pending, (state) => {
                state.createTalentLoader = true;
                state.createTalentError = null;
            })
            .addCase(createTalent.fulfilled, (state, action) => {
                state.createTalentLoader = false;
                state.createTalentSuccess = action.payload.message || "Talent created successfully.";
                state.createdTalent = action.payload.data;
                state.fetchedTalents = [...state.fetchedTalents, action.payload.data]; 

            })
            .addCase(createTalent.rejected, (state, action) => {
                state.createTalentLoader = false;
                state.createTalentError = action.payload as string;
            })
            // Fetch Talents
            .addCase(fetchTalents.pending, (state) => {
                state.fetchTalentsLoader = true;
                state.fetchTalentsError = null;
            })
            .addCase(fetchTalents.fulfilled, (state, action) => {
                state.fetchTalentsLoader = false;
                state.fetchTalentsSuccess = "Talents fetched successfully.";
                state.fetchedTalents = action.payload.data;
            })
            .addCase(fetchTalents.rejected, (state, action) => {
                state.fetchTalentsLoader = false;
                state.fetchTalentsError = action.payload as string;
            })

            // Fetch Talents for indiviudals
            .addCase(fetchTalentsforindividuals.pending, (state) => {
                state.fetchTalentsLoader = true;
                state.fetchTalentsError = null;
            })
            .addCase(fetchTalentsforindividuals.fulfilled, (state, action) => {
                state.fetchTalentsLoader = false;
                state.fetchTalentsSuccess = "Talents fetched successfully.";
                state.fetchedTalents = action.payload.data;
            })
            .addCase(fetchTalentsforindividuals.rejected, (state, action) => {
                state.fetchTalentsLoader = false;
                state.fetchTalentsError = action.payload as string;
            })

            // Delete Talent
            .addCase(deleteTalent.pending, (state) => {
                state.deleteTalentLoader = true;
                state.deleteTalentError = null;
            })
            .addCase(deleteTalent.fulfilled, (state, action) => {
                state.deleteTalentLoader = false;
                state.deleteTalentSuccess = action.payload.data.message || "Talent deleted successfully.";
                state.fetchedTalents = (state.fetchedTalents || []).filter(
                    (talent: any) => talent.id !== action.payload.id
                );
            })
            .addCase(deleteTalent.rejected, (state, action) => {
                state.deleteTalentLoader = false;
                state.deleteTalentError = action.payload as string;
            })

            // Update Talent
            .addCase(updateTalent.pending, (state) => {
                state.createTalentLoader = true;
                state.createTalentError = null;
            })
            .addCase(updateTalent.fulfilled, (state, action) => {
                state.createTalentLoader = false;
                state.createTalentSuccess = action.payload.data.message || "Talent updated successfully.";
                state.fetchedTalents = (state.fetchedTalents || []).map((talent: any) =>
                    talent.id === action.payload.id ? { ...talent, ...action.payload.data } : talent
                );
            })
            .addCase(updateTalent.rejected, (state, action) => {
                state.createTalentLoader = false;
                state.createTalentError = action.payload as string;
            });
    },
});

export const {
    resetCreateTalentSuccess,
    resetCreateTalentError,
    resetFetchTalentsSuccess,
    resetFetchTalentsError,
    resetDeleteTalentSuccess,
    resetDeleteTalentError,
} = talentSlice.actions;

export default talentSlice.reducer;
