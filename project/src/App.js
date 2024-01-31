import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { NavLink, Navigate, Outlet, Route, Router } from 'react-router-dom';
import { fetchUserData, logout } from './asyncThunks/authThunk';
import Projects from './pages/Projects/Projects';
import { getAll } from './asyncThunks/activityThunk';

function App() 
{
  const { userData, token } = useSelector( (state) => state.auth )
  const { activities } = useSelector((state) => state.activity);

  const dispatch = useDispatch();

  useEffect(() => 
  {
    dispatch(fetchUserData());
    if(activities.length === 0) dispatch(getAll());
  }, [dispatch]);

  const handleSubmit = () =>
  {
    dispatch(logout());
  };

  return (
    <>
      <nav>
        <NavLink to='/'>Home</NavLink>

        {
          token ?
          <div className='auth'>
            <NavLink to='/projects'>Projects</NavLink>
            <NavLink to='/create-activity'>Create Activity</NavLink>
            <NavLink to='/create-project'>Create Project</NavLink>
            <NavLink to='/create-activities-list'>Create Activities List</NavLink>
            { userData.name }
            <button onClick={ handleSubmit }>Logout</button>
          </div>:
          <div className='auth'>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
          </div>
        }
      </nav>
      <Outlet/>
    </>
  );
}

export default App;
