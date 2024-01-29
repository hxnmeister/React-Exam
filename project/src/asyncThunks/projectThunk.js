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

export const addToProject = createAsyncThunk('projects/add_to_project', async (payload) =>
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

export const create = createAsyncThunk('projects/create', async (payload) =>
{
    try
    {
        return (await api.post('/projects', payload)).data;
    }
    catch (error)
    {
        console.log(error);
    }
});

export const remove = createAsyncThunk('projects/remove', async (payload) =>
{
    try
    {
        return (await api.delete(`/projects/${payload}`)).data;
    } 
    catch (error)
    {
        console.log(error);
    }
});