import { fetchUserData } from "../authThunk";

export const getUserId = async (thunkAPI) => (await thunkAPI.dispatch(fetchUserData())).payload.id;