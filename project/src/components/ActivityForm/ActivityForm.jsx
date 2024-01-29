import React from 'react';
import { validation } from './validationSchema';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import styles from './style.module.css';

const ActivityForm = ({ handleSubmit, initialValues }) => 
{
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                validateOnChange
                onSubmit={handleSubmit}
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
                        
                            <div className={styles.tags}>
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
                            </div>

                            <button type="submit" disabled={isSubmitting || !isValid}>Submit</button>
                            <button type="reset">Reset</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
}

export default ActivityForm;