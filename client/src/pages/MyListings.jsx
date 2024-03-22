import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './MyListings.css'; // Importing a new CSS file

export default function MyListings() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

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
  }, []);

  return (
    <div className='my-listings-container'>
      <header className='header'>
          <h1>My Listings</h1>
      </header>

      <p className={showListingsError ? 'error-message' : 'hidden'}>
        Error showing listings
      </p>


{/* ... */}
{userListings && userListings.length > 0 && (
  <div className='listings-grid'>
    {userListings.map((listing) => (
      <div key={listing._id} className='listing-card'>
        <div className='image-container'> {/* New div for image */}
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt='listing cover' className='listing-image'/>
          </Link>
        </div>
        <div className='details-container'> {/* New div for details */}
          <Link className='listing-name' to={`/listing/${listing._id}`}>
            {listing.name}
          </Link>
          <p className='listing-price'>Price: $ {listing.regularPrice}</p>
          <p className='listing-type'>Transaction Type: {listing.type}</p>
          <p className='listing-bedrooms'>No. of Bedrooms: {listing.bedrooms}</p>

          <div className='card-actions'>
            <button onClick={() => handleListingDelete(listing._id)} className='delete-button'>
              Delete
            </button>
            <Link to={`/update-listing/${listing._id}`}>
              <button className='edit-button'>Edit</button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
{/* ... */}

    </div>
  );
};