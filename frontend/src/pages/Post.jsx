import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_BASE_URL } from '../utils/environment.varible.mjs';
import ReactMarkdown from "react-markdown";
import Navbar from '../sections/Navbar';

function Post() {
    const { id } = useParams()
    const [post, setPost] = useState('')

    const getPost = async (id) => {
        try {
            let thePost = await fetch(`${BACKEND_BASE_URL}/post/${id}`)
            thePost = await thePost.json()
            if (!thePost) return console.log('Error fetching post')
            setPost(thePost)
        } catch (error) {
            console.error(`Error fetching post: ${error}`)
        }
    }
    useEffect(() => {
        getPost(id)
    }, [id])
    return (

        <div className="flex bg-gray-800 justify-center overflow-auto md:p-4">
            <div className="flex-1 p-5 md:p-10 border-2 m-2 border-gray-600 bg-gray-900 rounded-2xl">
                <Navbar />
                <div className='text-white flex flex-col'>
                    <h1 className='text-lg font-bold'>{post.title}</h1>
                    <h2 className='text-xs text-gray-200 font-light'>{post.subtitle}</h2>
                    <div className='markdown'>
                        <ReactMarkdown>
                            {post.main}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post