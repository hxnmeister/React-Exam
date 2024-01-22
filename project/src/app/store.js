import { configureStore } from "@reduxjs/toolkit";
import activityReducer from "../slices/activitiySlice";
import authReducer from "../slices/authSlice";

const store = configureStore
(
    {
        reducer:
        {
            activity: activityReducer,
            auth: authReducer
        }
    }
);

export default store;