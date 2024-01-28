import React, { useEffect } from 'react';
import Activity from '../Activity/Activity';
import { initialValues } from './form/initValues';
import { Field, Form, Formik } from 'formik';
import { add, getAll as getAllProjects } from '../../asyncThunks/projectThunk';
import { getAll as getAllActivities } from '../../asyncThunks/activityThunk'; 
import { useDispatch, useSelector } from 'react-redux';

const Project = ({ project }) => 
{
    const { activities } = useSelector((state) => state.activity);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        if(activities.length === 0) dispatch(getAllActivities());
    }, [])

    const submitHandler = (values) =>
    {
        Object.keys(values).length !== 0 && dispatch(add({id: project._id, activityId: values.activityId}));
    };

    return (
        <div>
            <div>{project.title}:</div>
            <div>
                {
                    project.activities_list.map((activity) => 
                    {
                        return(
                            <div key={activity._id}>
                                <Activity activity={activity}/>
                                <hr style={{marginRight: '80%'}}/>
                            </div>
                        );
                    })
                }
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
            >
                <Form>
                    <label htmlFor="activityId">Choose an activity:</label>
                    <Field as="select" id="activityId" name="activityId">
                        {activities.map((activity, index) => <option key={index} value={activity._id}>{activity.title}</option>)}
                    </Field>
                            
                    <button type="submit">Add Activity</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Project;
