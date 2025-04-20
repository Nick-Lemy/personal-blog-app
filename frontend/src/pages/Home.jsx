import React from 'react'
import { Link } from 'react-router-dom'

const BASE_URL = import.meta.env.BASE_URL
function Home() {
  console.log(BASE_URL, 'ok')
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