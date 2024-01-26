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
        <div className='main-bar'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/create-activity'>Create</NavLink>
        </div>

        {
          token ?
          <div className='additional-bar'>
            { userData.name }
            <button onClick={ () => dispatch(logout()) }>Logout</button>
          </div> :
          <div className='additional-bar'>
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
