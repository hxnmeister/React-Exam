import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";
import { fetchUserData } from "./authThunk";

export const allActivities = createAsyncThunk( 'allActivities', async () => 
{
    try
    {
        return  localStorage.getItem('uId') ? (await api.get(`/activities/${localStorage.getItem('uId')}`)).data : [];
    }
    catch (error)
    {
        console.log(error);
    }
});