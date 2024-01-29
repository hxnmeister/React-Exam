import React, { useEffect } from 'react';
import Activity from '../Activity/Activity';
import { initialValues } from './form/initValues';
import { Field, Form, Formik } from 'formik';
import { addToProject, getAll as getAllProjects, remove } from '../../asyncThunks/projectThunk';
import { getAll as getAllActivities } from '../../asyncThunks/activityThunk'; 
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Project = ({ project }) => 
{
    const { activities } = useSelector((state) => state.activity);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        activities.length === 0 && dispatch(getAllActivities());
    }, [dispatch])

    const submitHandler = (values) =>
    {
        Object.keys(values).length !== 0 && dispatch(addToProject({id: project._id, activityId: values.activityId}));
    };

    const deleteHandler = (projectId) =>
    {
        dispatch(remove(projectId));
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
                    <button type="button" onClick={() => deleteHandler(project._id)}>Delete Project</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Project;
