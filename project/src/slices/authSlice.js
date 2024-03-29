import { createSlice } from "@reduxjs/toolkit";
import { login, registration, fetchUserData, logout } from "../asyncThunks/authThunk";

const initialState =
{
    userData: null,
    token: null,
    loading: false,
    error: null
};

export const authSlice = createSlice
(
    {
        name: 'auth',
        initialState,
        reducers:
        {   
            clearError: (state) =>
            {
                state.error = null;
            }
        },
        extraReducers: (builder) =>
        {
            builder
            .addCase(login.pending, (state, action) => 
            {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.userData = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registration.pending, (state, action) => 
            {
                state.loading = true;
            })
            .addCase(registration.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.userData = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registration.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserData.pending, (state, action) => 
            {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => 
            {
                state.loading = false;
                state.userData = action.payload;
                state.token = localStorage.getItem('token');
            })
            .addCase(fetchUserData.rejected, (state, action) => 
            {
                state.loading = false;
                state.error = "error";
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.userData = {};
                state.token = null;
                state.loading = 'succeeded';
            });
        }
    }
);

export const { clearError } = authSlice.actions;
export default authSlice.reducer;