import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../asyncThunks/projectThunk';
import Project from '../../components/Project/Project';

const Projects = () => 
{
    const { projects, loading } = useSelector((state) => state.project)
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(getAll());
    }, [])

    return (
        <div>
            <h1>All available projects</h1>
            {Array.isArray(projects) && projects.map((project) => <Project key={project._id} project={project}/>)}
        </div>
    );
}

export default Projects;
