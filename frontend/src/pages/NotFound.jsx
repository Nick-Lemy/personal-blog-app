import React from 'react'
import { Link } from 'react-router-dom'


function NotFound() {
    
    return (
        <div className='flex h-screen flex-col w-full gap-5 justify-center items-center'>
            <p className='text-white text-3xl'>
               Page Not Found!
            </p>
            <Link to='/'>
                <p className='text-blue-600 underline'>Go back home</p>
            </Link>
        </div>
    )
}

export default NotFound