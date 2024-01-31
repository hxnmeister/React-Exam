import styles from './style.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../asyncThunks/activityThunk';
import Activity from '../../components/Activity/Activity';
import EditMode from '../../components/EditMode/EditMode';
import { remove } from '../../asyncThunks/activityThunk';

const Home = () => 
{
    const { activities, loading } = useSelector((state) => state.activity);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [searchPriority, setSearchPriority] = useState('');
    const [selectedActivity, setSelectedActivity] = useState(null);

    useEffect(() =>
    {
        dispatch(getAll());
    }, []);

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
    
    if(loading)
    {
        return <h1>Loading...</h1>
    }
    else if(token)
    {
        if(!isEditing)
        {
            return (
                <div className={styles.container}>
                    <div className={styles.searchingPanel}>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchText} 
                            onChange={(e) => setSearchText(e.target.value)}
                            className={styles.searchBar}
                        />
                        <input 
                            type="text"
                            placeholder="Search by priority..."
                            value={searchPriority}
                            onChange={(e) => setSearchPriority(e.target.value)}
                            className={styles.searchBar}
                        />
                    </div>
                    <div className={styles.activitiesContainer}>
                        { 
                            Array.isArray(activities) && activities.filter((activity) =>
                            {
                                const textRegex = new RegExp(searchText, 'i');
                                const priorityRegex = new RegExp(searchPriority, 'i');
                    
                                return (
                                    (searchText === '' || textRegex.test(activity.title) || textRegex.test(activity.description) || activity.tags.some(tag => textRegex.test(tag))) &&
                                    (searchPriority === '' || priorityRegex.test(activity.priority.toString()))
                                    );
                            }).map((activity) => 
                            {
                                return(
                                    <div className={styles.homeActivities} key={activity._id}>
                                        <Activity activity={activity} searchText={searchText}/> 
                                        <button type="button" onClick={() => dispatch(remove(activity._id))}>Delete</button>
                                        <button type="button" onClick={() => handleEnterEditClick(activity)}>Edit</button>
                                    </div>
                                )
                            })
                        }
                    </div>
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
}

export default Home;
