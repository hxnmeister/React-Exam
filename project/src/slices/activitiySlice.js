import { createSlice } from "@reduxjs/toolkit";
import { getAll, add, remove, update, searchByTag } from "../asyncThunks/activityThunk";

const initialState = 
{
    activities: [],
    tagSearchResults: [],
    loading: false,
    error: null
};

export const activitySlice = createSlice
(
    {
        name: 'activities',
        initialState,
        reducers:
        {
            clearSearchResults: (state) =>
            {
                state.tagSearchResults = [];
            }
        },
        extraReducers: (builder) =>
        {
            builder
            .addCase(getAll.pending, (state, action) => 
            {
                state.loading = true;
            })
            .addCase(getAll.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.activities = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = 'error';
            })
            .addCase(add.pending, (state, action) => 
            {
                state.loading = true;
            })
            .addCase(add.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.activities = action.payload;
            })
            .addCase(add.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = 'error';
            })
            .addCase(remove.pending, (state, action) => 
            {
                state.loading = true;
            })
            .addCase(remove.fulfilled, (state, action) => 
            {
                state.loading = false;
                console.log(action);
                state.activities = action.payload;
            })
            .addCase(remove.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = 'error';
            })
            .addCase(update.pending, (state, action) => 
            {
                state.loading = true;
            })
            .addCase(update.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.activities = action.payload;
            })
            .addCase(update.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = 'error';
            })
            .addCase(searchByTag.pending, (state) => 
            {
                state.loading = true;
            })
            .addCase(searchByTag.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.tagSearchResults = action.payload;
            })
            .addCase(searchByTag.rejected, (state) => 
            {
                state.loading = false;
                state.error = 'error';
            })
        }
    }
);

export const { clearSearchResults } = activitySlice.actions;
export default activitySlice.reducer;