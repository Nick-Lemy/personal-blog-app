import React, { useState } from 'react'
import Navbar from '../sections/Navbar';
import Card from '../componets/Card';
import { useEffect } from 'react';
import { BACKEND_BASE_URL } from '../utils/environment.varible.mjs';
import axios from 'axios';

function Favorites() {
  const [allPosts, setAllPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchPosts = async () => {
    try {
    const token = localStorage.getItem('token')
    console.log(token)
    const posts = await axios.get(`${BACKEND_BASE_URL}/post/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = []
    for( const id of posts.data){
        const response = await axios.get(`${BACKEND_BASE_URL}/post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        data.push(response.data)
    }
    console.log(data)
    const searchedPosts = data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setAllPosts(searchedPosts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  return (
    <div className="flex bg-gray-800 justify-center overflow-auto md:p-4">
      <div className="flex-1 p-5 md:p-10 border-2 m-2 border-gray-600 bg-gray-900 rounded-2xl">
        <Navbar />
        <div className="relative w-fit pb-5">
          <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="bg-transparent text-white border border-gray-400 rounded-full py-2 px-4 w-64" />
          <span className="absolute right-3 top-2 text-gray-400"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts && (allPosts.length > 0 ?
            allPosts.map(post => (
              <Card key={post._id} title={post.title} subtitle={post.subtitle} content={post.main.slice(0, 150) + '...'} color={{ bg: 'bg-blue-950', txt: 'text-white' }} id={post._id} />
            )) : (
              <h1 className='text-red-600 text-xl'>{`"${searchTerm}" Not Found`}</h1>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Favorites