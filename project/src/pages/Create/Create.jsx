import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { initialValues } from './form/initValues';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../asyncThunks/activityThunk';
import { validation } from './form/validationSchema';

const Create = () => 
{
    const { userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                validateOnChange
                onSubmit={(values) => dispatch(add({...values, user: userData.id}))}
            >
                {
                    ({ isSubmitting, isValid }) =>
                    (
                        <Form>
                            <label htmlFor="title">Title:</label>
                            <Field type="text" name="title" id="title" placeholder="Enter Title!"/>
                            <ErrorMessage component="div" name="title"/>

                            <label htmlFor="description">Description:</label>
                            <Field as="textarea" name="description" id="description" cols="30" rows="5" placeholder="Some text for description?"/>
                            <ErrorMessage component="div" name="description"/>

                            <label htmlFor="priority">Priority:</label>
                            <Field type="number" name="priority" id="priority" min="1" max="10" placeholder="1-10"/>
                            <ErrorMessage component="div" name="priority"/>
                            
                            <label htmlFor="deadline">Deadline:</label>
                            <Field type="datetime-local" name="deadline" id="deadline"/>
                            <ErrorMessage component="div" name="deadline"/>
                        
                            <label htmlFor="tags">Tags:</label>
                            <FieldArray name="tags">
                                {
                                    (arrayHelpers) =>
                                    (
                                        <div>
                                            {arrayHelpers.form.values.tags.map((tag, index) =>
                                                (
                                                    <div key={index}>
                                                        <Field type="text" name={`tags[${index}]`} placeholder={`#tag${index + 1}`}/>
                                                        <ErrorMessage component="div" name={`tags[${index}]`}/>
                                                        
                                                        <button type="button" onClick={ () => arrayHelpers.form.values.tags.length > 1 && arrayHelpers.remove(index) }>Remove</button>
                                                        <button type="button" onClick={ () => arrayHelpers.push(`#tag${arrayHelpers.form.values.tags.length + 1}`) }>Add</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </FieldArray>
                            <ErrorMessage component="div" name="tag"/>

                            <button type="submit" disabled={isSubmitting || !isValid}>Submit</button>
                            <button type="reset">Reset</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
}

export default Create;
