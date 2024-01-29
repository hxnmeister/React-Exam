import { createSlice } from "@reduxjs/toolkit"
import { getAll, addToProject, create, remove, searchByTag } from "../asyncThunks/projectThunk";

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
            .addCase(getAll.pending, (state) => 
            {
                state.loading = true;
            })
            .addCase(getAll.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(getAll.rejected, (state) => 
            {
                state.loading = false;
                state.error = 'error';
            })
            .addCase(addToProject.pending, (state) => 
            {
                state.loading = true;
            })
            .addCase(addToProject.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(addToProject.rejected, (state) => 
            {
                state.loading = false;
                state.error = 'error';
            })
            .addCase(create.pending, (state) => 
            {
                state.loading = true;
            })
            .addCase(create.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(create.rejected, (state) => 
            {
                state.loading = false;
                state.error = 'error';
            })
            .addCase(remove.pending, (state) => 
            {
                state.loading = true;
            })
            .addCase(remove.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(remove.rejected, (state) => 
            {
                state.loading = false;
                state.error = 'error';
            })
        }
    }
);

export default projectSlice.reducer;