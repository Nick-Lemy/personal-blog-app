import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Post from './pages/Post'
import ProtectedRoute from './componets/ProtectedRoute'
import Favorites from './pages/Favorites'
import Account from './pages/Account'

function App() {

  return (
    <div className='app bg-gray-800'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/post/:id'
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route path='/favorites' element=

          {
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
        <Route path='/profile' element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App