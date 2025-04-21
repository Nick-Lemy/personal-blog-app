import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_BASE_URL } from '../utils/environment.varible.mjs';
import ReactMarkdown from "react-markdown";

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
        <div className='text-white flex flex-col gap-5'>
            <p>Post {post._id}</p>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
            <p>
                <ReactMarkdown>
                    {post.main}
                </ReactMarkdown>
            </p>
        </div>
    )
}

export default Post