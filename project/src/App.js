import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { fetchUserData, logout } from './asyncThunks/authThunk';

function App() 
{
  const { userData, token } = useSelector( (state) => state.auth )
  const dispatch = useDispatch();

  useEffect(() => 
  {
    dispatch(fetchUserData());
  }, []);

  return (
    <>
      <nav>
          <NavLink to='/'>Home</NavLink>

        {
          token ?
          <div className='auth'>
            <NavLink to='/create-activity'>Create</NavLink>
            { userData.name }
            <button onClick={ () => dispatch(logout()) }>Logout</button>
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
