import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { allActivities } from './asyncThunks/activityThunk';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function App() 
{
  const { activities } = useSelector( (state) => state.activity )
  const dispatch = useDispatch();

  useEffect( () => 
  {
    dispatch(allActivities());
  }, []);

  return (
    <>
      <h1>App</h1>
      {activities.map( (item, index) => <p key={index}>{ item.title }</p> )}

      <Outlet/>
    </>
  );
}

export default App;
