// import React from 'react';

// const MyListings = ({ userListings, handleListingDelete }) => {
//   return (
//     <div className='p-3'>
//       <h1 className='text-3xl font-semibold text-center my-7'>My Listings</h1>
//       {userListings.map((listing) => (
//         <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
//           <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain' />
//           <p>{listing.name}</p>
//           <div>
//             <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
//             <Link to={`/update-listing/${listing._id}`}>
//               <button className='text-green-700 uppercase'>Edit</button>
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyListings;

import React from 'react'

export default function myListings() {
  return (
    <div>myListings</div>
  )
}
