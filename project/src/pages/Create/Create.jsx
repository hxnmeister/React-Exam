import { useFormik } from 'formik';
import React from 'react';
import { initialValues } from './form/initValues';
import '../../components/ErrorMessage/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../asyncThunks/activityThunk';

const Create = () => 
{
    const { userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const formik = useFormik
    (
        {
            initialValues,
            validate: () => {},
            onSubmit: (values) =>
            {
                console.log(JSON.stringify(values));
                dispatch(add({...values, user: userData.id}));
            }
        }
    );

    const addTagHadler = () => formik.setFieldValue('tags', [...formik.values.tags, `#tag${formik.values.tags.length + 1}`]);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />

                <label htmlFor="description">Title:</label>
                <textarea 
                    name="description" 
                    id="description" 
                    cols="30" 
                    rows="5"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.description}></textarea>

                <label htmlFor="priority">Priority:</label>
                <input 
                    type="number" 
                    name="priority" 
                    id="priority"
                    min={1}
                    max={10}
                    onChange={formik.handleChange}
                    value={formik.values.priority}
                />

                <label htmlFor="deadline">Deadline:</label>
                <input 
                    type="datetime-local" 
                    name="deadline" 
                    id="deadline"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.deadline} 
                />

                <label htmlFor="tags">Tags:</label>
                {
                    formik.values.tags.map((tag, index) => 
                    (
                        <input 
                            type="text" 
                            name={`tags[${index}]`} 
                            id={`tag-${index}`}
                            key={index}
                            onChange={formik.handleChange}
                            value={tag}
                        />
                    ))
                }
                <button type="button" onClick={ addTagHadler }>Add Tag</button>
                <button type="submit" onClick={ formik.handleSubmit }>Create Activity</button>
            </form>
        </div>
    );
}

export default Create;
