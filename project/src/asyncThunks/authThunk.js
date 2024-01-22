import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";

export const login = createAsyncThunk('login', async (payload) =>
{
    const responseData = (await api.post('/login', payload)).data;
    localStorage.setItem('token', responseData.token);

    return responseData;
});

export const registration = createAsyncThunk('registration', async (payload) => (await api.post('/register', payload)).data );

export const fetchUserData = createAsyncThunk('fetchUserData', async () =>
{
    try
    {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`;

        return (await api.get('/user')).data;
    }
    catch
    {
        localStorage.removeItem('token');
    }
}); 