import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";

export const login = createAsyncThunk('login', async (payload) =>
{
    const responseData = (await api.post('/login', payload)).data;
    localStorage.setItem('token', responseData.token);
    localStorage.setItem('uId', responseData.user.id);
    

    return responseData;
});

export const registration = createAsyncThunk('registration', async (payload) => 
{
    const responseData = (await api.post('/register', payload)).data;
    localStorage.setItem('token', responseData.token);
    localStorage.setItem('uId', responseData.user.id);

    return responseData;
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
    localStorage.removeItem('uId');
});