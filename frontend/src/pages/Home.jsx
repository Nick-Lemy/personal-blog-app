import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='text-2xl text-white p-3'>
      <ul className='flex flex-col gap-4'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </ul>
    </div>
  )
}

export default Home