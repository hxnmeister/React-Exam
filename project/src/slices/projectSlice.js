import { createSlice } from "@reduxjs/toolkit"
import { getAll } from "../asyncThunks/projectThunk";

const initialState = 
{
    projects: [],
    loading: false,
    error: null
}

export const projectSlice = createSlice
(
    {
        name: 'projects',
        initialState,
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
                state.projects = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = 'error';
            })
        }
    }
);

export default projectSlice.reducer;