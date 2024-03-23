import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name ||!email ||!phone ||!message) {
      alert('Please fill in all fields!');
      return;
    }

    const re = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      alert('Invalid email address!');
      return;
    }

    const rePhone = /^\+?[1-9]\d{1,14}$/;
    if (!rePhone.test(phone)) {
      alert('Invalid phone number!');
      return;
    }

    const body = `Name: \nEmail: \nPhone Number: \n\nMessage:\n`;

    window.open(`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=`);
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
                value={name}
                onChange={onChange}
                className='w-full border p-3 rounded-lg'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className='font-semibold'>
                Email:
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={onChange}
                className='w-full border p-3 rounded-lg'
              />
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
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Link
              to='#'
              className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
              onClick={handleSubmit}
            >
              Send Message
            </Link>
          </form>
        </div>
      )}
    </>
  );
}