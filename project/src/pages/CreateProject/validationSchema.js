import * as Yup from 'yup';

const minTitle = 6;

export const validation = Yup.object().shape
(
    {
        title: Yup.string().min(minTitle, `Title must be at least ${minTitle} chars!`)
            .required('Title is required!'),
        activityId: Yup.string().required('Activity is required!')
    }
);