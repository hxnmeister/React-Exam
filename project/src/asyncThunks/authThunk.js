import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";

export const login = createAsyncThunk('login', async (payload, { rejectWithValue }) =>
{
    try
    {
        const responseData = (await api.post('/login', payload)).data;
        localStorage.setItem('token', responseData.token);
    
        return responseData;
    }
    catch (error)
    {
        return rejectWithValue(error.response.data);
    }
});

export const registration = createAsyncThunk('registration', async (payload, thunkAPI) => 
{
    try
    {
        const responseData = (await api.post('/register', payload)).data;
        localStorage.setItem('token', responseData.token);
    
        return responseData;
    }
    catch (error)
    {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchUserData = createAsyncThunk('fetchUserData', async () =>
{
    try
    {
        if(localStorage.getItem('token'))
        {
            const token = localStorage.getItem('token');
            api.defaults.headers.Authorization = `Bearer ${token}`;
    
            return (await api.get('/user')).data;
        }
        
        throw new Error;
    }
    catch
    {
        localStorage.removeItem('token');
    }
});

export const logout = createAsyncThunk('logout', () =>
{
    localStorage.removeItem('token');
});