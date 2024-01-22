import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { allActivities } from './asyncThunks/activityThunk';
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

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
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
      </nav>

      <Outlet/>
    </>
  );
}

export default App;
