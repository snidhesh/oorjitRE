import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>oOrjit</span>
            <span className='text-slate-700'>&nbsp;Real Estate</span>
          </h1>
       
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <div className='relative'>
        <ul className='flex gap-4'>
         <Link to='/'><li>Home</li></Link>
         <Link to='/about'> <li>About</li></Link>
       
          <button

            onClick={handleToggleDropdown}
            disabled={!currentUser}
            className='flex items-center text-slate-700 hover:underline'
          >
        
            {currentUser? (
              <span>Hello {currentUser.username} </span>
            ) : (
              <Link to='/sign-in'>Sign In</Link>
            )}
            <svg
              className='h-4 w-4 ml-1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </button></ul>
          {/* <ul
            className='absolute bg-slate-100 mt-2 rounded-lg shadow-md w-40'
            style={{ top: '40px', left: '10px' }}
            hidden={!currentUser}
          > */}
          <ul
            className='absolute bg-slate-100 mt-2 rounded-lg shadow-md w-40'
            style={{ top: '40px', left: '10px' }}
            hidden={!currentUser || !isDropdownVisible}
          >
            <li className='py-2 px-4 hover:bg-slate-200'>
              <Link to='/profile'>My Profile</Link>
            </li>
            <li className='py-2 px-4 hover:bg-slate-200'>
              <Link to='/create-listing'>Create Listing</Link>
            </li>
            <li className='py-2 px-4 hover:bg-slate-200'>
              <Link to='/mylistings'>My Listings</Link>
            </li>
            <li className='py-2 px-4 hover:bg-slate-200'>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
