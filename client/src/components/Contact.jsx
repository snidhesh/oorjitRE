import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormData from 'form-data';
import { useSelector } from 'react-redux';


export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);


  const onChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  };
    const validate = () => {
    const errors = {};

    if (!name) {
      errors.name = 'This field is required';
    }

    if (!email) {
      errors.email = 'This field is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!phone) {
      errors.phone = 'This field is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Invalid phone number';
    }

    setErrors(errors);

    return Object.values(errors).length === 0;
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

 
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('phone', phone);
      data.append('message', message);
      data.append('landlordEmail', landlord.email);

  const url = '/api/listing/send-email';

  fetch(url, {
    method: 'POST',
    body: data,
  })
   .then((res) => res.json())
   .then((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        console.log('Email sent successfully!');
      }
    })
   .catch((err) => console.error(err));
  }
};
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='name' className='font-semibold'>
                Name:
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={currentUser.username}
                onChange={onChange}
                className='w-full border p-3 rounded-lg'
              />
               {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className='font-semibold'>
                Email:
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={currentUser.email}
                onChange={onChange}
                className='w-full border p-3 rounded-lg'
              />
             {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}  
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='phone' className='font-semibold'>
                Phone Number:
              </label>
              <input
                type='tel'
                name='phone'
                id='phone'
                value={phone}
                onChange={onChange}
                className='w-full border p-3 rounded-lg'
              />
               {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='message' className='font-semibold'>
                Message:
              </label>
              <textarea
                name='message'
                id='message'
                rows='2'
                value={message}
                onChange={onChange}
                placeholder='Enter your message here...'
                className='w-full border p-3 rounded-lg'
              ></textarea>
               {errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
  <button
    type="submit"
    className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
  >
    Send Message
  </button>
</form>

        </div>
      )}
    </>
  );
}