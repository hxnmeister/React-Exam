import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";
import { getUserId } from "./helpers";

export const getAll = createAsyncThunk('projects/getAll', async (_, thunkAPI) => 
{
    const userId = await getUserId(thunkAPI);

    try
    {
        return (await api.get(`projects/${userId}`)).data;
    }
    catch (error)
    {
        console.log(error);
    }
});

export const add = createAsyncThunk('projects/add', async (payload) =>
{
    try
    {
        return (await api.post('/add-to-project', payload)).data;
    }
    catch (error)
    {
        console.log(error);
    }
});