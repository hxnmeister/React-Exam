import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll as getAllProjects } from '../../asyncThunks/projectThunk';

import Project from '../../components/Project/Project';

const Projects = () => 
{
    const { projects } = useSelector((state) => state.project);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => 
    {
        dispatch(getAllProjects());
    }, [dispatch]);

    if(token)
    {
        return (
            <div>
                <h1>All available projects</h1>
                {Array.isArray(projects) && projects.map((project) => <Project key={project._id} project={project}/>)}
            </div>
        );
    }
}

export default Projects;
