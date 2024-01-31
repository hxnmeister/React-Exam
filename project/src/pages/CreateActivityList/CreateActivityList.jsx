import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { initialValues } from './form/initValues';
import { validation } from './form/validationSchema';
import { getContent, submitHandler } from './helpers';
import Activity from '../../components/Activity/Activity';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const CreateActivityList = () => 
{
    const [selectedOption, setSelectedOption] = useState('');
    const [activityList, setActivityList] = useState([]);
    const { activities } = useSelector((state) => state.activity);
    const { token } = useSelector((state) => state.auth);

    const selectChangeHandler = (e, values) =>
    {
        const value = e.target.value;

        setSelectedOption(value); 
        values.listBy = value;
    };

    if(token)
    {
        return (
            <div>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validate={validation}
                        validateOnChange
                        onSubmit={(values) => submitHandler(values, selectedOption, activities, setActivityList)}
                    >
                        {
                            ({ values, setFieldValue, isValid }) =>
                            (
                                <Form>
                                    <label htmlFor="listBy">Form list by:</label>
                                    <Field as="select" id="listBy" name="listBy" onChange={(e) => {selectChangeHandler(e, values)}}>
                                        <option value="">Select option!</option>
                                        <option value="day">Day</option>
                                        <option value="week">Week</option>
                                        <option value="month">Month</option>
                                    </Field>
                                    <ErrorMessage component="div" name="listBy"/>
    
                                    {getContent(selectedOption)}
    
                                    {
                                        (selectedOption === 'week' && values.weekPickerStart) && 
                                        (
                                            <>
                                                <Field type="date" id="weekPickerEnd" name="weekPickerEnd" disabled/>
                                                <ErrorMessage component="div" name="weekPickerEnd"/>
                                                
                                                <button type="button" onClick={() => setFieldValue('weekPickerEnd', new Date(new Date(values.weekPickerStart).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}>
                                                    Calculate Week
                                                </button>
                                            </>
                                        )
                                    }
    
                                    <button type="submit" disabled={!isValid}>Submit</button>
                                </Form>
                            )
                        }
                        
                    </Formik>
                </div>
                <div>
                    {activityList.length > 0 && activityList.map((activity) => <Activity key={activity._id} activity={activity}/>)}
                </div>
            </div>
        );
    }
}

export default CreateActivityList;
