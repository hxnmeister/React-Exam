import { configureStore } from "@reduxjs/toolkit";
import activityReducer from "../slices/activitiySlice";

const store = configureStore
(
    {
        reducer:
        {
            activity: activityReducer,
        }
    }
);

export default store;