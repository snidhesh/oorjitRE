import React from 'react'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'> 
   <h1>
    <span className="text-slate-800">oOrjit</span>
    <span className='w-2'>&nbsp;&nbsp;&nbsp;</span>
    <span className="text-slate-400">Real Estate</span>
</h1>
<form className='bg-slate-100 p-3 rounded-lg flex items-center'>
    <input type='text' placeholder="Search"  className='bg-transparent focus:outline-none w-24 sm:w-64'></input>
</form>
   
</div>
    </header>
  )
}
