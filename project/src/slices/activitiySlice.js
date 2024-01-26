import { createSlice } from "@reduxjs/toolkit";
import { getAll, add } from "../asyncThunks/activityThunk";

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
        }
    }
);

export default activitySlice.reducer;