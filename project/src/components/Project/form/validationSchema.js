import * as Yup from "yup";

export const validate = Yup.object().shape
(
    {
        activityId: Yup.string().required("Cannot add empty activity!")
    }
);