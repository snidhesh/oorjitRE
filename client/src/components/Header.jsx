import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleSignOut = (e) => {
    e.preventDefault();
    // Sign out the user
    //...
  };

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>oOrjit</span>
            <span className='text-slate-700'>&nbsp;Portal</span>
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
            className='flex items-center text-slate-700 hover:underline'
            disabled={!currentUser}
          >
        
            {currentUser? (
              <span>Hello </span>
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
          <ul
            className='absolute bg-slate-100 mt-2 rounded-lg shadow-md w-40'
            style={{ top: '40px', left: '10px' }}
            hidden={!currentUser}
          >
            <li className='py-2 px-4 hover:bg-slate-200'>
              <Link to='/profile'>My Profile</Link>
            </li>
            <li className='py-2 px-4 hover:bg-slate-200'>
              <Link to='/listings'>My Listings</Link>
            </li>
            <li className='py-2 px-4 hover:bg-slate-200'>
              <a href='#' onClick={(e) => handleSignOut(e)}>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}