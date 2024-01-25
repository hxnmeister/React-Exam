import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { fetchUserData, logout } from './asyncThunks/authThunk';

function App() 
{
  const { userData, token } = useSelector( (state) => state.auth )
  const dispatch = useDispatch();

  useEffect( () => 
  {
    dispatch(fetchUserData());
  }, []);

  return (
    <>
      <nav>
        <NavLink to='/'>Home</NavLink>

        {
          token ?
          <>
            { userData.name }
            <button onClick={ () => dispatch(logout()) }>Logout</button>
          </> :
          <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
          </>
        }
      </nav>

      <Outlet/>
    </>
  );
}

export default App;
