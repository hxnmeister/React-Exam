import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";
import { getUserId } from "./helpers";

export const getAll = createAsyncThunk('activity/getAll', async (_, thunkAPI) => 
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

export const add = createAsyncThunk('activity/add', async (payload) =>
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

export const remove = createAsyncThunk('activity/remove', async (payload) =>
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

export const update = createAsyncThunk('activities/update', async (payload) =>
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

export const searchByTag = createAsyncThunk('activities/search_by_tag', async (payload) =>
{
    try
    {
        console.log((await api.post('search-by-tag', payload)).data);
    }
    catch (error)
    {
        console.log(error);
    }
});