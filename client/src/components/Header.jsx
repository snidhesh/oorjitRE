import {FaSearch} from  'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'> 
   <Link to='/'>
   <h1>
    <span className="text-slate-800">oOrjit</span>
    <span className='w-2'>&nbsp;&nbsp;&nbsp;</span>
    <span className="text-slate-400">Real Estate</span>
</h1>
</Link>
<form className='bg-slate-100 p-3 rounded-lg flex items-center'>
    <input type='text' placeholder="Search"  className='bg-transparent focus:outline-none w-24 sm:w-64'></input>
    <FaSearch className='text-slate-600'></FaSearch>
</form><ul className='flex gap-4'>
  <Link to='/'><li>Home</li></Link>
  <Link to='/about'> <li>About</li></Link>
  <Link to='/login'><li>Sign In</li></Link>

</ul>
</div>
    </header>
  )
}
