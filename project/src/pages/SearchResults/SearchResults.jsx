import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Activity from '../../components/Activity/Activity';
import { useParams } from 'react-router-dom';
import { searchByTag } from '../../asyncThunks/activityThunk';

const SearchResults = () => {
    const { tagSearchResults } = useSelector((state) => state.activity);
    const { userData, token } = useSelector((state) => state.auth);
    const { tag } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => 
    {
        dispatch(searchByTag({userId: userData, searchingTag: `#${tag}`}))
    }, []);

    if(token)
    {
        return (
            <div>
                <h1>Searching results for "{tag}":</h1>
                {tagSearchResults.map((activity) => <Activity key={activity._id} activity={activity}/>)}       
            </div>
        );
    }
}

export default SearchResults;
