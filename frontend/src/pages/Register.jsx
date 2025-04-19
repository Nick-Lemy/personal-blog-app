import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Input from '../componets/Input'
import { useState } from 'react'
import { Toast } from '../componets/Toast'

function Register() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')

  const [toastMessage, setToastMessage] = useState('Loading...')

  const navigate = useNavigate()
  const BASE_URL = 'http://localhost:3000'

  const option = {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      fullname,
      email,
      password
    })
  }
  const userRegistration = async () => {
    if(password !== confirmPassword) {
      setToastMessage('Password Confirmation Failed!')
      return;
    }
    const response = await fetch(`${BASE_URL}/user/register`, option)
    if (!response.ok) {
      setToastMessage('User Registration Failed!')
      return;
    }
    const data = await response.json()
    console.log(data)
    setToastMessage('User Registratred Successfully!')
    setInterval(() =>
      navigate('/')
      , 1000)
  }

  return (
    <section className="h-screen bg-gray-900">
      <Toast title={toastMessage} sucess={!toastMessage.includes('Failed') ? true : false} />
      <div className="flex flex-col items-center self-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Nick's Blog
        </Link>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold  text-center leading-tight tracking-tight md:text-2xl text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <Input autoComplete={false} title={'Fullname'} id={'fullname'} placeholder={'Nick-Lemy Kayiranga'} setInput={setFullname} />
              <Input title={'Email'} id={'email'} placeholder={'nicklemykayiranga@gmail.com'} setInput={setEmail} />
              <Input title={'Password'} id={'password'} placeholder={'••••••••'} setInput={setPassword} />
              <Input autoComplete={'new-password'} title={'Confirm Password'} id={'password'} placeholder={'password confirmation'} setInput={setConfirmPassword} />
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
                userRegistration()
                const toat = document.getElementById('toat')
                if (toat.className.includes('hidden')) {
                  toat.classList.add('flex')
                  toat.classList.remove('hidden')
                }
              }} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet? <Link to="/login" className="font-medium text-blue-500 hover:underline ">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register