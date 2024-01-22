import { createSlice } from "@reduxjs/toolkit";
import { allActivities } from "../asyncThunks/activityThunk";

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
            .addCase(allActivities.pending, (state, action) => 
            {
                state.loading = true;
            })
            .addCase(allActivities.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.activities = action.payload;
            })
            .addCase(allActivities.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = 'error';
            })
        }
    }
);

export default activitySlice.reducer;