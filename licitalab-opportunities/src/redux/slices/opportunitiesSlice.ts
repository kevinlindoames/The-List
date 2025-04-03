import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    OpportunityState,
    OpportunityFilters,
    Opportunity
} from '@/types/Opportunity';
import opportunityService from '@/services/opportunityService';

const initialState: OpportunityState = {
    items: [],
    followed: [],
    filters: {
        type: 'all',
        startDate: '',
        endDate: ''
    },
    status: 'idle',
    error: null,
    total: 0,
    page: 1,
    totalPages: 1
};

export const fetchOpportunities = createAsyncThunk(
    'opportunities/fetchOpportunities',
    async (filters: OpportunityFilters | undefined, { rejectWithValue }) => {
        try {
            return await opportunityService.getOpportunities(filters);
        } catch (originalError) {
            return rejectWithValue(
                originalError instanceof Error
                    ? originalError.message
                    : 'Error fetching opportunities'
            );
        }
    }
);

export const toggleOpportunityFollow = createAsyncThunk(
    'opportunities/toggleFollow',
    async (code: string, { dispatch, rejectWithValue }) => {
        try {
            const updatedOpportunity = await opportunityService.toggleFollow(code);
            dispatch(fetchOpportunities()); // Recarga las oportunidades
            return updatedOpportunity;
        } catch (originalError) {
            return rejectWithValue(
                originalError instanceof Error
                    ? originalError.message
                    : 'Error toggling follow'
            );
        }
    }
);

const opportunitiesSlice = createSlice({
    name: 'opportunities',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<OpportunityFilters>>) => {
            state.filters = {
                ...state.filters,
                ...action.payload
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOpportunities.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOpportunities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data;
                state.followed = action.payload.data.filter((opp: Opportunity) => opp.is_followed);
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchOpportunities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string | null;
            });
    }
});

export const { setFilters } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;