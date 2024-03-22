import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function MyListings() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
 
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
 
  const [showMyListings, setShowMyListings] = useState(false);
  const toggleMyListings = () => {
  setShowMyListings(!showMyListings);
};
const handleShowListings = async () => {


  
  try {
    setShowListingsError(false);
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    if (data.success === false) {
      setShowListingsError(true);
      return;
    }
    setUserListings(data);
  } catch (error) {
    setShowListingsError(true);
  }
};
useEffect(() => {
  handleShowListings();
}, []); // The empty array [] means this effect runs once after the initial render


  return (
    <div className='p-3'>
      <h1 className='text-3xl font-semibold text-center my-7'>My Listings</h1>

      {/* <button onClick={handleShowListings} className='text-green-700 w-full mt-5'>
        Show Listings
      </button> */}
      <p className='text-red-700 mt-5'>
        {showListingsError? 'Error showing listings' : ''}
      </p>
      {userListings && userListings.length > 0 && (
     
        <div className='flex flex-col gap-4'>
        
          {userListings.map((listing) => (
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
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
