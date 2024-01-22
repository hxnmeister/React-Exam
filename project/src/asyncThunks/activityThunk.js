import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/index";

export const allActivities = createAsyncThunk( 'allActivities', async () => (await api.get('/activities')).data );