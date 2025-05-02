import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../componets/Loading'
import { AuthContext } from '../utils/AuthContext'

const Account = () => {
    const { user, logout } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(
        () => {
            if (user !== null) return setLoading(false)
        }, [user])

    return (loading ? (<Loading />) : (
        <div className="flex bg-gray-800 justify-center overflow-auto md:p-4">
            <div className="flex-1 p-5 md:p-10 border-2 m-2 border-gray-600 bg-gray-900 rounded-2xl">
                <div>
                    <div onClick={
                        (e) => {
                            e.preventDefault()
                            navigate(-1)
                        }
                        }>
                        <svg className='cursor-pointer w-6 md:w-10 mb-5 fill-white' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.06">
                            <title>back-arrow</title>
                            <path d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z" />
                        </svg>
                    </div>
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Profile</h1>
                        <div className="flex space-x-2 items-center">
                            <div className="flex -space-x-2">
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='flex flex-col gap-5'>
                    <li className='text-white'>
                        <span className='font-semibold'>Fullname: </span>
                        <p className='pl-7'>{user.fullname} <span className='underline text-gray-600'>Edit</span></p>
                    </li>
                    <li className='text-white'>
                        <span className='font-semibold'>Email: </span>
                        <p className='pl-7'>{user.email} <span className='underline text-gray-600'>Edit</span></p>
                    </li>
                    <li className='text-white'>
                        <span className='font-semibold'>Password: </span>
                        <p className='pl-7'>{'••••••••••••'} <span className='underline text-gray-600'>Edit</span></p>
                    </li>

                </ul>
                <div className='pt-10 flex flex-col gap-5 w-fit text-center'>
                    <Link to={'/favorites'} className='text-white bg-blue-500 px-4 py-2 rounded-md'>
                        Favorites
                    </Link>
                    <button onClick={
                        () => {
                            navigate('/login')
                            logout()
                        }
                    } className='text-white bg-red-500 px-4 py-2 rounded-md'>
                        Logout
                    </button>
                </div>
            </div>
        </div>)

    )
}

export default Account