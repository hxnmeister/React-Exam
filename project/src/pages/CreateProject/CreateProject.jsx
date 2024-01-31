import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll as getAllActivities } from '../../asyncThunks/activityThunk'; 
import { initialValues } from './initValues';
import { validation } from './validationSchema';
import { create } from '../../asyncThunks/projectThunk';

const CreateProject = () => 
{
    const { activities } = useSelector((state) => state.activity);
    const { userData, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        activities.length === 0 && dispatch(getAllActivities());
    }, []);

    const submitHandler = (values) =>
    {
        dispatch(create({...values, activities: values.activityId, user: userData.id}));
    };

    if(token)
    {
        return (
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    validateOnChange
                    onSubmit={submitHandler}
                >
                    {
                        ({ isSubmitting, isValid }) =>
                        (
                            <Form>
                                <label htmlFor="title">Title:</label>
                                <Field type="text" name="title" id="title" placeholder="Enter Title!"/>
                                <ErrorMessage component="div" name="title"/>
    
                                <label htmlFor="activityId">Choose an activity:</label>
                                <Field as="select" id="activityId" name="activityId">
                                    <option value=''>Select option!</option>
                                    {activities.map((activity, index) => <option key={index} value={activity._id}>{activity.title}</option>)}
                                </Field>
                                <ErrorMessage component="div" name="activityId"/>
    
                                <button type="submit" disabled={ isSubmitting || !isValid }>Submit</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        );
    }
}

export default CreateProject;
