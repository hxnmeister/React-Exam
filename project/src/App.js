import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { fetchUserData, logout } from './asyncThunks/authThunk';

function App() 
{
  const { userData, token } = useSelector( (state) => state.auth )
  const dispatch = useDispatch();

  useEffect(() => 
  {
    dispatch(fetchUserData());
  }, [dispatch, token]);

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
