import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../componets/Input'
import { useState } from 'react'
import { Toast } from '../componets/Toast'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toastMessage, setToastMessage] = useState('Loading...')

    const navigate = useNavigate()
    const BASE_URL = 'https://personal-blog-app-7iu1.onrender.com'

    const option = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }
    const userLogin = async () => {
        const response = await fetch(`${BASE_URL}/user/login`, option)
        if (!response.ok) {
            setToastMessage('User Not Found!')
            return;
        }
        const data = await response.json()
        console.log(data)
        setToastMessage('User Found!')
        setInterval(() => 
            navigate('/')
        , 1000)
    }

    return (
        <section className="h-screen bg-gray-900">
            <Toast title={toastMessage} sucess={toastMessage.includes('Not') ? false : true} />
            <div className="flex flex-col items-center self-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Nick's Blog
                </Link>
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold  text-center leading-tight tracking-tight md:text-2xl text-white">
                            Login to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <Input title={'Your email'} id={'email'} placeholder={'nicklemykayiranga@gmail.com'} setInput={setEmail} />
                            <Input title={'Password'} id={'password'} placeholder={'••••••••'} setInput={setPassword} />
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium  hover:underline text-blue-500">Forgot password?</a>
                            </div>
                            <button onClick={(e) => {
                                e.preventDefault()
                                userLogin()
                                const toat = document.getElementById('toat')
                                if (toat.className.includes('hidden')) {
                                    toat.classList.toggle('flex')
                                    toat.classList.remove('hidden')
                                }
                            }} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <Link to="/register" className="font-medium text-blue-500 hover:underline ">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login