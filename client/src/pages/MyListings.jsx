import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserListings } from '../redux/user/userSlice.js';
import { useEffect, useState } from 'react';

const MyListings = () => {
  const [showListingsError, setShowListingsError] = useState(false);

  const dispatch = useDispatch();
  const userListings = useSelector((state) => state.user.userListings || []);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUserListings());
  }, [dispatch]);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser.name}`); // Make sure currentUser is defined
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      if (data.length > 0) {
        navigate('/my-listings', { state: { listings: data } }); // Make sure navigate is defined
      }
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className='p-3'>
      <h1 className='text-3xl font-semibold text-center my-7'>My Listings</h1>
      {userListings.length > 0 && loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        userListings.map((listing) => (
          <div
            key={listing._id}
            className='border rounded-lg p-3 flex justify-between items-center gap-4'
          >
            <Link to={`/listing/${listing._id}`}>
              <img
                src={listing.imageUrls[0]}
                alt='listing cover'
                className='h-16 w-16 object-contain'
              />
            </Link>
            <Link
              className='text-slate-700 font-semibold  hover:underline truncate flex-1'
              to={`/listing/${listing._id}`}
            >
              <p>{listing.name}</p>
            </Link>

            <div className='flex flex-col item-center'>
              <button
                onClick={() => handleListingDelete(listing._id)} // Make sure handleListingDelete is defined
                className='text-red-700 uppercase'
              >
                Delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
                <button className='text-green-700 uppercase'>Edit</button>
              </Link>
            </div>
          </div>
        ))
      )}
      <button onClick={handleShowListings} className='text-green-700 w-full mt-5'>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>
    </div>
  );
};

export default MyListings;
