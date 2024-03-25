import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './MyLeads.css';

const MyLeads = () => {
  const [leads, setLeads] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        if(currentUser && currentUser._id){    
           const response = await axios.get(`/api/lead/getLead/${currentUser._id}`);
           setLeads(response.data);
           setHasError(false);
        }
      } catch (error) {
        console.error('Error fetching leads', error);
        setHasError(true);
      }
    };

    fetchLeads();
  }, [currentUser]);

  return (
   <div className="leads-grid">
       {hasError ? (
           <p>No Leads Found</p>
       ) : (
           <table>
               <thead>
                   <tr>
                       <th>Sl.No</th>
                       <th>Name</th>
                       <th>Phone</th>
                       <th>Email</th>
                       <th>Message</th>
                       <th>Property Name</th>
                   </tr>
               </thead>
               <tbody>
                   {leads.map((lead, index) => (
                       <tr key={index} className="lead">
                           <td>{index + 1}</td>
                           <td>{lead.name}</td>
                           <td>{lead.phone}</td>
                           <td>{lead.email}</td>
                           <td>{lead.message}</td>
                           <td>{lead.listingName}</td>
                       </tr>
                   ))}
               </tbody>
           </table>
       )}
   </div>
   
  );
};

export default MyLeads;
