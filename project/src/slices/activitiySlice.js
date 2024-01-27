import { createSlice } from "@reduxjs/toolkit";
import { getAll, add, remove, update } from "../asyncThunks/activityThunk";

const initialState = 
{
    activities: [],
    loading: false,
    error: null
};

export const activitySlice = createSlice
(
    {
        name: 'activities',
        initialState,
        extraReducers: (builer) =>
        {
            builer
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
        }
    }
);

export default activitySlice.reducer;