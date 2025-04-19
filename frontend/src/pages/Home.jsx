import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='text-4xl'>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>

      </ul>
    </div>
  )
}

export default Home