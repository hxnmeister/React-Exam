import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";
import { fetchUserData } from "./authThunk";

const getUserId = async (thunkAPI) => (await thunkAPI.dispatch(fetchUserData())).payload.id;

export const getAll = createAsyncThunk('getAll', async (_, thunkAPI) => 
{
    const userId = await getUserId(thunkAPI);
    
    try
    {
        return (await api.get(`/activities/${userId}`)).data;
    }
    catch (error)
    {
        console.log(error);
    }
});

export const add = createAsyncThunk('add', async (payload) =>
{
    try
    {
        return(await api.post('/activities', payload)).data;
    }
    catch (error)
    {
        console.log(error);
    }
});

export const remove = createAsyncThunk('remove', async (payload) =>
{
    try
    {
        return(await api.delete(`/activities/${payload}`)).data;
    }
    catch (error)
    {
        console.log(error);
    }
});

export const update = createAsyncThunk('update', async (payload) =>
{
    try
    {
        return(await api.put(`/activities/${payload._id}`, payload)).data;
    }
    catch (error)
    {
        console.log(error);
    }
});