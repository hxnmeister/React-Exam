import React from 'react';
import Activity from '../Activity/Activity';

const Project = ({ project }) => 
{
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
        </div>
    );
}

export default Project;
