import { configureStore } from "@reduxjs/toolkit";
import activityReducer from "../slices/activitiySlice";
import authReducer from "../slices/authSlice";
import projectReducer from "../slices/projectSlice";

const store = configureStore
(
    {
        reducer:
        {
            activity: activityReducer,
            auth: authReducer,
            project: projectReducer
        }
    }
);

export default store;