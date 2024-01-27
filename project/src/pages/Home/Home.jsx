import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../asyncThunks/activityThunk';
import Activity from '../../components/Activity/Activity';
import EditMode from '../../components/EditMode/EditMode';

const Home = () => 
{
    const { activities, loading } = useSelector((state) => state.activity);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const handleEnterEditClick = (activity) =>
    {
        setSelectedActivity(activity);
        setIsEditing(true);
    };

    const handleExitEdit = () =>
    {
        setSelectedActivity(null);
        setIsEditing(false);
    };

    useEffect(() =>
    {
        dispatch(getAll());
    }, []);

    if(loading)
    {
        return <h1>Loading...</h1>
    }

    if(!isEditing)
    {
        return (
            <div>
                { Array.isArray(activities) && activities.map( (activity) => <Activity key={activity._id} activity={activity} handleEnterEditClick={handleEnterEditClick}/> )}
            </div>
        );
    }
    else
    {
        return(
            <div>
                <EditMode selectedActivity={selectedActivity} handleExitEdit={handleExitEdit}/>
            </div>
        );
    }
}

export default Home;
